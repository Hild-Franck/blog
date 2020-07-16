---
layout: post
title: "Platformer #2 - Personnage et gravité"
date: 2020-07-15
categories: tuto gamedev plateforme
author: Knarfux
image: ../../img/tile-mapping.png
---

On s'est occupé du tile mapping dans la partie 1, il est temps de créer notre personnage et de lui appliquer **les effets de la gravité** !

## Le personnage

Le but est de créer un personnage qui aura une méthode `draw()` pour le dessiner et une méthode `update()` pour mettre a jour sa position.

```python
DISPLAY_HEIGTH = 600
DISPLAY_WIDTH = 800

GAME_DISPLAY = pygame.display.set_mode((DISPLAY_WIDTH, DISPLAY_HEIGTH))

class Character():
    def __init__(self):
        self.rectangle = pygame.Rect(0, 0, 32, 32)
        self.color = pygame.Color('red')

    def draw(self):
        global GAME_DISPLAY
        pygame.draw.rect(gameDisplay, self.color, self.rectangle)

    def update(self):
        pass
  
character = Character()
```

On reste sur du basique pour l'instant ; `self.rectangle` contient le **graphisme du personnage**, `draw()` permet de dessiner le personnage, avec **la couleur** stockée dans `self.color`.

Dans la game loop, j'appelle `character.draw()` juste en dessous de `tilemap.draw()` et voila le résultat :

![character drawing](../../img/character-drawing.png)

*Une œuvre d'art* - personne

Maintenant que notre personnage apparaît a l’écran, on va lui **appliquer une force de gravité**. Les choses se corsent !

## La gravité

Nous allons essayer de recréer plus ou moins l'attraction terrestre. En gros, on va appliquer sur notre personnage une force qui va l'attirer vers le bas.

Pour transcrire ça en code, c'est pas sorcier, il suffit d'appliquer une vitesse sur **la position y** du personnage.

Pour rappel, l’équation de la vitesse est: **`vitesse = distance / temps`**. Ce que l'on veut savoir, c'est de **combien de pixel faut il bouger** a chaque frame pour être a une vitesse définie préalablement. Ce qui nous faut est donc la distance: **`distance = vitesse * temps`**

Par exemple, en appliquant une **vitesse de 1px / frame**, notre personnage va se déplacer de **1px a chaque frame**.

### Delta time

Ici, on va partir sur du **60 frames par seconde**. Cependant, selon la puissance de votre ordinateur, le temps qui sépare chaque frame **n'est pas garanti d’être constant**.

Dans ce cas, si on ajoute 1px par frame a notre position mais que chaque frame a une durée différente, cela veut dire que **la vitesse va varier** entre chaque frame.

> **EXEMPLE:**
>
> On veut ajouter 2px a chaque frame. On fait donc :
> ```python
> position.y = position.y + 2
> ```
> Si une frame dure 100ms, la vitesse a cette frame sera de 2px par 100ms
>
> Donc **`20px par secondes`**
>
> Si la frame d’après dure 200ms du a un ralentissement, la vitesse a cette frame sera de 2px par 200ms
>
> Donc **`10px par secondes`**
>

Ce genre de variation se ressent et **peut avoir un impact très négatif** sur le game feel.

Il faut donc **une vitesse constante a chaque frame**, et c'est la qu'intervient le **delta time**.

Le delta time est le nombre de millisecondes qui s'est écoulé entre la frame précédente et la frame en cours. C'est avec ce chiffre qu'on va pouvoir déterminer la distance en pixel dont on veut faire bouger notre personnage selon sa vitesse.

> **EXEMPLE:**
>
> On veut ajouter 2px a chaque frame. On fait donc :
> ```python
> position.y = position.y + (2 * delta_time)
> ```
>

Pour avoir le delta time avec pygame, il suffit de stocker le retour de `clock.tick(60)` dans une variable globale.

