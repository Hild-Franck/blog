const {
  createFilePath,
  createRemoteFileNode
 } = require(`gatsby-source-filesystem`)

 exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type Mdx implements Node {
      frontmatter: MdxFrontmatter
      image: File @link(from: "image___NODE")
    }
    type MdxFrontmatter {
      title: String!
      imageUrl: String
      imageAlt: String
    }
  `)
}

exports.onCreateNode = async ({ node, getNode, actions, store, cache, createNodeId }) => {
  const { createNodeField, createNode } = actions
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode, basePath: `markdown-pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
    if (node.frontmatter.imageUrl) {
      const fileNode = await createRemoteFileNode({
        url: node.frontmatter.imageUrl, // string that points to the URL of the image
        parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
        createNode, // helper function in gatsby-node to generate the node
        createNodeId, // helper function in gatsby-node to generate the node id
        cache, // Gatsby's cache
        store, // Gatsby's redux store
      })
      if (fileNode) {
        node.image___NODE = fileNode.id
      }
    }
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const blogPostTemplate = require.resolve(`./src/templates/blogTemplate.js`)
  const result = await graphql(`
    {
      allMdx(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              categories
            }
          }
        }
      }
    }
  `)
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  result.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: blogPostTemplate,
      context: {
        // additional data can be passed via context
        slug: node.fields.slug,
      },
    })
  })
}