import PropTypes from 'prop-types';
import React from 'react';
import { TextField } from 'react-md';

import '../../assets/stylesheets/VerifyProduct.css';

const VerifyProduct = props => {
  return (
    <div className="verifyProduct">
      <TextField
        id="product id"
        className="verifyProduct__product-id"
        label="PRODUCT ID"
        placeholder="PRODUCT ID"
        value={props.productIdentifier}
        onChange={value => props.handleChange(value)}
      />
    </div>
  );
};

VerifyProduct.propTypes = {
  handleChange: PropTypes.func,
  productIdentifier: PropTypes.string,
};

export default VerifyProduct;
