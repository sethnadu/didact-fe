import React, { useState } from 'react';
import { addCourse } from '../../store/actions';
import { useDispatch } from "react-redux";

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import clsx from "clsx";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles(theme => ({
  
  button: {
    boxShadow: 'none',
    borderRadius: '15px',
    background: '#EBE8E1',
    marginLeft: '70%',
  },
  card: {
    maxWidth: 500,
    borderRadius: 15,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  pos: {
    marginBottom: 12,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    // margin: '10px',
  },
  input: {
    backgroundColor: '#F4F8FA',
    filter: "brightness(95%)",
    borderRadius: 15,
    
  },
  inputDescription: {
    backgroundColor: '#F4F8FA',
    filter: "brightness(95%)",
    borderRadius: 15,
    margin: '-16px -10px -16px -10px',
    padding: '10px',
   
  },
  titleOrInstructorFields: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '45%',
    [`& fieldset`]: {
      borderRadius: 15,
    },
  },
  descriptionField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '93%',
    [`& fieldset`]: {
      borderRadius: 15,
      margin: "3px"
      
    },
  },
  // blackUnderline: {
  //   '&:after': {
  //     borderBottom: 'black solid 2px',
  //     color: 'black',
  //   },
  // },
  courseUrlField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '93%',
    [`& fieldset`]: {
      borderRadius: 15,
    },
  }
}));

// const labelStyle = {
//     color: 'black'
// }

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'gray',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'gray',
      },
      '&:hover fieldset': {
        borderColor: 'gray',
      },
      '&.Mui-focused fieldset': {
        border: '1px solid gray',
      },
  
  },
},
})(TextField);

export default function AddCourse() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: "",
    foreign_instructors: "",
    link: "",
    description: "",
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(values)
    dispatch(addCourse(values));
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title}  gutterBottom>
          Course Overview
        </Typography>
        <form onSubmit={handleSubmit} className={classes.container} noValidate autoComplete="off">
            <CssTextField
                id="standard-name"
                label='Name'
                className={classes.titleOrInstructorFields}
                value={values.name}
                onChange={handleChange('name')}
                margin="normal"
                variant="outlined"
                placeholder="Name"
                InputProps={{ classes: { underline: classes.blackUnderline, input: classes.input}}}
            />
            <CssTextField
                id="standard-name"
                label="Instructors"
                className={classes.titleOrInstructorFields}
                value={values.foreign_instructors}
                onChange={handleChange('foreign_instructors')}
                margin="normal"
                variant="outlined"
                placeholder="Instructors"
                InputProps={{ classes: { underline: classes.blackUnderline, input: classes.input}}}
            />
            <CssTextField
                id="standard-name"
                label="Description"
                className={classes.descriptionField}
                value={values.description}
                onChange={handleChange('description')}
                margin="normal"
                multiline={true}
                rows='6'
                variant="outlined"
                placeholder="Description"
                InputProps={{ classes: {underline: classes.blackUnderline, input: classes.inputDescription}}}
            />
            <CssTextField
                id="standard-name"
                label="Course Url"
                className={classes.courseUrlField}
                value={values.link}
                onChange={handleChange('link')}
                margin="normal"
                variant="outlined"
                placeholder="Course Url"
                InputProps={{ classes: { underline: classes.blackUnderline, input: classes.input}}}
            />
            <Button type='submit' size="small" variant="contained" className={classes.button} >Add Course</Button>
        </form>
      </CardContent>
      {/* <CardActions>
        <Button type='submit' size="small" variant="contained" className={classes.button} >Add Course</Button>
      </CardActions> */}
    </Card>
  );
}