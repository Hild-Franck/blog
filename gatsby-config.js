module.exports = {
  siteMetadata: {
    siteUrl: `http://knarfux.fr`
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/markdown-pages`,
        name: `markdown-pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/img`,
        name: `img`,
      },
    },
    `gatsby-plugin-feed`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-remark-prismjs`,
    `gatsby-remark-images`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".md", ".markdown"],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              destinationDir: "path/to/dir",
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              showCaptions: ['title', 'alt'],
              markdownCaptions: true
            },
          },
        ],
      } 
    }
  ]
}