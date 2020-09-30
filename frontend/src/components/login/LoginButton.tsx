import React from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardStyle1 from "../../assets/cards/card2.png";
import ManoAloeService from "../../controllers/mano-aloe.service"
import SessionService from "../../services/session.service"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundImage: `url(${CardStyle1})`,
            backgroundPosition: "center top",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            outline: 0,
            borderRadius: "10px",
            paddingTop: '3rem',
            minWidth: "200px"
        },
        "transition-modal-title": {
            textAlign: 'center',
            marginBottom: '3rem',
            color: "white"
        },
        inputField: {
            width: '300px',
            marginBottom: '2rem',
            marginLeft: '2rem',
            marginRight: '2rem',
            borderColor: 'white',
            color: 'white'
        },
        inputContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            color: 'white !important'
        },
        loginButton: {
            marginTop: '1rem',
            marginBottom: '1rem',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'red',
            },
            '&:hover fieldset': {
                borderColor: 'yellow',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'green',
            },
        },
        loggedInButton: {
            marginRight: '5px',
            paddingLeft: '50px',
            color: "white"
        },
        username: {
            color: "white",
            marginRight: '5px',
            fontFamily: "'Lato', 'Sawarabi Gothic', 'Cairo', 'Prompt', 'Noto Sans', 'sans-serif'"
        }
    }),
);


const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
        },
        '& .MuiFormLabel-root': {
            color: 'rgba(255, 255, 255, 0.8)',
        },
        '& .MuiInputBase-input': {
            color: 'rgba(255, 255, 255, 1)',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.23)',
            },
            '&:hover fieldset': {
                borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'white',
            },
        },
    },
})(TextField);

export default function LoginButton() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isLogin, setLogin] = React.useState(!!(SessionService.getLoginToken()) ? SessionService.getLoginToken() : false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const login = () => {
        new ManoAloeService()
            .login(username, password)
            .then(accessToken => {
                if (accessToken) {
                    SessionService.saveToken(accessToken)
                    setLogin(true)
                    setOpen(false)
                } else {
                    alert("Error: Username and password does not match any records")
                }
            })
    }

    const logout = () => {
        SessionService.removeLoginToken();
        setLogin(false)
        setOpen(false)
    }

    return (
        <React.Fragment>
            {isLogin ?
                <>
                    <Button className={"button" + classes.loggedInButton + ' active-page-icon'} aria-label="login" onClick={handleOpen}>
                        <small className={classes.username}>Nael</small>
                        <AccountCircle style={{ color: "#FFFF" }} />
                    </Button>

                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                            <div className={classes.paper}>
                                <h1 id="transition-modal-title" className={classes["transition-modal-title"]}>Logout ?</h1>
                                <div className={classes.inputContainer}>
                                    <Button variant="contained" color="secondary" className={classes.loginButton} onClick={logout}>
                                        Logout
                                    </Button>
                                </div>
                            </div>
                        </Fade>
                    </Modal>
                </>
                :
                <>
                    <IconButton className={"button"} aria-label="login" onClick={handleOpen}>
                        <AccountCircle />
                    </IconButton>

                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                            <div className={classes.paper}>
                                <h1 id="transition-modal-title" className={classes["transition-modal-title"]}>Login</h1>
                                <div className={classes.inputContainer}>
                                    <CssTextField
                                        className={classes.inputField}
                                        label="Username"
                                        variant="outlined"
                                        size="small"
                                        onChange={(event) => setUsername(event.target.value)}
                                        value={username}
                                    />
                                    <CssTextField
                                        className={classes.inputField}
                                        label="Password"
                                        variant="outlined"
                                        size="small"
                                        type="password"
                                        onChange={(event) => setPassword(event.target.value)}
                                        value={password}
                                    />
                                    <Button variant="contained" color="secondary" className={classes.loginButton} onClick={login}>
                                        Login
                            </Button>
                                </div>
                            </div>
                        </Fade>
                    </Modal>
                </>
            }
        </React.Fragment>
    )
}
