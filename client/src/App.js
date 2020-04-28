import React, { Component } from 'react';
import './App.css';
import LoginScreen from './views/login/login';
import LandingScreen from './views/landing/landing';
import {BrowserRouter as Router,
        Switch, Route} from 'react-router-dom'

class App extends React.Component {
  state = {
    navbarHidden : false
  };
  render() {
    return (
      <div className="App">
     
      <Router>
        <Switch>
          <Route path = "/login" component = {LoginScreen}/>
          <Route path = "/home" component = {LandingScreen}/>
          <Route path = "/" component = {LoginScreen}/>
        </Switch>
      </Router>
      </div>
    );
  }
}

export default App;
