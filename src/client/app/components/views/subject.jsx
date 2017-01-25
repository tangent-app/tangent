'use strict';

import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './navbar.jsx';
import Footer from './footer.jsx';

class Subject extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: ''
    };
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  componentWillMount() {
    axios.post('/api/subject/' + this.props.routeParams.subject, { email: localStorage.getItem('email')})
    .then((res) => {
      console.log(res.data);
      this.setState({ data: res.data });
    })
    .catch((err) => {
      return console.log(err);
    });

  }

  _handleSubmit() {
    axios.post('/api/subject/' + this.props.routeParams.subject + '/' + this.state.data[0].question_name, { email: localStorage.getItem('email') })
    .then((res) => {
      console.log('answer submitted', res);
    })
    .catch((err) => {
      return console.log(err);
    });
  }

/* 

  componentDidMount() {

    var timer = 3000;

    var millisToMinutesAndSeconds = function(millis) {

      if(timer < 1000) {
        clearInterval(y);
      }
      


      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      timer -= 1000;
      
      var x = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;

      console.log('x', x, timer);
      return x;
    }

    var y = setInterval(() => { millisToMinutesAndSeconds(timer) }, 1000);

    

  }


*/
  

  render() {
    return (
      <div>
        <Navbar />
        <div className='material-container'>
          <div className='material-text'>
            <img src={ this.state.data[0] ? this.state.data[0].text : null } />
          </div>
          <div className='material-question'>
            <img src={ this.state.data[0] ? this.state.data[0].question : null } />
          </div>
          <div className='material-answer-choices'>
            <div className='material-choice'>A</div>
            <div className='material-choice'>B</div>
            <div className='material-choice'>C</div>
            <div className='material-choice'>D</div>
            <div className='material-choice'>E</div>
          </div>
          <div className='material-submit-container'>
            <div className='material-submit-btn' onClick={ this._handleSubmit } >Submit</div>
            <div className='material-skip-btn'>Skip</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Subject;