import PropTypes from 'prop-types';
import React from 'react';
import { TextField } from 'react-md';

import '../../assets/stylesheets/VerifyProduct.css';

const VerifyProduct = props => {
  return (
    <div className="verifyProduct">
    <form onSubmit={props.handleVerify}>
      <TextField
        id="product id"
        className="verifyProduct__product-id"
        label="Product ID"
        placeholder="Product ID"
        value={props.productIdentifier}
        onChange={value => props.handleChange(value)}
      />
     </form>
    </div>
  );
};

VerifyProduct.propTypes = {
  handleChange: PropTypes.func,
  productIdentifier: PropTypes.string,
  handleVerify: PropTypes.func
};

export default VerifyProduct;
