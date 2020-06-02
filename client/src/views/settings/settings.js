import React, { useState, useCallback, Component} from "react";
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

class SettingsScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            address: "",
            password: "",
            rePassword: ""
        }
        // this.handleSubmit = this.handleSubmit.bind(this)
    }


usernameHandler = (event) => {
    this.setState({
        username: event.target.value
    })
}

firstNameHandler = (event) => {
    this.setState({
        firstName: event.target.value
    })
}

lastNameHandler = (event) => {
    this.setState({
        lastName: event.target.value
    })
}

phoneNumberHandler = (event) => {
    this.setState({
        phoneNumber: event.target.value
    })
}

addressHandler = (event) => {
    this.setState({
        address: event.target.value
    })
}

passwordHandler = (event) => {
    this.setState({
        password: event.target.value
    })
}

rePasswordHandler = (event) => {
    this.setState({
        rePassword: event.target.value
    })
}

      submit = async() => {
          let model = {
            for: localStorage.getItem('user'),
            name: this.state.username,
            description: this.state.description,
            password: this.state.password,
            email: this.state.firstName
          }
         await Axios.post('/user/editSettings', model)
            .then(res => {
                alert("success!")
            })

            .catch(error => {
            console.log(error)
            })
   }

    render() {
        return (

            

            <>
            <div className="settings-container, body, view-holder">
                <form className="input">
                    <h1 className="h1">User Settings</h1>
 
                        <label className="settings-container, input">Edit username
                            <input className="input" type="text" 
                            value = {this.state.username} onChange = {this.usernameHandler} placeholder = "Edit username"/>
                                </label><br />
                                     

                        <label className="settings-container, input">Edit email
                            <input className="input" type="text" 
                            value = {this.state.firstName} onChange = {this.firstNameHandler} placeholder = "Edit name"/>
                                </label><br />
                                    
                                                
                        <label className="settings-container, input">Edit surname 
                            <input className="input" type="text" 
                            value = {this.state.lastName} onChange = {this.lastNameHandler} placeholder = "Edit surname"/>
                                </label><br />
                                    

                        <label className="settings-container, input">Edit password
                            <input className="input" type="text" 
                            value = {this.state.password} onChange = {this.passwordHandler} placeholder = "New password"/>
                                </label><br />
                                    
                        <label className="settings-container">Re-type password
                            <input className="input" type="text" 
                            value = {this.state.rePassword} onChange = {this.rePasswordHandler} placeholder = "Re-type password"/>
                                </label><br />  
                        <input className="input" type="button" 
                        onClick={ () => { this.submit() } } value="Save" />    
                 </form>
        </div>
        </>
        )
    }
}


export default SettingsScreen;