import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Divider, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import UserMenuItem from './UserMenuItem';
import { withRouter } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';

const useStyles = makeStyles({
  root: {
    width: '100%',
    justifySelf: 'center',
  },
  CardContent: {
    display: 'grid',
    justifyContent: 'center',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function SignIn(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedUser, setSelectedUser] = React.useState('');
  const [selectedUserId, setSelectedUserId] = React.useState('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignInClick = () => {
      props.dispatch(setAuthedUser(selectedUserId))
      props.history.push('/')
  }

  return (
    <Paper className={classes.root} variant="outlined">
      <CardContent className={classes.CardContent}>
        <Typography className={classes.title}  align="center">
          Welcome to the Would You Rather App !
        </Typography>
        <Typography variant="body1" component="h2" align="center">
          Please sign in to continue
        </Typography>
        <Divider style={{margin:"5px"}}/>
        <Typography variant="h5" color="textSecondary" align="center">
          Sign In
        </Typography>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Select User
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
          {props.userId.map((id) => (
              <UserMenuItem id={id} onSelected={(user)=>{
                  setSelectedUser(user)
                  setSelectedUserId(id)
                  setAnchorEl(null)
                }}/>
          ))}
      </Menu>
      <Typography>{selectedUser}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" style={{minWidth:"100%"}} size="large" onClick={handleSignInClick}>Sign In</Button>
      </CardActions>
    </Paper>
  );
}

function mapStateToProps ({ users }) {
    return {
      userId: Object.keys(users)
    }
  }
  
  export default withRouter(connect(mapStateToProps)(SignIn))