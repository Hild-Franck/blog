import React from "react"
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTwitter, faTwitch
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const SocialMedias = () => <Grid container
  style={{ margin: "auto", width: '100%', maxWidth: 1100 }}
  direction="row"
  justify="flex-end"
  spacing={3}
>
  <Grid item>
    <Link target="_blank" href="https://twitter.com/knarfux">
      <FontAwesomeIcon size="2x" icon={faTwitter} />
    </Link>
  </Grid>
  <Grid item>
    <Link href="mailto:knarfux@gmail.com">
      <FontAwesomeIcon size="2x" icon={faEnvelope} />
    </Link>
  </Grid>
  <Grid item>
    <Link target="_blank" href="https://twitch.com/knarfux">
      <FontAwesomeIcon size="2x" icon={faTwitch} />
    </Link>
  </Grid>
</Grid>

export default SocialMedias