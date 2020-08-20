import React from 'react'
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import MapIcon from '@material-ui/icons/Map';
import MenuIcon from '@material-ui/icons/Menu';

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
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <img src={ManoAloeGif} alt="Mano Aloe GIF" style={{maxWidth:"50px", maxHeight:"50px"}} />
          </IconButton>
          <Typography variant="h4" className={classes.title}>
            魔の友 (Manotomo)
          </Typography>
          
          <ListItemLink to="/" icon={() => <HomeIcon /> } primary="Home" />
          <ListItemLink to="/about" icon={() => <InfoIcon /> }  primary="About" />
          <ListItemLink to="/latest" icon={() => <AnnouncementIcon /> } primary="Latest" />
          <ListItemLink to="/map" icon={() => <MapIcon /> } primary="Map" />
          <IconButton edge="start" style={{backgroundColor: "#1da1f2", padding: "8px", marginRight: "4px"}} aria-label="twitter" href="https://twitter.com/manoaloe" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink" width="1.1em" height="1.1em" style={{transform: "rotate(360deg)"}} viewBox="0 0 24 24">
              <path d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23z" fill="#ffffff"/>
            </svg>
          </IconButton>
          <IconButton edge="end" style={{backgroundColor: "#ff0000", padding: "8px"}} aria-label="youtube" href="https://www.youtube.com/channel/UCgZuwn-O7Szh9cAgHqJ6vjw" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink" width="1.1em" height="1.1em" style={{transform: "rotate(360deg)"}}  viewBox="0 0 24 24">
              <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73z" fill="#ffffff"/>
            </svg>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
