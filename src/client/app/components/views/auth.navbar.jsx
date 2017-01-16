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
            <a href="/subjects">subjects</a>
          </div>
          <div className='nav-link'>
            <a href="/mysubjects">my subjects</a>
          </div>
          <div className='nav-link'>
            <a href="/review">review</a>
          </div>
          <div className='nav-link'>
            <a href="/profile">my profile</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;