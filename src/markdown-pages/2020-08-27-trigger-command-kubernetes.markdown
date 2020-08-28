---
layout: post
title: "Déclencher une commande dans un pod"
date: 2020-08-27
categories: kubernetes shellscript
author: Knarfux
image: ../../img/kubernetes-tcp.png
---

Il y a quelques jours, j'ai du me creuser la tête pour trouver une solution au problème suivant ; comment **déclencher une commande dans un pod depuis l’extérieur** de ce pod ?

J'ai pas vraiment trouver de solution satisfaisante sur le net, alors voila ma solution perso !

## Sidecar container

Voila le secret ; **un sidecar container contenant un serveur TCP**. Quand le serveur reçoit une requête, on exécute une commande ! J'ai essayé de garder cette solution la plus simple possible.

Le sidecar container sera une simple image `alpine`, sur laquelle on exécutera un serveur TCP a l'aide de `netcat`.

### Serveur TCP

Voila a quoi la commande ressemble:

```shell
while :; do
  cat /dev/null | nc -l -p 9000 | my_command;
done
```

Comme promis, c'est très simple ! `cat /dev/null | nc -l -p 6060` permet de démarrer le serveur TCP sur le port `9000`, ce qui **bloque le process** et empêche de passer au pipe suivant.

Lorsque ce dernier reçoit une requête, il répond le contenu de `/dev/null` (c'est a dire rien), s’arrête, ce qui permet de passer au pipe qui le suit, c'est a dire la commande que l'on veut exécuter.

Le `while` permet de **relancer un nouveau serveur** après chaque requête.

### Container spec

La `spec` du container ressemblera a peu prés a ça:

```yaml
name: command-trigger
image: alpine:latest
ports:
  - name: tcp-server
    containerPort: 9000
    protocol: TCP
args:
  - -c
  - while :; do cat /dev/null | nc -l -p 9000 | my_command; done
```

Quelques petites explications rapides:

- on définit un port pour pouvoir **l'exposer** via un service
- l'`entrypoint` de l'image `alpine` étant `/bin/sh`, on lui passe `-c` en premier argument, ce qui permet d’exécuter la string qui suit comme une commande, c'est a dire le second argument.

## Un poil de sécurité

Ça sera pas grand chose, mais on va ajouter **un tout petit peu** de sécurité a notre mini-serveur.

Pour faire simple, on va faire en sorte que la commande ne se déclenche **que lorsque le serveur reçoit une string spécifique** ; un **token**.

### Traitement de la requête

Pour ça, on fait passer ce que le client envoi dans une condition, et on exécute la commande **seulement si la condition renvoi vraie**:

```shell
while :; do
  cat /dev/null | nc -l -p 6060 | xargs -I % sh -c 'if [[ % == "$(TOKEN)" ]]; then my_command; fi';
done
```

`nc -l -p 6060` pipe dans `stdin` le contenu de la requête. On récupère ce contenu grâce a `xargs` et on le place dans le symbole `%`.

Grâce a `sh -c`, on exécute notre commande, précédée de la vérification du token `if [[ % == "$(TOKEN)" ]]`

### Token

Pour donner au sidecar container le token qu'il devra vérifier, il suffit de **créer un `secret`**, et de l'injecter dans ses variables d'environnement, en ajoutant ceci a sa spec:

```yaml
env:
  - name: TOKEN
    valueFrom:
      secretKeyRef:
        name: tcp-token-secret
        key: token
```

Et voila ! Désormais, notre commande **ne s’exécutera que lorsque le serveur recevra un token spécifique**.

## Conclusion

Cette solution est très pratique, car elle permet de déclencher des commandes grâce a **une simple requête TCP**, par exemple depuis un cronJob, un autre pod, via un port forwarding, etc...

### Variations

Dans cette exemple, j'utilise l'image `alpine`, ce qui **limite la commande a exécuter a du shell script**.

Mais en prenant une image python, go, js, etc basée sur alpine, il possible de faire la même chose sur plein d'autres langages ! Il suffira de monter un ficher script dans le sidecar container.

### Limitations

Il y a cependant **un certain nombre de limitations** a cette approche:

- le serveur ne peut accepter **qu'une requête a la fois**. Pratique pour certains types d’opérations (sur le filesystem par exemple), mais pas très performant pour le reste.
- selon le type d’opérations que vous voulez effectuer, cela peut poser **un soucis de sécurité**. Personnellement, j’éviterais d'exposer le serveur a l’extérieur.
- `netcat` ne peut faire **qu'une réponse statique prédéfinie** ; impossible de renvoyer une réponse personnalisée selon la requête reçue.

### Dépasser les limitations

J'ai adopté cette solutions parce qu'elle est extrêmement **simple** a mettre en place. Mais il est possible d'utiliser un serveur TCP moins limité que netcat, dans un autre langage, pour dépasser la plupart des limitations ci-dessus.
