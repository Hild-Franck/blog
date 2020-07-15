import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import MaterialLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import HomeIcon from '@material-ui/icons/Home'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Highlight, { defaultProps } from 'prism-react-renderer'

import Layout from '../components/Layout'

const pre = props => {
  const className = props.children.props.className || ''
  const matches = className.match(/language-(?<lang>.*)/)
  return (
    <Highlight
      {...defaultProps}
      code={props.children.props.children}
      language={
        matches && matches.groups && matches.groups.lang
          ? matches.groups.lang
          : ''
      }
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

const useStyles = makeStyles({
  titleContainer: {
    position: 'relative',
    marginBottom: 75
  },
  titleBg: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: "blur(4px)",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  },
  title: {
    paddingBottom: 75,
    paddingTop: 75,
    marginTop: 25,
    wordBreak: "break-word",
    textShadow: "black 3px 3px 3px",
    filter: "blur(0)"
  },
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: 5,
    width: 20,
    height: 20,
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
    '.MuiTableCell-head': {
      fontWeight: "bold"
    },
    '.MuiTableContainer-root': {
      marginTop: 45
    },
    '.gatsby-resp-image-figcaption': {
      maxWidth: 600,
      display: "block",
      margin: "auto",
      textAlign: "center",
      border: "solid 1px black",
      padding: 5,
    },
    'img': {
      display: 'block',
      margin: 'auto',
      width: "100%"
    }
  }
}))(() => null)

export default function BlogPost({ data }) {
  const classes = useStyles()
  const post = data.mdx

  const image = post.image || post.frontmatter.image

  return <MDXProvider components={{
    img: props => {
      console.log(props);
      
      return props.className == 'gatsby-resp-image-image'
        ? <img {...props} />
        : <figure>
          <span style={{position: "relative", display: "block", margin: "auto", maxWidth: 600, width: "100%"}}>
            <MaterialLink href={props.src} target="_blank">
              <img {...props} />
            </MaterialLink>
          </span>
          {props.title && <figcaption class="gatsby-resp-image-figcaption">{props.title}</figcaption>}
        </figure>
    },
    a: MaterialLink,
    h2: props => <Typography {...props} variant="h5" component="h3" />,
    h3: props => <Typography {...props} variant="h6" component="h4" />,
    th: props => <TableCell {...props} />,
    td: props => <TableCell {...props} />,
    tr: props => <TableRow {...props} />,
    tbody: props => <TableBody {...props} />,
    thead: props => <TableHead {...props} />,
    table: props => <TableContainer component={Paper}><Table {...props} /></TableContainer>,
    pre
  }}><Layout images={data.normal}>
    <PostCss />
    <Breadcrumbs aria-label="breadcrumb">
      <MaterialLink component={Link} color="inherit" to="/" className={classes.link}>
        <HomeIcon className={classes.icon} />
        Home
      </MaterialLink>
      <Typography color="inherit" href="/getting-started/installation/">
        {post.frontmatter.title}
      </Typography>
    </Breadcrumbs>
    <Container className={classes.titleContainer}>
      <Container style={{backgroundImage: `url(${image.childImageSharp.fluid.src})`}} className={classes.titleBg}></Container>
      <Typography className={classes.title} variant="h4" align="center" display="block">
        {post.frontmatter.title}
      </Typography>
    </Container>
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
        image {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      image {
        childImageSharp {
          fluid {
            src
          }
        }
      }
    }
  }
`
