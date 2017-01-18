'use strict';

import React, { Component } from 'react';

class Navbar extends Component {

  render() {
    return (
      <div className='nav-container'>
        <div className='brand-container'>
          <div className='brand-img'>tangent</div>
        </div>
        <div className='link-container'>
          <div className='nav-link'>
            <a href="/login">Login</a>
          </div>
          <div className='nav-link'>
            <a href="/signup">Sign Up</a>
          </div>
          <div className='nav-link'>
            <a href="/profile">Profile</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;