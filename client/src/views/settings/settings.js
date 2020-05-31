import React, { useState, useCallback} from "react";
import { Form, FormGroup, Label, Input, FormText, Col, Row, Container } from 'reactstrap';
import Button   from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert'; 
import './settings.css'
import Axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faAddressCard } from '@fortawesome/free-solid-svg-icons'
import {Redirect} from 'react-router-dom'
import { Link } from "react-router-dom";
import ReactCardFlip from 'react-card-flip';
import axios from 'axios'

function SettingsScreen() {

    const [settings, setSettings] = useState({
        email : "",
        password: "",
        username : ""
    })

    // const login = async() => {
    //     await Axios.post('/authenticate', loginInfo)
    //     .then(res => {
    //         localStorage.setItem('token', res.data.jwt);
    //         localStorage.setItem('type', res.data.type);
    //         localStorage.setItem('user', res.data.user)
    //         setLoggedIn(true);
    //     })

    //     .catch(error => {
    //         console.log(error)
    //     })
    // }

    //   const handleInputField = useCallback(event => {
    //     setLoginInfo({...loginInfo, [event.target.name] : event.target.value})
    //   })

    return (
        <>
        <div className="view-holder">   
        <Container>
            <Row>
                <Col>
                Lijeva strana
                </Col>
                <Col>
                Desna strana
                </Col>
            </Row>
        </Container>

        </div>
        </>
    )
}

export default SettingsScreen;