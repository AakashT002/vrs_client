import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from 'react-md/lib/Papers';

import MobileHeader from './MobileHeader';
import Verifications from '../components/Verifications';

import 'font-awesome/css/font-awesome.min.css';
import '../assets/stylesheets/VerificationsPage.css';
import '../assets/stylesheets/MobileHomePage.css';

import { getVerificationList } from '../store/verifications/action';

class VerificationsPage extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getVerificationList());
  }

  render() {
    return (
      <Paper className="VerificationsPage">
        <div className="VerificationsPage-container">
          <br />
          <br />
          <div className="VerificationsPage-layout">
            <MobileHeader />
            <Verifications verificationList={this.props.verificationList} />
          </div>
        </div>
      </Paper>
    );
  }
}

VerificationsPage.propTypes = {
  verificationList: PropTypes.array,
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    verificationList: state.verifications.verificationList,
  };
}

export default connect(mapStateToProps)(VerificationsPage);
