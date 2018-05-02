import React from 'react';
import PropTypes from 'prop-types';

import '../../assets/stylesheets/ProductDetails.css';

import {
  EXPIRATION_LABEL,
  GTIN_LABEL,
  LOT_LABEL,
  PRODUCT_LABEL,
  NEXT_STEPS_LABEL,
  SERIAL_NUMBER_LABEL,
  NOT_VERIFIED,
  VERIFIED,
  ERROR,
  LOOKUP_NOT_FOUND,
  PRODUCT_NOT_VERIFIED,
} from '../../utils/constants';

import DateFormat from '../../utils/dateFormat';

const ProductDetails = ({
  productIdentifier,
  gtin,
  srn,
  lot,
  expDate,
  productName,
  showInModal,
  deviceType,
  errorMessage,
  status,
  nextStepCode,
}) => {
  const renderClassName = showInModal ? 'desktop-modal' : deviceType;
  const renderProductOrEventMeassage = (status, showInModal) => {
    if (status === VERIFIED) {
      return (
        <p className={`ProductDetails__product-name-${deviceType}`}>
          {PRODUCT_LABEL}: {productName}
        </p>
      );
    } else if (status === ERROR) {
      if (showInModal) {
        return null;
      } else {
        return <p className="ProductDetails__error-message">{errorMessage}</p>;
      }
    } else if (status === NOT_VERIFIED) {
      return (
        <p className={`ProductDetails__product-name-${deviceType}`}>
          <span className="ProductDetails__nextsteps-label">
            {`${NEXT_STEPS_LABEL}: `}
          </span>
          {nextStepCode === 'LOOKUP_NOT_FOUND'
            ? LOOKUP_NOT_FOUND
            : PRODUCT_NOT_VERIFIED}
        </p>
      );
    }
  };
  return (
    <div className="ProductDetails">
      <h6 className={`ProductDetails__pi-${renderClassName}`}>
        {productIdentifier}
      </h6>
      <div className={`ProductDetails__details-${renderClassName}`}>
        {showInModal ? (
          <p className="ProductDetails__error-message">{errorMessage}</p>
        ) : null}
        <p className="ProductDetails__gtin">
          {GTIN_LABEL}: {gtin}
        </p>
        <p className="ProductDetails__serial-number">
          {SERIAL_NUMBER_LABEL}: {srn}
        </p>
        <p className="ProductDetails__lot">
          {LOT_LABEL}: {lot}
        </p>
        <p className="ProductDetails__expiration">
          {EXPIRATION_LABEL}: {DateFormat.expirationDateFormat(expDate)}
        </p>
        {renderProductOrEventMeassage(status, showInModal)}
      </div>
    </div>
  );
};

ProductDetails.propTypes = {
  gtin: PropTypes.number,
  srn: PropTypes.number,
  lot: PropTypes.string,
  expDate: PropTypes.string,
  productName: PropTypes.string,
  productIdentifier: PropTypes.string,
  expirationDateFormat: PropTypes.func,
  showInModal: PropTypes.bool,
  deviceType: PropTypes.string,
  errorMessage: PropTypes.string,
  status: PropTypes.string,
  nextStepCode: PropTypes.string,
};

export default ProductDetails;
