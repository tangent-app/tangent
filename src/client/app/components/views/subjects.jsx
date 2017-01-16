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
      subjects: subjects
    };
    this._handleChange = this._handleChange.bind(this);
    this._handleClick = this._handleClick.bind(this);
  }

  _handleChange(e) {
    var search = new RegExp(e.target.value, 'gi');
    var filtered = subjects.filter((subject) => {
      return subject.subject_name.match(search);
    });

    this.setState({ subjects: filtered });
  }

  _handleClick(e) {

    var text = e.target.innerText.toLowerCase();

    if( text === 'all') {
      this.setState({ subjects: subjects });
    }
    else {
      var filtered = subjects.filter((subject) => {
        return subject.category === text;
      });

      this.setState({ subjects: filtered });
    }
    
    var input = document.getElementById('filter-input');
    input.value = '';
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
                <input id='filter-input' className='subject-search-input' type='text' placeholder='search' onChange={ this._handleChange } />
              </div>
            </div>
          </div>
          <div className='subject-list-container'>
            { 
              this.state.subjects.map((subject) => {
                return (
                  <div className='subject-card'> 
                    <div className='subject-card-btn-container'>
                      <i className="fa fa-plus-circle fa-2x subject-card-btn" aria-hidden="true"></i>
                    </div>
                    <div className='subject-card-text'> { subject.subject_name } </div>
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