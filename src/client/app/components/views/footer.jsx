'use strict';

import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div className='footer-container'>
        <div className='brand-container'>
          <div className='brand-img'>tangent</div>
        </div>
        <div className='footer-text-container'>
          <a href='/about' className='footer-text'>About</a>
          <a href='/contact' className='footer-text'>Contact Us</a>
        </div>
      </div> 
    );
  }
}

export default Footer;