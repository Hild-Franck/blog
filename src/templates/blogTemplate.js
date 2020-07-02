import React from "react"
import { graphql } from "gatsby"
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import Layout from '../components/Layout'

const useStyles = makeStyles({
  title: {
    marginBottom: 75
  }
})

export default function BlogPost({ data }) {
  const classes = useStyles()
  const post = data.markdownRemark

  return <Layout images={data.normal}>
    <Typography className={classes.title} variant="h4" align="center" display="block">
      {post.frontmatter.title}
    </Typography>
    <div dangerouslySetInnerHTML={{ __html: post.html }} />
  </Layout>
}

export const query = graphql`
  query($slug: String!) {
    normal: file(name: {eq: "profile-transparent"}) {
      name
      childImageSharp {
        fluid {
          src
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`