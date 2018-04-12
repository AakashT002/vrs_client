import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-md';

import Status from '../common/Status.js';
import ProductDetails from '../common/ProductDetails.js';

import '../../assets/stylesheets/DesktopVerificationResult.css';

import { ERROR } from '../../utils/constants';

const VerificationResult = props => {
  const verificationResultActions = [];
  var errorMessage;
  if (props.data[0].status === ERROR && props.isPIVerificationModalVisible) {
    props.data[0].events.map(event => {
      if (event.eventStatus === ERROR) {
        errorMessage = 'Error ' + event.statusCode + ': ' + event.eventMessage;
      }
      return errorMessage;
    });
  }

  verificationResultActions.push(
    <Button
      flat
      secondary
      onClick={() =>
        props.handleVerificationDetails(props.data[0].gtin, props.data[0].srn, props.selectedRequestTime)
      }
      className="desktopVerification-results__view-details--button"
    >
      VIEW DETAILS
    </Button>
  );
  verificationResultActions.push(
    <Button
      flat
      primary
      onClick={props.handleNextProduct}
      className="desktopVerification-results__next-product--button"
    >
      NEXT PRODUCT
    </Button>
  );

  return (
    <div className="desktopVerification-results">
      <Status value={props.data[0].status} deviceType={props.deviceType} />
      <ProductDetails
        productIdentifier={props.productIdentifier}
        gtin={props.data[0].gtin}
        srn={props.data[0].srn}
        lot={props.data[0].lot}
        expDate={props.data[0].expDate}
        productName={props.data[0].productName}
        showInModal={props.isPIVerificationModalVisible}
        deviceType={props.deviceType}
        errorMessage={errorMessage}
      />
      {verificationResultActions}
    </div>
  );
};

VerificationResult.propTypes = {
  data: PropTypes.array,
  productIdentifier: PropTypes.string,
  isPIVerificationModalVisible: PropTypes.bool,
  handleNextProduct: PropTypes.func,
  handleVerificationDetails: PropTypes.func,
  deviceType: PropTypes.string,
  selectedRequestTime: PropTypes.bool
};

export default VerificationResult;
