import React from "react"
import { graphql } from "gatsby"
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from '../components/Layout'

const useStyles = makeStyles({
  title: {
    marginBottom: 75
  }
})

const PostCss = withStyles(theme => ({
  '@global': {
    '.MuiTypography-h5': {
      marginTop: 50,
      fontWeight: "bold"
    },
    '.MuiTypography-h6': {
      marginTop: 30,
      fontWeight: "bold"
    },
  }
}))(() => null)

export default function BlogPost({ data }) {
  const classes = useStyles()
  const post = data.mdx

  return <MDXProvider components={{
    a: Link,
    h2: props => <Typography {...props} variant="h5" component="h3" />,
    h3: props => <Typography {...props} variant="h6" component="h4" />
  }}><Layout images={data.normal}>
    <PostCss />
    <Typography className={classes.title} variant="h4" align="center" display="block">
      {post.frontmatter.title}
    </Typography>
    <MDXRenderer>{post.body}</MDXRenderer>
  </Layout></MDXProvider>
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
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
      }
    }
  }
`