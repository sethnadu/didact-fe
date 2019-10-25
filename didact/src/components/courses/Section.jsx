import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { updateSection, getLessonsBySectionId } from '../../store/actions';
import Lessons from './Lessons'
import AddLessons from './AddLessons'

import AddCircleIcon from '@material-ui/icons/AddCircle';
import { AddButtonInSection, ButtonTextInSection } from '../dashboard/ButtonStyles';

const useStyles = makeStyles(theme => ({

    root: {
        width: '100%',
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"
    },
    button: {
        boxShadow: 'none',
        borderRadius: '15px',
        background: '#EBE8E1',
        marginLeft: '70%',
    },
    card: {
        width: '50vw',
        maxWidth: 500,
        minWidth: 375,
        borderRadius: 15,
        margin: '10px 0'
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    pos: {
        marginBottom: 12,
    },
    expand: {
        transform: 'rotate(0deg)',
        // marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
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
            margin: "3px",

        },
    },

    courseUrlField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '93%',
        [`& fieldset`]: {
            borderRadius: 15,
        },
    },

    descriptionDiv: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        // padding: '0'
    },
    descriptionTitle: {
        marginBottom: "0px"
    },
    iconCircle: {
        color: "#575758",
        fontSize: "2rem",
    },

}));

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

const Section = ({ section, props }) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const state = useSelector(state => state.sectionsReducer)
    const lessons = state.lessons
    const [expanded, setExpanded] = React.useState(false);
    const [sectionEdit, setSectionEdit] = useState(true)
    const [addLessonChange, setAddLessonChange] = useState(false);
    const [changes, setChanges] = useState({
        name: "",
        description: "",
        order: "",
        link: ""
    })

    useEffect(() => {
        setChanges({
            name: section.name,
            order: section.order,
            link: section.link,
            description: section.description,
        })
    }, [section])


    useEffect(() => {
        dispatch(getLessonsBySectionId(props.match.params.id, section.id))
    }, [dispatch, props.match.params.id, section.id])

    const toggleEdit = () => {
        setSectionEdit(!sectionEdit)
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleChange = name => event => {
        setChanges({ ...changes, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(updateSection(props.match.params.id, section.id, changes))
        setSectionEdit(true)
    };

    const handleLessonFormToggle = () => {
        setAddLessonChange(true)
    }
    return (
        <>
            {sectionEdit ? (
                <Card className={classes.card}>
                    <CardContent style={{ marginBottom: "20px" }}>
                        <Typography variant="h5" component="h2">
                            {section.name}
                        </Typography>
                        <CardActions className={classes.descriptionDiv} disableSpacing>
                            <Typography className={classes.descriptionTitle} >Description:</Typography>
                            <IconButton
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>
                                    {section.description}
                                </Typography>
                            </CardContent>
                        </Collapse>
                        <Typography color="textSecondary">
                            Order: {section.order}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {section.link}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button style={{ marginTop: '1px' }} onClick={toggleEdit} type='submit' size="small" variant="contained" className={classes.button} >Edit Section</Button>
                    </CardActions>
                    {addLessonChange ? <AddLessons props={props} section={section} setAddLessonChange={setAddLessonChange} /> : null}
                    {lessons ? <Lessons section={section} props={props} lessons={lessons} /> : null}
                    <AddButtonInSection style={{ marginTop: '1px' }} onClick={handleLessonFormToggle}>
                        <AddCircleIcon className={classes.iconCircle} />
                        <ButtonTextInSection>Add Lesson</ButtonTextInSection>
                    </AddButtonInSection>
                </Card>
            ) : (
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title} gutterBottom>
                                Add Section
                         </Typography>
                            <form onSubmit={handleSubmit} className={classes.container} noValidate autoComplete="off">
                                <CssTextField
                                    id="standard-name"
                                    label='Name'
                                    className={classes.titleOrInstructorFields}
                                    value={changes.name}
                                    onChange={handleChange('name')}
                                    margin="normal"
                                    variant="outlined"
                                    placeholder="Name"
                                    InputProps={{ classes: { input: classes.input } }}
                                />
                                <CssTextField
                                    id="standard-name"
                                    label="Order"
                                    className={classes.titleOrInstructorFields}
                                    value={changes.order}
                                    onChange={handleChange('order')}
                                    margin="normal"
                                    variant="outlined"
                                    placeholder="Instructors"
                                    InputProps={{ classes: { input: classes.input } }}
                                />
                                <CssTextField
                                    id="standard-name"
                                    label="Description"
                                    className={classes.descriptionField}
                                    value={changes.description}
                                    onChange={handleChange('description')}
                                    margin="normal"
                                    multiline={true}
                                    rows='6'
                                    variant="outlined"
                                    placeholder="Description"
                                    InputProps={{ classes: { input: classes.inputDescription } }}
                                />
                                <CssTextField
                                    id="standard-name"
                                    label="Section Url"
                                    className={classes.courseUrlField}
                                    value={changes.link}
                                    onChange={handleChange('link')}
                                    margin="normal"
                                    variant="outlined"
                                    placeholder="Course Url"
                                    InputProps={{ classes: { input: classes.input } }}
                                />
                                <Button type='submit' size="small" variant="contained" className={classes.button} >Submit Edit</Button>
                            </form>
                        </CardContent>
                    </Card>
                )
            }
        </>
    )
}

export default Section