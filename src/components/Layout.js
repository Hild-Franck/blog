import React from "react"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles, withStyles } from '@material-ui/core/styles'

const GlobalCss = withStyles(theme => ({
  '@global': {
    'strong, b': {
      color: theme.palette.secondary.dark
    },
    '.MuiTypography-h5': {
      fontWeight: "bold"
    },
    '.MuiTypography-h6': {
      marginTop: 30,
      fontWeight: "bold"
    },
    blockquote: {
      background: theme.palette.background.paper,
      padding: 10,
      borderLeft: `5px solid ${theme.palette.secondary.dark}`,
      marginTop: 50,
      marginBottom: 50
    }
  }
}))(() => null)

const useStyles = makeStyles({
  main: {
    maxWidth: 1100,
    margin: "auto",
    padding: 45
  },
  header: {
    height: 200,
    marginBottom: 25,
    position: "relative"
  },
  headerImage: {
    position: "absolute",
    width: 150,
    zIndex: -1,
    bottom: 0,
    left: "50%",
    marginLeft: "-75px"
  },
  gridHeader: {
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "end"
  }
})

const Layout = ({ children, images }) => {
  const classes = useStyles()
  
  const theme = React.useMemo(() =>
    createMuiTheme({
      palette: {
        type: 'dark',
      },
      typography: {
        body2: {
          fontSize: "1rem"
        },
        h4: {
          fontWeight: "bold"
        }
      }
    }),
    [true]
  )

  return <ThemeProvider theme={theme}>
    <CssBaseline/>
    <GlobalCss />
    <Box className={classes.header} boxShadow={3}>
      <img className={classes.headerImage} src={images.childImageSharp.fluid.src} />
      <Grid container className={classes.gridHeader}>
        <Grid item>
          <Typography variant="h2" align="center" display="block">
            Knarfux Blog
          </Typography>
        </Grid>
      </Grid>
    </Box>
    <Box className={classes.main}>
      {children}
    </Box>
  </ThemeProvider>
}

export default Layout