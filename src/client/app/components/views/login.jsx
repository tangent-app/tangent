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
      <div style={ styles.container }>
        <div style={ styles.signinContainer } >
          <div style={ styles.signinIconContainer }>
            <i className="fa fa-user-circle-o" style={ styles.signinIcon } aria-hidden="true"></i>
          </div>
          <div>
            <form style={ styles.form }>
              <div>
                <i style={ styles.inputIcon } className="fa fa-user" aria-hidden="true"></i>
                <input type="text" name="username" style={ styles.input } placeholder="username" onChange={ this._handleChange } />
              </div>
              <div>
                <i style={ styles.inputIcon }className="fa fa-lock" aria-hidden="true"></i>
                <input type="text" name="password" style={ styles.input } placeholder="password" onChange={ this._handleChange } />
              </div>
                
                <button type="submit" value="Submit" style={ styles.button } onClick={ this._handleClick }>Login</button>
            </form>
          </div>
          <div style={ styles.smContainer } >
            <button style={ styles.smButton }>
              <span style={ styles.smButtonIcon }><i className="fa fa-google" aria-hidden="true"></i></span> 
              Google Signin
            </button>
       
            
            <button style={ styles.smButton }>
              <span style={ styles.smButtonIcon }><i className="fa fa-facebook" aria-hidden="true"></i></span> 
              Facebook Signin
            </button>
          </div>

        </div>
      </div>     
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  smContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: '120px 0 25px 0',
    width: '32vw'
  },
  smButton: {
    width: '24vw',
    height: '30px',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: '20px'
  },
  smButtonIcon: {
    marginRight: '5px'
  },
  signinContainer: {
    width: '32vw',
    height: '600px',
    border: '1px solid #C7C9C7',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8EAE8'
  },
  signinIconContainer: {
    margin: '0 0 30px 0',
  },
  signinIcon: {
    color: '#7aacd2',
    fontSize: '7em'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    marginBottom: '15px',
    width: '24vw',
    height: '20px',
    fontSize: '14px'
  },
  inputIcon: {
    marginRight: '5px',
    color: '#7aacd2'
  },
  button: {
    width: '24vw',
    height: '30px',
    fontSize: '14px'
  }
}

export default Login;