import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from "gatsby"
import Img from "gatsby-image"

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: '20px'
  },
  content: {
    height: "100%"
  },
  categories: {
    paddingBottom: 10,
  },
  image: {
    height: 140
  },
})

const PostCard = ({ post }) => {
  const classes = useStyles()
  return <Grid item xs md={3} component={Card} className={classes.root}>
    <CardActionArea className={classes.content} component={Link} to={post.fields.slug}>
      <CardMedia className={classes.image} component={Img} fluid={post.frontmatter.image.childImageSharp.fluid} />
      <CardContent>
        <Typography className={classes.categories} variant="button" color="textSecondary" component="h2">
        {post.frontmatter.categories}
        </Typography>
        <Typography variant="h5" component="h2">
          {post.frontmatter.title}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Grid>
}

export default PostCard