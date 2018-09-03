---
layout: post
title:  "Error catching en bash script"
date:   2018-09-03
categories: bash
---
Quand je fais du scripting, j'hésite pas très longtemps ; j'utilise `Python`. Mais il arrive, pour des raisons de dependance ou de maintenabilité, ce choix n'est pas possible, et il faut se cantonner à quelque chose de plus... brut.
Parce que oui, le bashscript c'est pas le langage le plus fun à utiliser.

Dans la plupart des scripts que j'ai eu a maintenir, il manquait cruellement d'error catching et d'error logging.

Il y a deux cas qui se presentent souvent :

- Catch a la fois l'output et l'erreur d'une commande

    1. Il faut creer un fichier temporaire pour stocker l'erreur

        ```bash
        local tmp
        tmp_err=$(mktemp /tmp/temp.XXXXXX)
        exec 3< "$tmp_err"
        rm "$tmp_err"
        ```

        Le code est pas trop complique. avec `mktemp` on cree un fichier temporaire (le `XXXXXX` permet de generer un nom de fichier aleatoire) et on le stocke dans une variable, pour pouvoir ecrire dedans facilement.

        Avec la commande `exec`, on lie le fichier au *fd* 3. Ainsi, on peut supprimmer le fichier avec `rm` en le maintenant ouvert. Le fichier sera automatiquement ferme (et donc supprimme, vu qu'on l'a `rm`) a la fin du process.

    2. Il reste plus qu'a executer une commande en redirigeant *stderr* vers le fichier temporaire

        ```bash
        output=$(ls -la 2>"$tmp_err")
        err=$(cat "$tmp_err")
        ```

    3. Pour tester l'erreur, il suffit de verifier si la variable `err` est vide ou non

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

    2. Pour tester l'erreur, il suffit de verifier si la variable `err` est vide ou non

        ```bash
        if [[ -n "$err" ]]; then
            echo "[ERROR] $err"
        fi
        ```

> **ATTENTION :** Certaines commande affichent des informations dans stderr, comme `curl`