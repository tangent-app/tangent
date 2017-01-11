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
  }

  componentWillMount() {
    axios.get('/api/profile')
    .then((res) => {
      console.log('res', res);
      if(!res.data) window.location = '/login';
      else {
        localStorage.setItem('email', res.data.email);
        localStorage.setItem('token', res.data.token);
        this.setState({
          name: res.data.first_name + ' ' + res.data.last_name,
          email: res.data.email
        });
      }
     
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  render() {
    return (
      <div>
        <AuthNavbar />
        <h3>Profile page</h3>
        <div></div>
      </div>
    )
  }
}

export default Profile;