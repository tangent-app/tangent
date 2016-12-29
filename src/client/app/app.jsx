'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'
import Footer from './components/views/footer.jsx';
import Login from './components/views/login.jsx';
import Signup from './components/views/signup.jsx';
import Profile from './components/views/profile.jsx';

class App extends Component {

  render () {
    return (
      <div className='app-container'>
        <div className='nav-container'>
          
          <div className='brand-container'>
            <div className='brand-img'>Tangent</div>
          </div>

          <div className='link-container'>
            <div className='nav-link'>
              <Link to="/login">Login</Link>
            </div>
            <div className='nav-link'>
              <Link to="/signup">Sign Up</Link>
            </div>
            <div className='nav-link'>
              <Link to="/profile">Profile</Link>
            </div>
          </div>
          
        </div>
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