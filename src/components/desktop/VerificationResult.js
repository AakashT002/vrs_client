import React from 'react';
import PropTypes from 'prop-types';

import Status from '../common/Status.js';
import ProductDetails from '../common/ProductDetails.js';

import '../../assets/stylesheets/DesktopVerificationResult.css';

const VerificationResult = props => {
  return (
    <div className="desktopVerification-results">
      <Status value={props.data[0].status} />
      <ProductDetails
        productIdentifier={props.productIdentifier}
        gtin={props.data[0].gtin}
        srn={props.data[0].srn}
        lot={props.data[0].lot}
        expDate={props.data[0].expDate}
        productName={props.data[0].productName}
        showInModal={props.isPIVerificationModalVisible}
      />
    </div>
  );
};

VerificationResult.propTypes = {
  data: PropTypes.array,
  productIdentifier: PropTypes.string,
  isPIVerificationModalVisible: PropTypes.bool,
};

export default VerificationResult;
