import React, { Component } from 'react';
import './App.css';
import LoginScreen from './views/login/login';
import LandingScreen from './views/landing/landing';
import SettingsScreen from './views/settings/settings';
import {BrowserRouter as Router,
        Switch, Route} from 'react-router-dom'
import TrackrNavbar  from './components/navbar/navbar';
import ProjectScreen from './views/projects/projects';

class App extends React.Component {
  state = {
    navbarHidden : false
  };

  componentDidMount () {
    const currentRoute = window.location.pathname;
    if (currentRoute === '/login' ||  currentRoute ==='/') {
      this.setState({ navbarHidden: true });
    }
  } 

  render() {
    return (
      <Router>
      <div className="App">
        { !this.state.navbarHidden && <TrackrNavbar></TrackrNavbar>}
        <Switch>
          <Route path = "/login" component = {LoginScreen}/>
          <Route path = "/home" component = {LandingScreen}/>
          <Route path = "/settings" component = {SettingsScreen}/>
          <Route path = "/projects" component = {ProjectScreen}/>
          <Route path = "/" component = {LoginScreen}/>
        </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
