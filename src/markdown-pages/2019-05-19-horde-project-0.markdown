---
layout: post
title: "Horde Project #0 - On recommence !"
date: 2019-05-19
categories: project gamedev
author: Knarfux
image: ../../img/profile.png
---

Voila le second projet sur lequel j'aime bosser en ce moment. Avec le projet de MMO, ce sont les deux seuls projets sur lesquels j'essaie de me focaliser.

## Overview

Pour faire court, **Horde Project** est un projet de jeu vidéo que j'ai commencé afin d'apprendre **le plus de choses possible** sur le gamedev, à l'aide de *Unity3D*.

Le jeu sera un jeu de *horde/survie* qui alternera phases de construction et phases d'action et dont le but est de survivre à un maximum de vagues, de plus en plus difficiles, d'ennemis.

Alors oui, c'est **très court**, mais pour être honnête, il y a pas mal d'aspects du *game design* qui me sont encore **un peu flous** et qui demandent à ce que je fasse des essais.

En reprenant ce projet, j'ai décidé de le *reboot* entièrement, car le "*prototype*" que j'avais créé à l’époque ne permettait **absolument pas** de se projeter dans le jeu final ; il était bien trop léger et buggé.

## État actuel du projet

J’écris ce post alors que je viens de finir la *première* (et seule) feature du jeu ; **la construction de murs**.

...

Bon, c'est pas très parlant dit comme ça, alors mieux vaut *montrer* la feature en question, pas vrai ?

![gif](../../img/horde_2019-05-19_wall.gif)

Passons en revue ce que j'ai implémenté:

- **Création et preview** des murs dans 4 directions
- **Petite animation** lors de la création d'un mur
- **Snap des murs** sur les murs déjà construits

Je ne pensais pas **DU TOUT** que cette feature allait prendre autant de temps à dev. Ce qui a été le plus difficile à implémenter a été sans la moindre hésitation **le snap des murs**, notamment le preview du snap et la détection des portions de mur à modifier.

## La suite

**Dans l’immédiat**, je vais continuer dans ma lancée et implémenter une grosse partie de la *logique* des murs, telle que leur santé, leur destruction, les modèles alternatifs lors de leur endommagement, etc.

Pour du moyen terme, eh bien... **j'en sais encore trop rien**, mais je *pense* que je passerai à d'autres bâtiments de la phase construction. A voir donc.

***

Je suis vraiment excité par ce projet, **je m'amuse beaucoup** à faire le dev et l'art de ce prototype.

Je partagerai les builds des qu'il y aura quelque chose à tester, en attendant, voici le **[lien](https://github.com/Hild-Franck/Horde-Project)** du repo !