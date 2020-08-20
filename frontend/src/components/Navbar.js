import React from 'react'
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';

import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
// import AnnouncementIcon from '@material-ui/icons/Announcement';
import MapIcon from '@material-ui/icons/Map';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';

import ManoAloeGif from '../assets/AloeiconsBIG.gif'

// Required forwardRef to use Third Party Routing Library (react-router-dom)
function ListItemLink(props) {
  const { icon, primary, to } = props;

  const CustomLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, ref) => (
        <Link ref={ref} to={to} {...linkProps} />
      )),
    [to],
  );

  return (
    <IconButton component={CustomLink} style={{color:"inherit"}}>
      <ListItemIcon>{icon()}</ListItemIcon>
    </IconButton>
  );
}


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
          
          <ListItemLink to="/" icon={() => <HomeIcon /> } primary="Home" />
          <ListItemLink to="/about" icon={() => <InfoIcon /> }  primary="About" />
          <ListItemLink to="/game" icon={() => <SportsEsportsIcon /> } primary="Latest" />
          <ListItemLink to="/map" icon={() => <MapIcon /> } primary="Map" />
        </Toolbar>
      </AppBar>
    </div>
  );
}
