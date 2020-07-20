---
layout: post
title: "Installer ffmpeg sur Netlify pour Gatsby"
date: 2020-07-19
categories: tuto netlify gatsby ffmpeg
author: Knarfux
image: ../../img/ffmpeg-netlify.png
---

En passant mon blog de **Jekyll** a **Gatsby**, je me suis heurte a un léger soucis lors du déploiement sur **Netlify**. Je vous explique !

## Affichage d'une vidéo

Mes articles sont écris en **markdown**. Il faut que Gatsby le transforme en HTML grâce au plugin [`gatsby-plugin-mdx`](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-mdx). Et pour pouvoir prendre en charge les vidéos (`gif`, `webm`, `mp4`, ...), **il faut un autre plugin**: [`gatsby-remark-videos`](https://github.com/Mike-Dax/gatsby-remark-videos)

A la base, c'est un plugin pour remarks (un autre parser de mardown) ; pour pouvoir l'utiliser avec MDX, il faut le mettre dans les `gatsbyRemarkPlugins` des options de `gatsby-plugin-mdx`

```js
{
  resolve: `gatsby-plugin-mdx`,
  options: {
    extensions: [".md", ".markdown"],
    gatsbyRemarkPlugins: [
      `gatsby-remark-videos`,
    ],
  } 
}
```

Jusque la, tout va bien ! En local, le build se fait et les vidéos s'affichent. Par contre, lors du déploiement sur Netlify...

## FFMPEG

Le plugin `gatsby-remark-videos` a pour **dépendance le programme `ffmpeg`**. Ce n'est pas une dépendance `npm`, il faut qu'**un binairy de `ffmpeg` se trouve dans le `PATH`** système.

Le problème ? [L'image docker](https://github.com/netlify/build-image) de Netlify assurant le build du blog ne contient pas cette dépendance. Lors du build, cette erreur apparaît:

```shell
Error: Cannot find ffprobe
```

Il y a deux choses a faire pour régler ce problème.

- Avoir [le binary de `ffmpeg`](https://johnvansickle.com/ffmpeg/) lors du build.
- Avoir le binary de `ffmpeg` dans le `PATH`.

Pour ça, je ne me suis pas pris la tète ; j'ai simplement écrit un petit script de déploiement qui télécharge `ffmpeg` et qui l'ajoute dans le path:

```shell
mkdir ffmpeg
wget -qP ffmpeg -O ffmpeg.tar.xz https://johnvansickle.com/ffmpeg/builds/ffmpeg-git-amd64-static.tar.xz
tar -xf ffmpeg.tar.xz -C ffmpeg --strip-components 1
PATH=$PATH:$(pwd)/ffmpeg
npm run build
```

Ce script est dans `.ci/deploy.bash` et **est appelé par le script npm `deploy`**.

```json
"deploy": "./.ci/deploy.bash"
```

Tandis que dans Netlify, la commande de build est `npm run deploy`

> **NOTE:**
>
> Si vous voulez **tester un build Netlify**, au lieu de faire 1000 déploiement sur Netlify, je conseille d'utiliser [ce repo](https://github.com/netlify/build-image) pour faire des tests en local.

Grâce a ce script, le build se passe sans encombre et **tout est déployé** !
