'use strict';

import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './navbar.jsx';
import Footer from './footer.jsx';

class Subject extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      answer: null,
      activeIndex: null
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleAnswerChoice = this._handleAnswerChoice.bind(this);
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
    axios.post('/api/subject/' + this.props.routeParams.subject + '/' + this.state.data[0].question_name, 
      { 
        email: localStorage.getItem('email') 
      }
    )
    .then((res) => {
      console.log('answer submitted', res);
    })
    .catch((err) => {
      return console.log(err);
    });
  }

  _handleAnswerChoice(index) {
    console.log(index);
    this.setState({activeIndex: index})
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
            <AnswerChoice choice='a' index={0} isActive={ this.state.activeIndex === 0} onClick={ this._handleAnswerChoice.bind(this) } />
            <AnswerChoice choice='b' index={1} isActive={ this.state.activeIndex === 1} onClick={ this._handleAnswerChoice.bind(this) } />
            <AnswerChoice choice='c' index={2} isActive={ this.state.activeIndex === 2} onClick={ this._handleAnswerChoice.bind(this) } />
            <AnswerChoice choice='d' index={3} isActive={ this.state.activeIndex === 3} onClick={ this._handleAnswerChoice.bind(this) } />
            <AnswerChoice choice='e' index={4} isActive={ this.state.activeIndex === 4} onClick={ this._handleAnswerChoice.bind(this) } />
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


class AnswerChoice extends Component {

  _handleClick() {
    this.props.onClick(this.props.index)
  }


  render() {
    return (
      <div className={ this.props.isActive ? 'answer-choice-active' : 'answer-choice' } name='e' onClick={this._handleClick.bind(this)}> { this.props.isActive ? <i className="fa fa-check fa-2x" aria-hidden="true"></i> : this.props.choice } </div>
    );
    
  }

}
export default Subject;