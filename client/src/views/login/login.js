import React, { useState, useCallback} from "react";
import { Form, FormGroup, Label, Input, FormText, Col, Row, Container } from 'reactstrap';
import Button   from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert'; 
import './login.css'
import Axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faAddressCard } from '@fortawesome/free-solid-svg-icons'
import {Redirect} from 'react-router-dom'
import { Link } from "react-router-dom";
import ReactCardFlip from 'react-card-flip';
import axios from 'axios'

function LoginScreen() {

    const [loginInfo, setLoginInfo] = useState({
        username: "Username",
        password: "Password"
    })
    const [registerInfo, setRegisterInfo] = useState({
        username: "Username",
        email: "E-mail@mail.com",
        name: "John",
        surname: "Doe",
        password: "Password"
      });
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginActive, setLoginActive] = useState(true)
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
        })
    }

    const handleRegisterField = useCallback(event => {
        setRegisterInfo({...registerInfo, [event.target.name] : event.target.value})
      })
      const handleInputField = useCallback(event => {
        setLoginInfo({...loginInfo, [event.target.name] : event.target.value})
        console.log(loginInfo)
      })

      const register = async () => {
        let model = {
          username: registerInfo.username_register,
          email: registerInfo.email,
          name: registerInfo.name,
          surname: registerInfo.surname,
          password: registerInfo.password_register
        }
        await axios.post('/registration', model)
          .then(res => {

          })
          .catch(error => {
          })
          .finally(
          )
      }

    return (
        <>
        <div
        className="login-container">
                <Row>
                    <Col md={7} className="left-section">
                        Trackr
                        <span className="logo-subtitle"> <i>We are what we do </i></span>
                    </Col>
                    <Col md={5} className="form-container">
                        { loginActive ? (
                        <Form className={loginActive ? 'visible-form' : 'hidden-form'}>
                            <FormGroup>
                            <Label for="username">
                                <FontAwesomeIcon  
                                    className="icon" 
                                    icon={faUserCircle}/>
                            </Label>
                            <Input 
                                onChange={handleInputField} 
                                type="text" name="username" 
                                placeholder="Username" 
                                className="gray-field"
                                style={{color: "gray !important"}}
                            />
                            <Input 
                                onChange={handleInputField} 
                                type="password" name="password" 
                                placeholder="Password" 
                                className="gray-field"
                            />
                            <Button 
                                onClick={login} 
                                className="login-btn" 
                                variant="outlined" 
                                color="primary"
                                style={{marginTop: "10px", width:"35%", 
                                        borderColor: "#95CCA4", backgroundColor: "#95CCA4",
                                        color:"white", fontWeight: "500"}} 
                                type="button">
                                Login
                        </Button> 
                        <br></br>
                        <div 
                            to="/register" 
                            className="register-txt"
                            onClick={ () => {
                                setLoginActive(false)
                            }}>
                            Need an account? Register here
                        </div>
                    </FormGroup>
                    </Form>
                    ) : (
                    <Form className={loginActive ? 'hidden-form' : 'visible-form'}>
                            <FormGroup>
                            <Label for="username_register">
                                <FontAwesomeIcon  
                                    className="icon" 
                                    icon={faAddressCard}/>
                            </Label>
                            <Input 
                                onChange={handleRegisterField} 
                                type="text" name="username_register" 
                                placeholder="Username" 
                                className="gray-field"
                            />
                            <Input 
                            onChange={handleRegisterField} 
                            type="text" name="name" 
                            placeholder="First name" 
                            className="gray-field"
                            />
                            <Input 
                            onChange={handleRegisterField} 
                            type="text" name="surname" 
                            placeholder="Last name" 
                            className="gray-field"
                            />
                            <Input 
                            onChange={handleRegisterField} 
                            type="text" name="email" 
                            placeholder="Email" 
                            className="gray-field"
                            />
                            <Input 
                                onChange={handleRegisterField} 
                                type="password" name="password_register" 
                                placeholder="Password" 
                                className="gray-field"
                            />
                            <Button 
                                onClick={register} 
                                className="register-btn" 
                                variant="outlined" 
                                color="primary"
                                style={{marginTop: "10px", width:"35%", 
                                        borderColor: "#95CCA4", backgroundColor: "#95CCA4",
                                        color:"white", fontWeight: "500", padding: "7px "}} 
                                type="button">
                                Register
                        </Button> 
                        <br></br>
                        <div 
                            className="register-txt"
                            onClick={ () => {
                                setLoginActive(true)
                            }}>
                            Have an account? Click here!
                        </div>
                    </FormGroup>
                    </Form>
                    )}
                        
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