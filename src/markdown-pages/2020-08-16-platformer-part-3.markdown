---
layout: post
title: "Platformer #3 - Collision"
date: 2020-08-16
categories: tuto gamedev plateforme
author: Knarfux
image: ../../img/tile-mapping.png
---

La gravité et le tilemapping, c'est fait. Prochaine étape ; **la collision** avec la map !

On va se consacrer a la collision lors de la chute.

## Vérifier le sol

Le principe est le suivant:

Comme avec le tilemapping, la zone de jeu est découpé en une grille, et on va vérifier la coordonnée `y` en dessous du personnage.

A partir de la, on va vérifier la coordonnée `x` du point le plus  a gauche et le plus a droite du personnage, ce qui va donner deux coordonnées (`x`, `y`). Si une de ces deux coordonnées **correspondant a une tile de la tilemap**, on touche le sol. Sinon, on continue de tomber !

C'est la méthode privée `__check_boundary()` qui contiendra cette logique.

```python
def __check_ground(self):
# La coordonnee `y` en dessous du personnage
y_b_boundary = (self.rectangle.y // 32) + 1
# La coordonnee `x` la plus a droite du personnage
x_l_boundary = (self.rectangle.x) // 32
# La coordonnee `x` la plus a gauche du personnage
x_r_boundary = (self.rectangle.x + 31) // 32        

# On sort de la fonction si on est en dehors de la tilemap
if not 0 < y_b_boundary < len(tilemap.data):
    return None

"""
On verifie si les coordonnees (x, y) sont dans la tilemap et si
la coordonnee dans la tilemap correspond a une collision (1) ou pas (0)
"""
l_boundary = self.__check_boundary(x_l_boundary, y_b_boundary)
r_boundary = self.__check_boundary(x_r_boundary, y_b_boundary)

# Si il y a collision dans une des deux coordonnees, on stoppe la chute
if l_boundary or r_boundary:
    self.falling = False
    self.starting_fall = 0
    self.y_speed = 0
    self.rectangle.y = (y_b_boundary-1) * 32
else:
    self.falling = True
```

J'ai encapsulé la logique de la condition dans la méthode statique privée `__check_boundary()`

```python
"""
On verifie si les coordonnees (x, y) sont dans la tilemap et si
la coordonnee dans la tilemap correspond a une collision (1) ou pas (0)
"""
@staticmethod
def __check_boundary(x_boundary, y_boundary):
    return bool(
        0 <= x_boundary < (len(tilemap.data[y_boundary]))
        and
        tilemap.data[y_boundary][x_boundary]
    )
```

### Analyse de la méthode `__check_ground()`

Les premières lignes convertissent les positions en coordonnées grâce a des divisions entières par `32`, puisque les tiles font `32x32`.

> **EXEMPLE:**
>
> Si la position `y` du personnage est `53`, sa coordonnée `x` est `53 // 32 = 1`

Si la coordonnée `y` du personnage est en dehors de la tilemap, pas la peine de faire de check ; **il n'y a rien contre quoi entrer en collision**, d’où la première condition.

Ensuite, on vérifie si le coin bas-gauche et le coin bas-droit du personnage grâce a la méthode `__check_boundary()`

Dernière condition de la méthode ; si un des deux coins est en collision avec la tilemap, on stoppe la chute et on place le personnage **une tile au dessus** de la tile avec laquelle il est rentre en collision.

### Analyse de la méthode `__check_boundary()`

Toute petite méthode qui retourne un booléen. Elle prend en paramètre une coordonnée `x` et une coordonnée `y`.

Deux expressions booléennes sont évaluées avec un `and` :

- On vérifie si la coordonnée x est dans la tilemap

et

- On vérifie la valeur dans la tilemap en coordonnée x et y ; 0 correspond a pas de collision, tous les autres chiffres correspondent a une collision.

## Mise a jour de la méthode `update()`

```python
def update(self):
    self.__check_ground()

    if not self.starting_fall and self.falling:
        self.starting_fall = pygame.time.get_ticks()

    if self.falling:
        self.__apply_gravity()

    self.rectangle = self.rectangle.move(self.x_speed, self.y_speed)
```

Les base de la chutes étant la, on peut passer a une partie *relativement important* d'un plateformer ; **le saut !**
