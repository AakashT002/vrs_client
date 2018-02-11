import React, { Component } from 'react';
import MobileButtonHeader from './MobileButtonHeader';
import '../assets/stylesheets/MobileHeader.css';
import { PROJECT_TITLE } from '../utils/constants';

class MobileHeader extends Component {
  render() {
    return (
      <div className="mobileHeader">
        <div className="mobileHeader-header">
          <br />
          <div className="mobileHeader-header--title">
            <label className="mobileHeader-title">{PROJECT_TITLE}</label>
          </div>
        </div>
        <MobileButtonHeader />
      </div>
    );
  }
}

export default MobileHeader;
