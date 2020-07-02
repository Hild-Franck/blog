import React from "react"
import { graphql } from "gatsby"
import Grid from '@material-ui/core/Grid'

import PostCard from "../components/PostCard"
import Layout from '../components/Layout'



const IndexPage = ({ data }) => {
  const { allMdx: { edges } } = data
  const Posts = edges.map(edge => <PostCard post={edge.node} />)

  return <Layout images={data.normal}>
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
      edges {
        node {
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