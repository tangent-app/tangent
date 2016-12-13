'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this._handleChange = this._handleChange.bind(this);
    this._handleClick = this._handleClick.bind(this);
  }

  _handleChange(e) {
    var context = this;
    if(e.target.name === 'username') {
      this.setState({ username: e.target.value });
    } else {
      this.setState({ password: e.target.value });
    }
  }

  _handleClick(e) {
    e.preventDefault();
    axios.get('/api/signin')
    .then(function(res) {
      console.log('res', res);
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  render() {
    return (
      <div className='login-main-container' >
        <div className='login-container' >
          <div className='login-icon-container'>
            <i className="fa fa-user-circle-o login-icon" aria-hidden="true"></i>
          </div>
          <div className='login-form-container'>
            <form className='login-form' >
              <div className='login-input-container'>
                <i className="fa fa-user login-input-icon" aria-hidden="true"></i>
                <input className='login-input' type="text" name="username" placeholder="username" onChange={ this._handleChange } />
              </div>
              <div className='login-input-container'>
                <i className="fa fa-lock login-input-icon" aria-hidden="true"></i>
                <input className='login-input' type="text" name="password" placeholder="password" onChange={ this._handleChange } />
              </div>
                <div className='login-btn' type="submit" value="Submit" onClick={ this._handleClick }>Login</div>
            </form>
          </div>
          <div className='oauth-container'  >
            <div className="btn-google">
              <span className='oauth-btn-icon' ><i className="fa fa-google-plus" aria-hidden="true"></i></span> 
            </div>            
            <div className="btn-fb">
              <span className='oauth-btn-icon'><i className="fa fa-facebook" aria-hidden="true"></i></span> 
            </div>
          </div>

        </div>
      </div>     
    )
  }
}

export default Login;