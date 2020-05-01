import React, { Component } from 'react';
import './App.css';
import LoginScreen from './views/login/login';
import LandingScreen from './views/landing/landing';
import {BrowserRouter as Router,
        Switch, Route} from 'react-router-dom'
import TrackrNavbar  from './components/navbar/navbar';

class App extends React.Component {
  state = {
    navbarHidden : false
  };

  componentDidMount () {
    const currentRoute = window.location.pathname;
    console.log(currentRoute)
    if (currentRoute === '/login' ||  currentRoute ==='/') {
      this.setState({ navbarHidden: true });
    }
  } 

  render() {
    return (
      <div className="App">
        { !this.state.navbarHidden && <TrackrNavbar></TrackrNavbar>}
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
