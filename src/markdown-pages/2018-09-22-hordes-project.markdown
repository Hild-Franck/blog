---
layout: post
title: "Le projet Hordes"
date: 2018-09-29
categories: projects gamedev update
author: Knarfux
image: ../../img/profile.png
---
Il y a un petit moment de ça, j'ai commencé **un projet de jeu** qui me trottait dans la tête depuis longtemps. Etant friand de jeux de horde, j'ai toujours été pas mal frustré de voir le genre aussi peu representé.

Certe, certains jeux proposent des choses très bien dans le style, mais il n'y à pas vraiment de diversité, on est cantonné à quelques jeux épars ou certains mods.

J'ai tôt fait d'imaginer ce que serait pour moi le *"jeu de hordes ultime"* et j'ai commencé un protoype pour tester si l'idée était bonne ou pas.

## Overview

Je ne vais pas développer ici TOUT le *GDD*, je vais me contenter d'en présenter les grandes lignes. Pour faire simple, il y a deux phases de gameplay qui cyclent :

- *une phase de construction*
- *une phase de défense*.

### Construction

La première phase de gameplay est une phase de "city builder" en vue du dessus. Le joueur doit construire une ville et ses défenses sur une grille,  autour d'un bâtiment central placé par le jeu. Les différents bâtiments permettent de donner des bonus au joueur, tandis que les défenses mises en place aideront le joueur à défendre le bâtiment central lors de la seconde phase.

### Défense

Lors de la seconde phase, le joueur prend le contrôle d'un personnage en vue subjective. A l'aide des défenses établies dans la première phase, il doit éliminer des vagues d'ennemis afin de les empêcher de détruire le bâtiment central. Le joueur perd si ce dernier est détruit.

Le personnage possède différentes facultés et armes, selon la classe de personnage choisie par le joueur lorsqu'il commence une partie. Chaque classe introduit une nouvelle façon de jouer, et influe sur la fa!on dont le joueur va appréhender la première phase de gameplay.

## Etat du projet

Il y a de cela plusieurs mois, j'avais commencé à travailler sur un prototype, pour tester mon idée. Mais il n'était pas ***du tout*** assez travaillé, et ne retransmettait pas ce que j'avais en tête.

J'ai donc decidé de recommencer de zéro, en refaisant un prototype bien plus travaillé et poussé. La première chose sur laquelle je me suis penché est la première phase de gameplay, et notamment la construction des murs.

Dans le premier prototype, les murs étaient de vulgaires cubes gris composés de cylindres. Difficile de se projeter dans le jeu avec ce genre de graphismes. Ces "cubes" se plaçaient un par un.

![gif](../../img/2018-09-29_17-41-24.gif "Oui, on est clairement sur de l'abstrait tendance moche")


J'ai donc réfléchis à un nouveau système de placement, plus proche de certains RTS en faisant en sorte de pouvoir construire des tronçons entier de murs de maniere plus rapide.

![gif](../../img/2018-09-16_14-32-13.gif "Test du systeme de placement")

Puis, pour enlever le coté un peu trop "abstrait" des murs du premier prototype, j'ai modelisé grossièrement les tronçons de mur et les ai colorisés.
De plus, un "ghost" permet aussi de previsualiser le futur placement du mur, changeant de couleur selon si la construction est autorisée ou non.

![gif](../../img/2018-09-18_15-45-31.gif "Placement des murs avec le mesh sans texture et le ghost de prévisualisation")

J'ai également implémenté un escalier afin de pouvoir accéder aux plateformes des murs. L'idée est que, lors de la seconde phase, le personnage pourra patrouiller et tirer (si il possède une classe distance) depuis les remparts. Le joueur pourra également placer des archers / magiciens sur ces plateformes.

## La suite

Il y a encore pas mal de choses à faire niveau phase de construction. J'aimerai ajouter une porte - à placer sur un tronçon de mur, une maison et une caserne.

Il faut également que je réflechisse à la gestion des ressources, et comment elles impacteront les deux phases de gameplay. Mais bon, le temps que je fasse le code et le model de tous ces éléments, j'aurai largement le temps de me pencher sur la question !

Je posterai des updates au fur et à mesure que j'ajouterai des choses !