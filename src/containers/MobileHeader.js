import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MobileButtonHeader from './MobileButtonHeader';
import MobileTitle from '../components/MobileTitle';
import '../assets/stylesheets/MobileHeader.css';
import mobile_header from '../assets/images/mobile_header.jpg';

class MobileHeader extends Component {
  render() {
    return (
      <div className="mobileHeader">
        <div className="mobileHeader-header">
          <img src={mobile_header} alt="logo" />
          <MobileTitle />
        </div>
        <MobileButtonHeader
          dispatch={this.props.dispatch}
          resetStateValues={this.props.resetStateValues}
        />
      </div>
    );
  }
}

MobileHeader.propTypes = {
  dispatch: PropTypes.func,
  resetStateValues: PropTypes.func,
};

export default MobileHeader;
