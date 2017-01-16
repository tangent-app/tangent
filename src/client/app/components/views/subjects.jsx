'use strict';

import React, { Component } from 'react';
import axios from 'axios';
import AuthNavbar from './auth.navbar.jsx';
import Footer from './footer.jsx';
import subjects from '../../../../sample-data/subjects.json';

console.log(subjects);

class Subjects extends Component {

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
              <div className='subject-sort-btn'>Humanities</div>
              <div className='subject-sort-btn'>Sciences</div>
              <div className='subject-search'>
                <input className='subject-search-input' type='text' placeholder='search' />
              </div>
            </div>
          </div>
          <div className='subject-list-container'>
            { 
              subjects.map((subject) => {
                return (
                  <div className='subject-card'> 
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