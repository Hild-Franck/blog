import React from "react"
import { graphql } from "gatsby"
import Grid from '@material-ui/core/Grid'

import PostCard from "../components/PostCard"
import Layout from '../components/Layout'
import SEO from '../components/seo'

const IndexPage = ({ data }) => {
  const { allMdx: { edges, nodes } } = data
  
  const Posts = edges.map((edge, i) => {
    const { image } = nodes[i]
    return <PostCard image={image} post={edge.node} />
  })

  return <Layout images={data.normal}>
    <SEO />
    <Grid container justify="space-evenly" alignItems="stretch">{Posts}</Grid>
  </Layout>
}

export default IndexPage

export const pageQuery = graphql`
  query {
    normal: file(name: {eq: "profile-transparent"}) {
      name
      childImageSharp {
        fluid {
          src
        }
      }
    }
    allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
      nodes {
        image {
          childImageSharp {
            fluid {
              src
            }
          }
        }
      }
      edges {
        node {
          image {
            childImageSharp {
              fluid {
                src
              }
            }
          }
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            categories
            image {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`