import React, { Component } from 'react';
import Paper from 'react-md/lib/Papers';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MobileHeader from './MobileHeader';
import '../assets/stylesheets/MobileHomePage.css';

export class MobileHomePage extends Component {
  render() {
    return (
      <Paper className="mobileHomePage">
        <div className="mobileHomePage-container">
          <br />
          <br />
          <div className="mobileHomePage-layout">
            <MobileHeader />
          </div>
        </div>
      </Paper>
    );
  }
}

MobileHomePage.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(MobileHomePage);
