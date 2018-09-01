import React from "react"
import { Link } from "gatsby"
import Typography from '@material-ui/core/Typography'

const PostLink = ({ post }) => (
  <div>
    <Link to={post.fields.slug}>
      <Typography component="h5" variant="h5">
        {post.frontmatter.title}
      </Typography>
    </Link>
  </div>
)

export default PostLink