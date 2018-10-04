---
layout: post
title:  "Error catching en bash script"
date:   2018-09-03
categories: bash
author: Knarfux
---
Quand je dois faire du scripting, je n'hésite jamais très longtemps ; j'utilise du `Python`. Mais il arrive, pour des raisons de dépendance ou de maintenabilité, ce choix n'est pas possible, et il faut se cantonner à quelque chose de plus... brut.
Parce que oui, le bashscript c'est pas le langage le plus fun à utiliser.

Dans la plupart des scripts que j'ai eu à maintenir, il manquait cruellement d'error catching et d'error logging.

Il y a deux cas qui se presentent souvent :

- Catch à la fois l'output et l'erreur d'une commande

    1. Il faut créer un fichier temporaire pour stocker l'erreur

        ```bash
        local tmp
        tmp_err=$(mktemp /tmp/temp.XXXXXX)
        exec 3< "$tmp_err"
        rm "$tmp_err"
        ```

        Le code est pas trop compliqué. Avec `mktemp`, on crée un fichier temporaire (le `XXXXXX` permet de générer un nom de fichier aleatoire) et on le stocke dans une variable, pour pouvoir écrire dedans facilement.

        Avec la commande `exec`, on lie le fichier au *file descriptor* 3. Ainsi, on peut supprimer le fichier avec `rm` tout en le maintenant ouvert. Le fichier sera automatiquement fermé (et donc supprimé, vu qu'on l'a `rm`) à la fin du process.

    2. Il ne reste plus qu'à executer une commande en redirigeant *stderr* vers le fichier temporaire

        ```bash
        output=$(ls -la 2>"$tmp_err")
        err=$(cat "$tmp_err")
        ```

    3. Pour tester l'erreur, il suffit de vérifier si la variable `err` est vide ou non

        ```bash
        if [[ -n "$err" ]]; then
            echo "[ERROR] $err"
        fi
        ```

- Simplement catch une erreur

    1. Executer la commande en subshell, rediriger `stdout` dans `/dev/null` et `stderr` dans `stdout`


        ```bash
        err=$({mkdir /my/folder > /dev/null;} 2>&1)
        ```

    2. Pour tester l'erreur, il suffit de vérifier si la variable `err` est vide ou non

        ```bash
        if [[ -n "$err" ]]; then
            echo "[ERROR] $err"
        fi
        ```


Test

{: .test}
> **ATTENTION :** Certaines commande affichent des informations dans stderr, comme `curl`
> ```bash
>    if [[ -n "$err" ]]; then
>        echo "[ERROR] $err"
>    fi
> ```