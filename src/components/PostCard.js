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
  date: {
    position: "absolute",
    bottom: 5,
    right: 5
  },
  content: {
    height: "100%",
    position: "relative",
    paddingBottom: 15
  },
  categoryContainer: {
    paddingBottom: 15,
  },
  category: {
    marginRight: 15
  },
  image: {
    height: 140
  },
})

const PostCard = ({ post }) => {
  const classes = useStyles()
  return <Grid item xs md={3} component={Card} className={classes.root}>
    <CardActionArea className={classes.content} component={Link} to={post.fields.slug}>
      <Typography className={classes.date} variant="subtitle2" color="textSecondary">
        {post.frontmatter.date}
      </Typography>
      <CardMedia className={classes.image} component={Img} fluid={post.frontmatter.image.childImageSharp.fluid} />
      <CardContent>
        <div className={classes.categoryContainer}>
          {post.frontmatter.categories.split(" ").map(category =>
            <Typography className={classes.category} variant="button" color="textSecondary" component="span">
              {category}
            </Typography>
          )}
        </div>
        <Typography variant="h5" component="h2">
          {post.frontmatter.title}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Grid>
}

export default PostCard