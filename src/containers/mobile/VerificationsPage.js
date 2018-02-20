import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from 'react-md/lib/Papers';

import MobileHeader from './MobileHeader';
import Verifications from '../../components/mobile/Verifications';

import 'font-awesome/css/font-awesome.min.css';
import '../../assets/stylesheets/VerificationsPage.css';
import '../../assets/stylesheets/MobileHomePage.css';

import { getVerificationList } from '../../store/mobile/verification/action';

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
            <MobileHeader dispatch={this.props.dispatch} />
            <Verifications
              data={this.props.verificationList}
              requesting={this.props.requesting}
            />
          </div>
        </div>
      </Paper>
    );
  }
}

VerificationsPage.propTypes = {
  verificationList: PropTypes.array,
  dispatch: PropTypes.func,
  requesting: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    verificationList: state.verification.verificationList,
    requesting: state.verification.requesting,
  };
}

export default connect(mapStateToProps)(VerificationsPage);
