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
      activeIndex: null,
      submittedTime: null,
      currentTime: '2:00'
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleAnswerChoice = this._handleAnswerChoice.bind(this);
  }

  componentWillMount() {
    axios.post('/api/subject/' + this.props.routeParams.subject, { email: localStorage.getItem('email')})
    .then((res) => {
      this.setState({ data: res.data });
    })
    .catch((err) => {
      return console.log(err);
    });

  }

  _handleSubmit(e) {
    
    if(e.target.innerText.toLowerCase() === 'skip') {
      this.setState({ answer: null }, () => {
        axios.post('/api/subject/' + this.props.routeParams.subject + '/' + this.state.data[0].question_name, 
          { 
            email: localStorage.getItem('email'),
            answer: this.state.answer,
            difficulty: this.state.data[0].difficulty,
            type: this.state.data[0].type,
            submitted_time: this.state.submittedTime, 
          }
        )
        .then((res) => {
          window.location ='/subjects/' + this.props.routeParams.subject;
        })
        .catch((err) => {
          return console.log(err);
        });
      });
    } 

    else {
      axios.post('/api/subject/' + this.props.routeParams.subject + '/' + this.state.data[0].question_name, 
        { 
          email: localStorage.getItem('email'),
          answer: this.state.answer,
          difficulty: this.state.data[0].difficulty,
          type: this.state.data[0].type,
          submitted_time: this.state.submittedTime, 
        }
      )
      .then((res) => {
        window.location ='/subjects/' + this.props.routeParams.subject;
      })
      .catch((err) => {
        return console.log(err);
      });
    }
    
  }

  _handleAnswerChoice(index, choice) {
    let answerChoice = choice.toLowerCase();

    if(answerChoice === this.state.data[0].answer) this.setState({ answer: true });
    else this.setState({ answer: false});
      
    this.setState({activeIndex: index})  
  }

 

  componentDidMount() {

    let timer = 120000;
    let millisToMinutesAndSeconds = (millis) => {
      if(timer < 1000) {
        clearInterval(questionTime);

        this._handleSubmit();
      }
      let minutes = Math.floor(millis / 60000);
      let seconds = ((millis % 60000) / 1000).toFixed(0);
      timer -= 1000;
      
      let currentTimer = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;

      this.setState({ currentTime: currentTimer, submittedTime: timer });
      return currentTimer;
    }

    let questionTime = setInterval(() => { millisToMinutesAndSeconds(timer) }, 1000);

    

  }

  render() {
    return (
      <div>
        <Navbar />
        <div className='material-container'>
          <h3> { this.state.currentTime } </h3>
          <div className='material-text'>
            <img src={ this.state.data[0] ? this.state.data[0].text : null } />
          </div>
          <div className='material-question'>
            <img src={ this.state.data[0] ? this.state.data[0].question : null } />
          </div>
          <div className='material-answer-choices'>
            <AnswerChoice choice='A' index={0} isActive={ this.state.activeIndex === 0} onClick={ this._handleAnswerChoice.bind(this) } />
            <AnswerChoice choice='B' index={1} isActive={ this.state.activeIndex === 1} onClick={ this._handleAnswerChoice.bind(this) } />
            <AnswerChoice choice='C' index={2} isActive={ this.state.activeIndex === 2} onClick={ this._handleAnswerChoice.bind(this) } />
            <AnswerChoice choice='D' index={3} isActive={ this.state.activeIndex === 3} onClick={ this._handleAnswerChoice.bind(this) } />
            <AnswerChoice choice='E' index={4} isActive={ this.state.activeIndex === 4} onClick={ this._handleAnswerChoice.bind(this) } />
          </div>
          <div className='material-submit-container'>
            <div className='material-submit-btn' onClick={ this._handleSubmit } >Submit</div>
            <div className='material-skip-btn' onClick={ this._handleSubmit } >Skip</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}


class AnswerChoice extends Component {

  _handleClick() {
    this.props.onClick(this.props.index, this.props.choice);
  }


  render() {
    return (
      <div className={ this.props.isActive ? 'answer-choice-active' : 'answer-choice' } name='e' onClick={this._handleClick.bind(this)}> { this.props.isActive ? <i className="fa fa-check fa-2x" aria-hidden="true"></i> : this.props.choice } </div>
    );
    
  }

}
export default Subject;