import React from 'react';
import PropTypes from 'prop-types';

import '../../assets/stylesheets/ProductDetails.css';

import {
  EXPIRATION_LABEL,
  GTIN_LABEL,
  LOT_LABEL,
  PRODUCT_LABEL,
  SERIAL_NUMBER_LABEL,
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
}) => {
  const renderClassName = showInModal ? 'desktop-modal' : deviceType;
  return (
    <div className="ProductDetails">
      <h6 className={`ProductDetails__pi-${renderClassName}`}>
        {productIdentifier}
      </h6>
      <div className={`ProductDetails__details-${renderClassName}`}>
        <p className="ProductDetails__error-message">{errorMessage}</p>
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
        <p className="ProductDetails__product-name">
          {PRODUCT_LABEL}: {productName === null ? '--' : productName}
        </p>
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
};

export default ProductDetails;
