'use strict';

import React, { Component } from 'react';
import axios from 'axios';
import AuthNavbar from './auth.navbar.jsx';
import Footer from './footer.jsx';
import subjects from '../../../../sample-data/subjects.json';

class Subjects extends Component {

  constructor(props) {
    super(props);
    this.state = {
      subjects: subjects,
      searchValue: ''
    };
    this._handleChange = this._handleChange.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._handleRoute = this._handleRoute.bind(this);
  }


  componentWillMount() {

    if( !localStorage.getItem('email') && !localStorage.getItem('token') ) {
      axios.get('/api/profile')
      .then((res) => {
        console.log('res', res);
        if(!res.data) window.location = '/login';
        else {
          localStorage.setItem('email', res.data.email);
          localStorage.setItem('token', res.data.token);
          this.setState({
            name: res.data.first_name + ' ' + res.data.last_name,
            email: res.data.email
          });
        }
       
      })
      .catch(function(err) {
        console.log(err);
      });
    }
    else if(localStorage.getItem('email') === 'undefined' && localStorage.getItem('token') ==='undefined' ) {
      this.props.router.push('/login');
    }
    
  }


  _handleChange(e) {
    var search = new RegExp(e.target.value, 'gi');
    var filtered = subjects.filter((subject) => {
      return subject.subject_name.match(search);
    });

    this.setState({ subjects: filtered, searchValue: e.target.value });
  }

  _handleClick(e) {
    let text = e.target.innerText.toLowerCase();

    if( text === 'all') {
      this.setState({ subjects: subjects });
    }
    else {
      var filtered = subjects.filter((subject) => {
        return subject.category === text;
      });

      this.setState({ subjects: filtered, searchValue: '' });
    }
  }

  _handleRoute(subject) {
    window.location = '/subjects/' + subject;
    // this.props.router.push('/subjects/' + subject);
  }

  render() {
    return (
      <div>
        <AuthNavbar />
        <div className='subject-container'>
          <div className='subject-header'>
            <div className='subject-header-text'>Choose a Subject to Review</div>
          </div>
          <div className='subject-sort-container'>
            <div className='subject-sort'>   
              <div className='subject-sort-btn' onClick={ this._handleClick } >All</div>
              <div className='subject-sort-btn' onClick={ this._handleClick } >Humanities</div>
              <div className='subject-sort-btn' onClick={ this._handleClick } >Sciences</div>
              <div className='subject-search'>
                <input id='filter-input' className='subject-search-input' value={ this.state.searchValue } type='text' placeholder='search' onChange={ this._handleChange } />
              </div>
            </div>
          </div>
          <div className='subject-list-container'>
            { 
              this.state.subjects.map((subject) => {
                return (
                  <div className='subject-card' key={ subject.key }> 
                    <div className='subject-card-btn-container'>
                      <i className="fa fa-plus-circle fa-2x subject-card-btn" aria-hidden="true"></i>
                    </div>
                    <div className='subject-card-text' onClick={ this._handleRoute.bind(this, subject.key) }> { subject.subject_name } </div>
                  </div>
                );
              })
            }
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Subjects;