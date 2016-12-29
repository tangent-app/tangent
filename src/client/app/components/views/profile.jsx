'use strict';

import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('api profile')
    axios.get('/api/profile')
    .then(function(res) {
      console.log('res', res);
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  render() {
    return (
      <h3>Profile page</h3>
    )
  }
}

export default Profile;