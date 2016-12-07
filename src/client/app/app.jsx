'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'
import Login from './components/views/login.jsx';
import Signup from './components/views/signup.jsx';

class App extends Component {

  render () {
    return (
      <div style={ styles.container }>
        <div style={ styles.link }>
          <Link to="/login">Login</Link>
        </div>
        <div style={ styles.link }>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    );

  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  link: {
    margin: '0 30px 0 0'
  }
};


render((<Router history={ browserHistory }>
        <Route path="/" component={ App } />
        <Route path="login" component={ Login } />
        <Route path="signup" component={ Signup } />
      </Router>), document.getElementById('main'));