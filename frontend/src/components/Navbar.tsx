import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'

import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import MapIcon from '@material-ui/icons/Map';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';

import ManoAloeGif from '../assets/AloeiconsBIG.gif'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    opacity: 0.7,
    backgroundBlendMode: "normal,luminosity",
    backdropFilter: 'blur(5px)',
    boxShadow: '3px 6px 20px rgba(104,102,255,.44), -3px -6px 10px hsla(0,0%,100%,.6)'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar style={{marginLeft:"5vw", marginRight: "5vw"}}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <img src={ManoAloeGif} alt="Mano Aloe GIF" style={{maxWidth:"50px", maxHeight:"50px"}} />
          </IconButton>
          <Typography variant="h4" className={classes.title}>
            魔の友 (Manotomo)
          </Typography>

          {[
            { externalLink: false, link: '/', iconFunc: () => <HomeIcon /> },
            { externalLink: true, link: 'https://github.com/AreYouW/mano-aloe', iconFunc: () => <InfoIcon /> },
            { externalLink: false, link: '/', iconFunc: () => <SportsEsportsIcon /> },
            { externalLink: false, link: '/', iconFunc: () => <MapIcon /> },
          ].map((obj, idx) => {
            let button;
            if (obj.externalLink) {
              button = <Button target="_blank" rel="noopener noreferrer" href={obj.link}>{obj.iconFunc()}</Button>;
            } else {
              button = <Button href={obj.link}>{obj.iconFunc()}</Button>;
            }
            return (
              <IconButton style={{color:"inherit"}}>
                { button }
              </IconButton>
            )
          })}
        </Toolbar>
      </AppBar>
    </div>
  );
}
