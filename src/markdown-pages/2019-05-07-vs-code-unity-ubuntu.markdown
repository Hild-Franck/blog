---
layout: post
title: "Configurer VSCode pour Unity3D sur Ubuntu"
date: 2019-05-07
categories: tuto gamedev
author: Knarfux
---

Cela fait quelques années que je travaille avec un ordinateur portable avec **Ubuntu** pré-installer dessus.

Comme je fais principalement **du web, du système Linux ou du DevOps**, ça me convient parfaitement. Mais lorsqu'il s'agit de faire du **gamedev** sur de "*gros moteurs*", c'est de suite **un peu plus délicat**.

Jusqu'à il n'y a pas si longtemps, j'avais une tour avec W10 pour jouer ET faire du gamedev sous Unity. Sauf que maintenant, je bouge beaucoup, et me trimbaler une tour de **2,5 tonnes** ce n'est ni pratique ni facile.

Je dois donc faire du gamedev sur Ubuntu. *C'est déjà toute une aventure.*

## L'IDE

L'éditeur que j'utilise le plus est 💕 ***Sublime Text*** 💕. Que ca soit du web, du scripting, de l'édition de texte ou l'écriture de ce blog, **JE VIS** Sublime Text.

*Bref*.

Malheureusement, niveau **plugin pour .NET**, Sublime Text, c'est pas encore ça. Je me suis donc rabattu sur un éditeur dont le support C# est bien mieux, et qui est spoilé dans le titre ; **VS Code**.

Mais la configuration n'étant **pas forcément** évidente (sans être *compliquée* non plus), laissez moi vous éviter les recherches que j'ai eu à faire.

Oui, c'est un post pour les gens qui ont la **flemme**.

## Configuration

Pour profiter au max des plugins de VS Code, il va falloir installer quelques dépendances avant :

- **.NET Core [ICI](https://dotnet.microsoft.com/download)** en choisissant .NET Core SDK puis votre distribution Linux.
- **Mono [ICI](https://www.mono-project.com/download/stable/#download-lin-ubuntu)** en choisissant encore une fois votre distribution

Une fois les dépendances installées, il suffit d'installer **3 plugins** VS Code :

- **[C#](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp)**
- **[Unity Tools](https://marketplace.visualstudio.com/items?itemName=Tobiah.unity-tools)**
- **[Unity Code Snippets](https://marketplace.visualstudio.com/items?itemName=kleber-swf.unity-code-snippets)**

Il existe d'autres plugins, mais je considère que c'est trois là sont **les plus important**.

***

Et voilà, avec ça, *développer pour Unity sera bien plus facile*. J'ai **essayé** de dev sur Sublime Text sans plugins ou aide, et croyez moi, mieux vaut prendre VS Studios et ses plugins !
