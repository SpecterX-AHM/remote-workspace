import React from "react";
import { useEffect, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {firebaseApp} from "../../firebase-config";
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GroupIcon from '@material-ui/icons/Group';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import PersonalVideoIcon from '@material-ui/icons/PersonalVideo';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import ChatIcon from '@material-ui/icons/Chat';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
}));

const Navbar = (props)=> {
  //Login Functionality
  const firebaseAuth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();
  const sAuth = getAuth();
  const router = useRouter();
  const handleLoginBtn = async() => {
    const { user } = await signInWithPopup(firebaseAuth, provider);
    const { refreshToken, providerData } = user;
    console.log(refreshToken, providerData);
    localStorage.setItem("user", JSON.stringify(providerData));
    localStorage.setItem("accessToken", JSON.stringify(refreshToken));
    router.push("/home");
  }

  
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    firebaseAuth.onAuthStateChanged(function handleAuth(user) {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false)
      }
    });
  }, [user]);

  //logout functionality
  const handleLogoutBtn = () => {
    signOut(sAuth);
    router.push("/login");
  }

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    < >
          {
            user?.uid && 
            <>
              <CssBaseline />
      
              <AppBar
                position="fixed"
                style={{ background: '#117A8B' }}
                className={clsx(classes.appBar, {
                  [classes.appBarShift]: open,
                },"custom-nav")}>
    
              <Toolbar>
              <Box display='flex' flexGrow={1}  mx="auto" >
        
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: open,
                })}
              >
              <MenuIcon />
              </IconButton>
          
              </Box>
        
              {user?.photoURL !== undefined ?
              <Avatar  alt={user?.displayName} src={user?.photoURL} onClick={handleClick} /> : <Avatar onClick={handleClick}>{user?.displayName.charAt(0)}</Avatar>}
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>

                <MenuItem onClick={handleClose}>{user?.displayName}</MenuItem>
                <MenuItem onClick={handleLogoutBtn}>Logout</MenuItem>
              </Menu>
          
              </Toolbar>
              </AppBar>
              <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                  [classes.drawerOpen]: open,
                  [classes.drawerClose]: !open,
                })}
                classes={{
                  paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                  }),
                }}
              >
              <div className={classes.toolbar}>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              </div>

            <Divider />
            <List>
                <ListItem button key='Meetings'>
                    <Link href="/home" passHref>
                    <div>
                    <ListItemIcon><VideoCallIcon /></ListItemIcon>
                    <ListItemText primary='Meetings' />
                    </div>
                    </Link>
                </ListItem>
                <ListItem button key='My Personal Dashboard'>
                    <Link href="/personalDashboard" passHref>
                    <div>
                    <ListItemIcon><PersonalVideoIcon/></ListItemIcon>
                    <ListItemText primary='My Dashboard' />
                    </div>
                    </Link>
                </ListItem>
                <ListItem button key='Teams'>
                    <Link href="/teams" passHref>
                    <div>
                    <ListItemIcon><GroupIcon /></ListItemIcon>
                    <ListItemText primary='Teams' />
                    </div>
                    </Link>
                </ListItem>
            </List>
        
      </Drawer>
      </>
      }
    
      {!user?.uid &&
      <>
              <Box display='flex' flexGrow={1}  mx="auto" >
              <AppBar position="static" className="custom-nav" style={{ background: '#117A8B' }}>

                  <Toolbar>
                    <Typography variant="h6" className={classes.title}> 
                    Remote Workspace
                    </Typography> 
                  </Toolbar>
                </AppBar>
              </Box>
      </>}
    </>
  );
};

export default Navbar;

