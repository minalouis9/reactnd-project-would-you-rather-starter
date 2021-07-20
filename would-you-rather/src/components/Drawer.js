import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';

import { NavLink } from 'react-router-dom'

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function TemporaryDrawer(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
    });

    const selectPage = () => {

    }

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list)}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
            <NavLink to='/' exact activeClassName='active' style={{ textDecoration: 'none' , color:'black'}}>
                <ListItem button key={'Home'} onClick={() => {
                    props.currentPage('Home')
                }}>
                        <ListItemIcon><HomeOutlinedIcon /></ListItemIcon>
                        <ListItemText primary={'Home'} />
                </ListItem>
                </NavLink>
                <NavLink to='/add' exact activeClassName='active' style={{ textDecoration: 'none' , color:'black'}}>
                <ListItem button key={'Questions'} onClick={() => {
                    props.currentPage('New Questions')
                }}>
                        <ListItemIcon><HelpOutlineOutlinedIcon /></ListItemIcon>
                        <ListItemText primary={'New Question'} />
                </ListItem>
                </NavLink>
                <NavLink to='/leaderboard' exact activeClassName='active' style={{ textDecoration: 'none' , color:'black'}}>
                <ListItem button key={'Leaderboard'} onClick={() => {
                    props.currentPage('Leaderboard')
                }}>
                        <ListItemIcon><AssignmentOutlinedIcon /></ListItemIcon>
                        <ListItemText primary={'Leaderboard'} />
                    
                </ListItem>
                </NavLink>
            </List>
        </div>
    );

    return (
        <div>
            <React.Fragment key={'left'}>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer('left', true)}>
                    <MenuIcon />
                </IconButton>
                <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
                    {list('left')}
                </Drawer>
            </React.Fragment>
        </div>
    );
}