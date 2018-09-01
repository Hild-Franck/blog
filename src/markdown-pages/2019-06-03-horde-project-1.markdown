---
layout: post
title: "Horde Project #1 - Rampe et destruction"
date: 2019-06-03
categories: project gamedev update
author: Knarfux
image: ../../img/profile.png
---

Je n'ai pas eu autant de temps libre que ce que j'aurais voulu pour bosser sur ce projet, alors ça sera **une mini update** pour cette fois !

## État actuel du projet

Deux petites choses implémentées cette fois-ci :

- des dégâts sur les murs
- une rampe / des escaliers

Le mot que vous cherchez est ***INCROYABLE***.

### DESTRUCTION

J'ai un peu *anticipé* sur ce coup là. J'ai ajouté une fonction à déclencher lorsqu'une partie d'un mur sera endommagée.

**C'est très basique** ; un petit effet de particule, et le mesh est remplacé par une version endommagée, dont le haut se détache avec la physique activée.

![gif](/assets/img/horde_2019-06-03_destruction.gif)

Le rendu est **loin d’être parfait**, mais ça fait le taf pour un proto !

### Rampe

Avant de passer à la phase *action* du gameplay, il y avait un bâtiment que je devais faire **en priorité** : la rampe pour que le personnage puisse monter sur les murs.

Honnêtement, j'avais pas des masses d’idées alors j'ai fais un mesh très fonctionnel.

![gif](/assets/img/horde_2019-06-03_rampe.gif)

Pour éviter de futurs abus, j'ai fait en sorte que les rampes ne puissent se placer *que* contre un mur. Et pour enlever le haut des pics au moment du placement de la rampe, je remplace simplement le mesh du pic par le mesh du pic *cassé* sans la pointe (manière de pas créer un mesh juste pour ça)

## La suite

La partie que j'attends de faire depuis un moment ; **la partie action**.

Dans l’immédiat, je dois implémenter les mécaniques du personnage ; le *déplacement*, le *saut* et l'*attaque*

Une grosse partie en prévision !

***

Pour les prochains posts, je vais *essayer* de mettre un peu de technique, pour expliquer comment certaines features (et certains bugs) sont implémentées.

Les posts seront un peu plus longs, mais plus agréables pour moi à écrire !