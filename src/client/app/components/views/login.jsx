'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';

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
    console.log(this.state);
  }

  render() {
    return (
      <div style={ styles.container }>
        <div style={ styles.smContainer } >
          <button style={ styles.smButton }> Google Signin</button>
          <button style={ styles.smButton }> Facebook Signin</button>
        </div>
        <div>
          <form style={ styles.form }>
              <input type="text" name="username" style={ styles.input } placeholder="username" onChange={ this._handleChange } />
              <input type="text" name="password" style={ styles.input } placeholder="password" onChange={ this._handleChange } />
              <button type="submit" value="Submit" style={ styles.button } onClick={ this._handleClick }>Login</button>
          </form>
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: '20px 0 25px 0',
    width: '50vw'
  },
  smButton: {
    width: '20vw',
    height: '30px',
    fontSize: '18px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    marginBottom: '15px',
    width: '50vw',
    height: '30px',
    fontSize: '24px'
  },
  button: {
    width: '50vw',
    height: '30px',
    fontSize: '16px'
  }
}

export default Login;