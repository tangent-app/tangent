'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      text: ''
    }
    this._handleChange = this._handleChange.bind(this);
    this._handleClick = this._handleClick.bind(this);
  }

  _handleChange(e) {
    var context = this;
    if(e.target.name === 'email') {
      this.setState({ email: e.target.value });
    } 
    else {
      this.setState({ password: e.target.value });
    }
  }

  _handleClick(e) {
    e.preventDefault();
    console.log(this.state);
    axios.post('/api/signin', this.state)
    .then((res) => {
      if(typeof res.data === 'string') {
        this.setState({ text: res.data });
      } 
      else {
        this.props.router.push('/subjects');
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className='register-main-container' >
        <div className='register-container' >
          <div className='register-icon-container'>
            <i className='fa fa-user-circle-o register-icon' aria-hidden='true'></i>
          </div>
          <div className='register-form-container'>
            <form className='register-form' >
              <div className='register-input-container'>
                <i className='fa fa-user register-input-icon' aria-hidden='true'></i>
                <input className='register-input' value={ this.state.email } type='text' name='email' placeholder='email' onChange={ this._handleChange } />
              </div>
              <div className='register-input-container'>
                <i className='fa fa-lock register-input-icon' aria-hidden='true'></i>
                <input className='register-input' value={ this.state.password } type='password' name='password' placeholder='password' onChange={ this._handleChange } />
              </div>
                <div className='register-btn' type='submit' value='Submit' onClick={ this._handleClick }>Login</div>
            </form>
            { this.state.text ? <div className='register-res-text'> { this.state.text } </div> : null }
          </div>
          <div className='oauth-container'>
            <a href='/login/google'>
              <div className='btn-google' name='google'>
                <span className='oauth-btn-icon' ><i className='fa fa-google-plus' aria-hidden='true'></i></span> 
              </div>  
            </a>        
            <a href='/login/facebook'>
              <div className='btn-fb' name='facebook'>
                <span className='oauth-btn-icon'><i className='fa fa-facebook' aria-hidden='true'></i></span> 
              </div>
            </a>
          </div>
          <div className='register-footer'>
            <div className='register-footer-text'>Dont have an account? <a href='/signup' className='footer-link'>Sign up!</a></div>
          </div>
        </div>
      </div>     
    )
  }
}

export default Login;