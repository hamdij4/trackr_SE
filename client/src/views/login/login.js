import React, { useState, useCallback} from "react";
import { Form, FormGroup, Label, Input, FormText, Col, Row, Container } from 'reactstrap';
import Button   from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert'; 
import './login.css'
import Axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import {Redirect} from 'react-router-dom'
import { Link } from "react-router-dom";

function LoginScreen() {

    const [loginInfo, setLoginInfo] = useState({
        username: "Username",
        password: "Password"
    })
    const [loggedIn, setLoggedIn] = useState(false);
    const [alert, setAlert] = useState(false);

    const login = async() => {
        await Axios.post('/authenticate', loginInfo)
        .then(res => {
            localStorage.setItem('token', res.data.jwt);
            localStorage.setItem('type', res.data.type);
            localStorage.setItem('user', res.data.user)
            setLoggedIn(true);
        })

        .catch(error => {
            console.log(error)
            setAlert(true)
        })
    }
    const handleInputField = useCallback(event => {
        setLoginInfo({...loginInfo, [event.target.name] : event.target.value})
      })

    return (
        <>
        <div
        className="login-container">
                <Row>
                    <Col md={7}>
                        LOGO
                    </Col>
                    <Col md={5} className="form-container">
                    <Form >
                        <FormGroup>
                        <Label for="username">
                            <FontAwesomeIcon  className="icon" icon={faUserCircle}/>
                        </Label>
                { alert ?
                (
                    <Alert severity="warning">This is a warning alert — check it out!</Alert>
                    ):( console.log(""))}
                        <Input onChange={handleInputField} type="text" name="username" placeholder="Username" className="field"
                        />
                        <Input onChange={handleInputField} type="password" name="password" placeholder="Password" className="field"
                        />
                        <Button onClick={login} className="btn-round" variant="contained" color="primary"style={{marginTop: "10px", width:"35%"}} type="button" >
                            Login
                    </Button> <br></br><Link to="/register" className="register-txt" >Need an account? Register here</Link>
                        </FormGroup>
                </Form>
                </Col>
                </Row>
          {
              loggedIn ?
              (<Redirect to='/home' />)
              : (console.log(""))
          }
        </div>
        </>
    )
}

export default LoginScreen;