```python
DISPLAY_HEIGTH = 600
DISPLAY_WIDTH = 800

GAME_DISPLAY = pygame.display.set_mode((DISPLAY_WIDTH, DISPLAY_HEIGTH))

GRAVITATION_FORCE = 1
DELTA_TIME = 0

class Character():
    def __init__(self):
        self.rectangle = pygame.Rect(0, 0, 32, 32)
        self.color = pygame.Color('red')
        self.y_speed = 0
        self.x_speed = 0

    def draw(self):
        global GAME_DISPLAY
        pygame.draw.rect(GAME_DISPLAY, self.color, self.rectangle)

    def update(self):
        self.__apply_gravity()
        self.rectangle = self.rectangle.move(self.x_speed, self.y_speed)
    
    def __apply_gravity(self):
        global GRAVITATION_FORCE, DELTA_TIME
        self.y_speed = GRAVITATION_FORCE * DELTA_TIME
  
character = Character()
```

Je gère la gravité dans une méthode privée `__apply_gravity()`, et j'utilise la variable `GRAVITATION_FORCE` pour contrôler la vitesse de la chute.

> **ATTENTION:**
>
> Il faut appeler `update()` **avant** `draw()`, car vous voulez dessiner le personnage APRÈS le calcul de sa nouvelle position.

Ce qu'on a vu jusque la permet de créer **une chute a une vitesse constante**, mais on peut utiliser un modèle un peu plus proche de la réalité.

### Chute libre avec frottement

Pour être plus proche de la physique de notre monde, on peut implémenter deux petites mécaniques de plus dans la chute :

- **l’accélération** (plus longtemps on chute, plus rapide la chute sera)
- **le frottement de l'air** (a partir d'une certaine vitesse, l’accélération s’arrête.)

#### Accélération

L’accélération correspond a **l'augmentation de la vitesse** dans le temps **a partir du début de la chute**.

Quand la chute commence (lors du premier appel de `update()`), il faut donc enregistrer le temps, pour pouvoir faire un delta entre ce temps et le temps ou s'effectue chaque frame. Ce delta augmentera donc dans le temps.

#### Frottement de l'air

Pour simuler les frottement de l'air, il suffit de clamp la vitesse a un maximum en utilisant la fonction `clip()` du module `numpy`

> **NOTE:**
>
>Évidemment, on peut implémenter ou non toutes ces notions ou pas, avec des valeurs plus ou moins élevées selon le game feel que l'on veut donner au jeu.

## Code final

```python
class Character():
    def __init__(self):
        self.rectangle = pygame.Rect(0, 0, 32, 32)
        self.color = pygame.Color('red')
        self.y_speed = 0
        self.x_speed = 0
        self.starting_fall = 0

    def draw(self):
        global GAME_DISPLAY
        pygame.draw.rect(GAME_DISPLAY, self.color, self.rectangle)

    def update(self):
        if not self.starting_fall:
            self.starting_fall = pygame.time.get_ticks()

        self.__apply_gravity()
        self.rectangle = self.rectangle.move(self.x_speed, self.y_speed)
    
    def __apply_gravity(self):
        global GRAVITATION_FORCE, DELTA_TIME
        delta_fall_time = (pygame.time.get_ticks() - self.starting_fall) * 0.0035
        self.y_speed = GRAVITATION_FORCE * DELTA_TIME * delta_fall_time
```

Et le résultat:

![](../../img/character-falling.mp4)

> **NOTE:**
>
> Ici, l’accélération est linéaire, puisqu'on multiplie le delta time par une constante. La fonction qui modélise l’évolution de la vitesse est donc: `y = constante * t`.
> Cependant, on peut utiliser une autre fonction qu'une fonction linéaire !

A partir de la, on peut commencer a modifier un peu toutes ces valeurs jusqu’à tomber sur un bon feeling, alors faut pas hésiter a expérimenter !

La suite est plutôt logique ; éviter que notre personnage traverse honteusement le sol !
