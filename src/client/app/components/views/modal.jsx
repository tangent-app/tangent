'use strict';

import React, { Component } from 'react';

class Modal extends Component {
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
    this.state = {
      showModal: this.props.showModal
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('here?', nextProps)
    this.setState({ showModal: nextProps.showModal })
  }

  _handleClick() {
    this.setState({ showModal: 'modal-toggle-hide'});
  }

  render() {
    return(
      <div className={ this.state.showModal }>
        <div className='modal-container' onClick={ this._handleClick }></div>
        <div className='modal-content'>
          <div className='modal-box'>
            <div className='modal-text'>
              Would you like to add { this.props.subject } to my subjects?
            </div>
            <div className='modal-btn-container'>
              <div className='modal-btn'>Yes </div>
              <div className='modal-btn'>No </div>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default Modal;