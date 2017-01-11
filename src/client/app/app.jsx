'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import Navbar from './components/views/navbar.jsx';
import AuthNavbar from './components/views/auth.navbar.jsx';
import Footer from './components/views/footer.jsx';
import Login from './components/views/login.jsx';
import Signup from './components/views/signup.jsx';
import Profile from './components/views/profile.jsx';
import axios from 'axios';

class App extends Component {

  constructor() {
    super();
    this.isAuth = localStorage.getItem('token');
  }

  render () {
    return (
      <div className='app-container'>
        { this.isAuth ? <AuthNavbar /> : <Navbar />}
        <div className='app-img-container'>
          <div className='app-img'></div>
        </div>
        <div className='footer-container'>
          <Footer />
        </div>
      </div>
    );

  }
}




render((<Router history={ browserHistory }>
        <Route path="/" component={ App } />
        <Route path="/login" component={ Login } />
        <Route path="/signup" component={ Signup } />
        <Route path="/profile" component={ Profile } />
      </Router>), document.getElementById('main'));