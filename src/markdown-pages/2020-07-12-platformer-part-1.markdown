---
layout: post
title: "Platformer #1 - Tilemapping"
date: 2020-07-12
categories: tuto gamedev plateforme
author: Knarfux
image: ../../img/tile-mapping.png
---

Ça fait un moment que je fais des petits tests sur diverses librairies pour apprendre a faire **des jeux de plateformes**.

C'est surtout les mécanismes de bases qui m’intéressent, alors je vais compiler ce que j'ai appris et compris au sujet des mécanismes des jeux de plateformes.

## Le tile-mapping

Le tile-mapping est utilisé pour afficher le **foreground** et gérer une partie des collisions. Le principe est simple ; on découpe le niveau en une grille. Cette grille est constituée de **tiles** (souvent de 32px x 32px), et on dessine dans chaque tiles un sprite ou un rectangle de couleur.

![tiles](../../img/tiles.png)

Il suffit de créer un tableau, dont chaque valeur correspond a un *tile* a dessiner ou un tile a laisser vide. Voyons ça plus en détail !

### La classe TileMap

Je vais utiliser `pygame` et le langage python pour cet exemple.

```python
TILE_SIZE = 32

class TileMap():
    data = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [1, 0, 1, 1, 1, 1, 1]
    ]
    colors = [pygame.Color('white'), pygame.Color('black')]

    def draw(self):
        for y, tiles in enumerate(self.data):
            for x, tile in enumerate(tiles):
                if (tile):
                  # Create the rectangle
                  rectangle = pygame.Rect(
                    x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE
                  )
                  # Draw the rectangle
                  pygame.draw.rect(gameDisplay, self.colors[tile], rectangle)
```

### Dessiner les tiles

Alors ! Le code est assez simple. J'ai mis les data des tiles dans une **variable de classe** `data`. Le `0` correspondra aux tiles qui ne seront pas dessines, le `1` aux tiles qui seront noires.

Chaque tile fera 32px par 32px.

Dans notre cas, ces data vont permettre de dessiner une ligne noire en bas, avec un trous de 32px a partir du 32eme pixel.

Je stocke également dans la variable de classe `color` les couleurs qui seront utilisées pour dessiner les tiles.

Et le plat principal : **la méthode `draw()`**.

Dans cette méthode, j’itère a travers les data pour dessiner chaque tile :

- l'index de chaque sous-tableaux donne **la coordonnée `y`** de chaque tile.

  ```python
  for y, tiles in enumerate(self.data):
  ```

- l'index de chaque valeur dans les sous-tableaux donne **la coordonnes `x`** de chaque tile.

  ```python
  for x, tile in enumerate(tiles):
  ```

- Si tile vaut autre chose que `0`

  ```python
  if (tile):
  ```

  alors on dessine un rectangle.

  ```python
  rectangle = pygame.Rect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  ```

Comme une tile fait 32px de long et large (`TILE_SIZE`), il faut que je dessine un rectangle tous les `TILE_SIZE` pixels. Sachant que **l'origine des rectangles** est sur le coin haut-gauche, multiplier les index par `TILE_SIZE` permet de déterminer **a partir de quel pixel il faut dessiner** chaque rectangle.

![tile drawing](../../img/tile-drawing.png)

Pour finir, les valeurs contenues dans les sous-tableaux (les `0` et les `1` donc) servent d'index au tableau `colors`. Comme on n'affiche pas les tiles contenant un `0`, le `1` permet d'afficher une tile noire.

Et voila ! Il suffit d'instancier `TileMap` et d'appeler `tilemap.draw()` dans **la game loop** pour afficher le foreground ! Yeah !

La suite arrive !
