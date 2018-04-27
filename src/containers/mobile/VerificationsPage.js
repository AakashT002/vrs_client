import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MDSpinner from 'react-md-spinner';

import MobileHeader from './MobileHeader';
import Verifications from '../../components/mobile/Verifications';
import VerificationResult from '../../components/mobile/VerificationResult';

import 'font-awesome/css/font-awesome.min.css';
import '../../assets/stylesheets/VerificationsPage.css';
import '../../assets/stylesheets/ProductVerification.css';

import { clearVerificationResult } from '../../store/mobile/verification/action';
import { getVerifications } from '../../store/mobile/verification/action';
import { getVerificationDetails } from '../../store/mobile/verification/action';

import { ALL_STATUS, ONE_DAY } from '../../utils/constants';

import DateFormat from '../../utils/dateFormat';

class VerificationsPage extends Component {
  constructor(props) {
    super(props);
    this.handleVerificationDetails = this.handleVerificationDetails.bind(this);
  }

  componentWillMount() {
    if (!this.props.deviceType) {
      this.props.history.push('/home');
    }
    const { dispatch } = this.props;
    this.props.dispatch(clearVerificationResult()).then(() => {
      dispatch(getVerifications(ALL_STATUS, ONE_DAY));
    });
  }

  handleVerificationDetails(verification, requestedTime) {
    this.props.dispatch(
      getVerificationDetails(verification.gtin, verification.srn, requestedTime)
    );
  }

  render() {
    let componentToRender = null;

    if (this.props.verificationResult.length === 0) {
      componentToRender = (
        <Verifications
          data={this.props.verificationList}
          handleVerificationDetails={this.handleVerificationDetails}
          transactionEventDateFormat={DateFormat.transactionEventDateFormat}
          requestedTime={ONE_DAY}
        />
      );
    } else {
      componentToRender = (
        <VerificationResult
          data={this.props.verificationResult}
          expirationDateFormat={DateFormat.expirationDateFormat}
          transactionEventDateFormat={DateFormat.transactionEventDateFormat}
          deviceType={process.env.REACT_APP_DEVICE_TYPE}
        />
      );
    }
    return (
      <div className="VerificationsPage">
        <div className="VerificationsPage__container">
          <br />
          <br />
          <div className="VerificationsPage__layout">
            <MobileHeader dispatch={this.props.dispatch} />
            {this.props.requesting ? (
              <div className="VerificationsPage__loader">
                <MDSpinner size={50} singleColor="#00b8d4" />
              </div>
            ) : (
              componentToRender
            )}
          </div>
        </div>
      </div>
    );
  }
}

VerificationsPage.propTypes = {
  verificationList: PropTypes.array,
  dispatch: PropTypes.func,
  requesting: PropTypes.bool,
  verificationResult: PropTypes.array,
  deviceType: PropTypes.string,
  history: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    verificationList: state.verification.verificationList,
    requesting: state.verification.requesting,
    verificationResult: state.verification.verificationResult,
    deviceType: state.verification.deviceType,
  };
}

export default connect(mapStateToProps)(VerificationsPage);
