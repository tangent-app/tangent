'use strict';

import React, { Component } from 'react';

class Navbar extends Component {

  render() {
    return (
      <div className='nav-container'>
        <div className='brand-container'>
          <div className='brand-img'>Tangent</div>
        </div>
        <div className='link-container'>
          <div className='nav-link'>
            <a href="/login" className='nav-link-text'>Login</a>
          </div>
          <div className='nav-link'>
            <a href="/signup" className='nav-link-text'>Sign Up</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;