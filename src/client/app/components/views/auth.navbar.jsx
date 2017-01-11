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
            <a href="/subjects">Subjects</a>
          </div>
          <div className='nav-link'>
            <a href="/mysubjects">My Subjects</a>
          </div>
          <div className='nav-link'>
            <a href="/review">Review</a>
          </div>
          <div className='nav-link'>
            <a href="/profile">My Profile</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;