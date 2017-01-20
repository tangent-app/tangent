'use strict';

import React, { Component } from 'react';
import Navbar from './navbar.jsx';
import Footer from './footer.jsx';

class Subject extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='material-container'>
        <Navbar />
        <Footer />
      </div>
    );
  }
}

export default Subject;