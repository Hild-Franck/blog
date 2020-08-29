import React from "react"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles, withStyles } from '@material-ui/core/styles'

import SocialMedias from './SocialMedias'

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
    padding: 45,
    borderRadius: 5
  },
  header: {
    height: 200,
    marginBottom: 10,
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
  },
  icon: {
    width: 50
  }
})

const Layout = ({ children, images }) => {
  const classes = useStyles()
  
  const theme = React.useMemo(() =>
    createMuiTheme({
      overrides: {
        MuiCssBaseline: {
          '@global': {
            body: {
              backgroundColor: undefined,
              backgroundImage: "linear-gradient(216deg, rgba(77, 77, 77,0.05) 0%, rgba(77, 77, 77,0.05) 25%,rgba(42, 42, 42,0.05) 25%, rgba(42, 42, 42,0.05) 38%,rgba(223, 223, 223,0.05) 38%, rgba(223, 223, 223,0.05) 75%,rgba(36, 36, 36,0.05) 75%, rgba(36, 36, 36,0.05) 100%),linear-gradient(44deg, rgba(128, 128, 128,0.05) 0%, rgba(128, 128, 128,0.05) 34%,rgba(212, 212, 212,0.05) 34%, rgba(212, 212, 212,0.05) 57%,rgba(25, 25, 25,0.05) 57%, rgba(25, 25, 25,0.05) 89%,rgba(135, 135, 135,0.05) 89%, rgba(135, 135, 135,0.05) 100%),linear-gradient(241deg, rgba(55, 55, 55,0.05) 0%, rgba(55, 55, 55,0.05) 14%,rgba(209, 209, 209,0.05) 14%, rgba(209, 209, 209,0.05) 60%,rgba(245, 245, 245,0.05) 60%, rgba(245, 245, 245,0.05) 69%,rgba(164, 164, 164,0.05) 69%, rgba(164, 164, 164,0.05) 100%),linear-gradient(249deg, rgba(248, 248, 248,0.05) 0%, rgba(248, 248, 248,0.05) 32%,rgba(148, 148, 148,0.05) 32%, rgba(148, 148, 148,0.05) 35%,rgba(202, 202, 202,0.05) 35%, rgba(202, 202, 202,0.05) 51%,rgba(181, 181, 181,0.05) 51%, rgba(181, 181, 181,0.05) 100%),linear-gradient(92deg, hsl(214,0%,11%),hsl(214,0%,11%))"
            }
          }
        }
      },
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
    <SocialMedias />
    <Box className={classes.main}>
      {children}
    </Box>
  </ThemeProvider>
}

export default Layout