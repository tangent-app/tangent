'use strict';

import React, { Component } from 'react';
import axios from 'axios';
import AuthNavbar from './auth.navbar.jsx';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
    }

    this._handleLogout = this._handleLogout.bind(this);
  }

  _handleLogout() {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    this.props.router.push('/');
  }

  render() {
    return (
      <div>
        <AuthNavbar />
        <h3>Profile page</h3>
        <div onClick={ this._handleLogout }> Logout </div>
      </div>
    )
  }
}

export default Profile;