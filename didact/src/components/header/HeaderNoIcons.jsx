import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-start"
  },
  appBar: {
      margin: "10px",
      borderRadius: "15px",
      width: `calc(100% - 20px)`,
      backgroundColor: 'gray',
      color: 'lightgray',

  },
  link: 
  {
    textDecoration: 'none',
    color: 'lightgray',
    fontSize: '1.5rem'
  }
}));


const HeaderSecondary = (props) => {
    const classes = useStyles();
    const {history} = props
    console.log('history', history.location.pathname)
    let linkTo = history.location.pathname.toLowerCase() === "/login" ? 'Register' : 'Login'

    return (
        <div className={classes.root}>
      <AppBar position="static" className = {classes.appBar}>
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            Didact
          </Typography>
          <Link to={`/${linkTo}`} className={classes.link}>{linkTo}</Link>
        </Toolbar>
      </AppBar>
    </div>
    )
}

export default HeaderSecondary;