import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import '../../assets/stylesheets/DesktopVerificationResult.css';

import {
  ERROR,
  ERROR_LABEL,
  NOT_VERIFIED,
  NOT_VERIFIED_LABEL,
  PENDING,
  PENDING_LABEL,
  REQUESTING,
  VERIFIED,
  VERIFIED_LABEL,
} from '../../utils/constants';

import verified from '../../assets/images/verified.png';
import pending from '../../assets/images/pending.png';
import error from '../../assets/images/error.png';
import not_verified from '../../assets/images/not-verified.png';

const VerificationResult = props => {

  const renderStatusIcon = status => {
    if (status === VERIFIED) {
      return <img src={verified} alt="verified" />;
    } else if (status === PENDING) {
      return <img src={pending} alt="pending" />;
    } else if (status === ERROR) {
      return <img src={error} alt="error" />;
    } else if (status === NOT_VERIFIED) {
      return <img src={not_verified} alt="not-verified" />;
    }
  };

  const renderbgColor = status => {
    if (status === VERIFIED) {
      return 'verification-results__green';
    } else if (status === PENDING || status === REQUESTING) {
      return 'verification-results__blue';
    } else if (status === ERROR) {
      return 'verification-results__orange';
    } else if (status === NOT_VERIFIED) {
      return 'verification-results__amber';
    }
  };

  const renderStatusLabel = status => {
    if (status === VERIFIED) {
      return VERIFIED_LABEL;
    } else if (status === PENDING) {
      return PENDING_LABEL;
    } else if (status === ERROR) {
      return ERROR_LABEL;
    } else if (status === NOT_VERIFIED) {
      return NOT_VERIFIED_LABEL;
    }
  };

  const expirationDateFormat = date => {
    return moment(date).format('DD MMM YYYY');
  };

  return (
    <div className="desktopVerification-results">
      <div
        className={`verification-results__quick-view ${renderbgColor(
          props.data[0].status
        )}`}
      >
        <div className={'verification-results__quick-icon'}>
          {renderStatusIcon(props.data[0].status)}
        </div>
        <h1 className="verification-results__status">
          {renderStatusLabel(props.data[0].status)}
        </h1>
      </div>
      <h6 className="verification-results__pi">{props.productIdentifier}</h6>
      <div className="verification-product__details">
        <p className="verification-product__details--gtin">GTIN: {props.data[0].gtin}</p>
        <p className="verification-product__details--serial-number">
          Serial Number: {props.data[0].srn}
        </p>
        <p className="verification-product__details--lot">Lot: {props.data[0].lot}</p>
        <p className="verification-product__details--expiration">Expiration: {expirationDateFormat(props.data[0].expDate)}</p>
        <p className="verification-product__details--product-name">Product: {props.data[0].productName}</p>
      </div>
    </div>
  );
};

VerificationResult.propTypes = {
  data: PropTypes.array,
  productIdentifier: PropTypes.string,
};

export default VerificationResult;
