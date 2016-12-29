'use strict';

import React, { Component } from 'react';

class Signup extends Component {
  render() {
    return (
      <div className='register-main-container'>
        <div className='register-container' >
          <div className='register-heading-container'>
            <div className='register-heading'>Sign up</div>
          </div>
          <div className='register-form-container'>
            <form className='register-form'>
              <div className='register-input-container'>
                <input className='register-input' type='text' name='firstname' placeholder='first name' />
                <input className='register-input' type='text' name='lastname' placeholder='last name' />
                <input className='register-input' type='text' name='email' placeholder='email' />
                <input className='register-input' type='text' name='username' placeholder='username' />
                <input className='register-input' type='text' name='password' placeholder='password' />
              </div>
              <div className='register-btn' type="submit" value="Submit" onClick={ this._handleClick }>Sign up</div>
            </form>
          </div> 
          <div className='register-footer signup'>
            <div className='register-footer-text'>Already have an account? <a href='/login' className='footer-link'>Log in!</a></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Signup;