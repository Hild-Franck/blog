import React from "react"
import { graphql } from "gatsby"

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import PostCard from "../components/PostCard"

const useStyles = makeStyles({
  main: {
    maxWidth: 1280,
    margin: "auto"
  },
  header: {
    height: 200,
    marginBottom: 25
  },
  gridHeader: {
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
})

const IndexPage = ({ data: { allMarkdownRemark: { edges } } }) => {
  const classes = useStyles()
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = React.useMemo(() =>
    createMuiTheme({ palette: {
        type: prefersDarkMode ? 'dark' : 'light',
      } }),
    [prefersDarkMode]
  )
  
  const Posts = edges.map(edge => <PostCard post={edge.node} />)

  return <ThemeProvider theme={theme}>
    <CssBaseline/>
    <Box className={classes.header} boxShadow={3}>
      <Grid container className={classes.gridHeader}>
        <Grid item>
          <Typography variant="h1" align="center" display="block">
            Knarfux Blog
          </Typography>
        </Grid>
      </Grid>
    </Box>
    <Box className={classes.main}>
      <Grid container justify="space-evenly" alignItems="stretch">{Posts}</Grid>
    </Box>
  </ThemeProvider>
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
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