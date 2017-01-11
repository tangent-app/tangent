'use strict';

import React, { Component } from 'react';
import axios from 'axios';
import AuthNavbar from './auth.navbar.jsx';

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
                <input className='subject-search-input' type='text' placeholder='search for subject' />
              </div>
            </div>
          </div>
        </div>
        
      </div>
    )
  }
}

export default Subjects;