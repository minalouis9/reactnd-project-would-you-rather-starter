// import React from 'react'
// import { NavLink } from 'react-router-dom'

// export default function Nav () {
//   return (
//     <nav className='nav'>
//       <ul>
//         <li>
//           <NavLink to='/' exact activeClassName='active'>
//             Home
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to='/add' activeClassName='active'>
//             New Question
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to='/leaderBoard' activeClassName='active'>
//             Leader Board
//           </NavLink>
//         </li>
//         <li>
//             {`Hello,`}
//         </li>
//         <li>
//           <NavLink to='/chooseUser' activeClassName='active'>
//             Logout
//           </NavLink>
//         </li>
//       </ul>
//     </nav>
//   )
// }



import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import TemporaryDrawer from './Drawer.js'
import { colors } from '@material-ui/core';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser'
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        alignSelf: 'center',
        paddingLeft: '10px',
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    paper: {
        backgroundColor: colors.blue
    }
}));

function MenuAppBar(props) {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const [currentPageTitle, setCurrentPageTitle] = React.useState('Home')

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogoutClick = () => {
        setAnchorEl(null)
        props.dispatch(setAuthedUser(null))
        if (props.authedUser !== props.currentUser.id) { setAuth(false) }
        else { setAuth(true) }
        setCurrentPageTitle('Sign In')
        props.history.push("/chooseUser");
    }

    console.log(props)

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    {auth && <TemporaryDrawer currentPage={(title) => {
                        setCurrentPageTitle(title)
                    }} />}
                    <Typography variant="h6" className={classes.title}>
                        {currentPageTitle}
                    </Typography>
                    {auth && (
                        <div className={classes.sectionDesktop}>
                            {/* <Button color="inherit">Logout</Button> */}
                            <Button
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <Typography className={classes.title} variant='body1' >{`Hello, ${props.currentUser.name}`}</Typography>
                                <AccountCircle style={{ paddingLeft: '10px' }} />
                            </Button>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

function mapStateToProps({ authedUser, users }) {
    const currentUser = users[authedUser]

    return {
        authedUser,
        currentUser
    }
}

export default withRouter(connect(mapStateToProps)(MenuAppBar))