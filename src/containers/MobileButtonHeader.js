import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Button from 'react-md/lib/Buttons/Button';
import '../assets/stylesheets/MobileHeader.css';
import {
  ALL_VERIFICATIONS,
  ENTER_PRODUCT_ID,
  LOGOUT,
} from '../utils/constants';

class MobileButtonHeader extends Component {
  render() {
    return (
      <div className="mobileHeader-toolbar">
        <Button
          flat
          className="mobileHeader-button mobileHeader-button--verification"
        >
          {this.props.location.pathname === '/' ||
          this.props.location.pathname === '/home'
            ? ALL_VERIFICATIONS
            : ENTER_PRODUCT_ID}
        </Button>
        <Button
          flat
          className="mobileHeader-button mobileHeader-button--logout"
        >
          {LOGOUT}
        </Button>
      </div>
    );
  }
}

MobileButtonHeader.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(MobileButtonHeader);
