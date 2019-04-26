---
layout: post
title: "Créer un MMO ? #1 - Nouvelle authentification"
date: 2019-04-26
categories: project dev
author: Knarfux
---

J'ai essayé de me remettre **doucement** dans le projet par commençant par la partie *authentication*.

En plus de mettre le code et les dépendances à jour, j'ai également décidé d'utiliser le framework **[Moleculer](https://moleculer.services/)** couplé à **[NATS](https://nats.io/)** pour créer des micro-services.

J'ai donc modifié *authentication* pour qu'il s'intègre dans une **architecture micro-services**. Le service contient deux actions :

- *register* : permet de créer un utilisateur
- *login* : permet d'authentifier un utilisateur

## Organisation

Pour éviter de perdre du temps sur des détails, je me suis *un minimum* organisé du coté de la gestion du code / du projet.

En local, j'utilise **[git-flow](https://github.com/petervanderdoes/gitflow-avh)**, que j'ai découvert tout récemment et qui est très pratique pour organiser... bah son git flow, justement.

La seule modification que j'ai apporté à la configuration de base, c'est changer la branche de production de *master* vers *staging*. Comme ça, les releases seront mergées directement en pré-production, et les mises en production se feront **seulement** via des PR.

La "*gestion de projet*" se fera sur **[Taiga](https://taiga.io)**. C'est un issue tracker que j'aime bien, et je peux changer le status des stories depuis mes messages commit.

## La suite

La seconde étape va être un poil plus compliquée que le refacto du service d'authentification. Je vais devoir repenser la *gateway*, qui est le service qui va recevoir **le plus de charge**, puisqu'il va devoir dispatcher les données utilisateurs dans les autres services.

J'ai également commencé à réfléchir à la conception d'un service de gestion du *game state*, chargé de mettre à jour l'état des instances du jeu.

Ça sera certainement le service qui consommera le plus de ressources, puisqu'il devra faire beaucoup d’opération et conserver une partie du *game state* en mémoire.

***

En route vers le ***gateway*** ! \o/