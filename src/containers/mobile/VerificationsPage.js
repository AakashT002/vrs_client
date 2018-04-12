import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from 'react-md/lib/Papers';
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

import {
  EXPDATE_INDEX,
  GTIN_INDEX,
  LOT_INDEX,
  SRN_INDEX,
  PAST_24_HOURS,
  ALL_STATUS,
} from '../../utils/constants';

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
      dispatch(getVerifications(ALL_STATUS, PAST_24_HOURS));
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
          requestedTime = {PAST_24_HOURS}
        />
      );
    } else {
      const productIdentifier = `${GTIN_INDEX}${
        this.props.verificationResult[0].gtin
      }${SRN_INDEX}${this.props.verificationResult[0].srn}${LOT_INDEX}${
        this.props.verificationResult[0].lot
      }${EXPDATE_INDEX}${this.props.verificationResult[0].expDate}`;
      componentToRender = (
        <VerificationResult
          data={this.props.verificationResult}
          productIdentifier={productIdentifier}
          expirationDateFormat={DateFormat.expirationDateFormat}
          transactionEventDateFormat={DateFormat.transactionEventDateFormat}
          deviceType={process.env.REACT_APP_DEVICE_TYPE}
        />
      );
    }
    return (
      <Paper className="VerificationsPage">
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
      </Paper>
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
