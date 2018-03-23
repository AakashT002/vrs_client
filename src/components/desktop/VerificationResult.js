import React from 'react';
import PropTypes from 'prop-types';
import {  Button } from 'react-md';

import Status from '../common/Status.js';
import ProductDetails from '../common/ProductDetails.js';

import '../../assets/stylesheets/DesktopVerificationResult.css';

const VerificationResult = props => {

  const verificationResultActions = [];
  verificationResultActions.push(
    <Button
      flat
      secondary
      onClick={() =>
        props.handleVerificationDetails(
          props.data[0].gtin,
          props.data[0].srn
        )
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
 alert(props.deviceType);
  return (
    <div className="desktopVerification-results">
      <Status 
      value={props.data[0].status} 
      deviceType={props.deviceType}
      />
      <ProductDetails
        productIdentifier={props.productIdentifier}
        gtin={props.data[0].gtin}
        srn={props.data[0].srn}
        lot={props.data[0].lot}
        expDate={props.data[0].expDate}
        productName={props.data[0].productName}
        showInModal={props.isPIVerificationModalVisible}
        deviceType={props.deviceType}
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
  deviceType: PropTypes.string
};

export default VerificationResult;