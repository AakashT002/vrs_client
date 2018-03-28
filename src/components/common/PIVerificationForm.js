import PropTypes from 'prop-types';
import React from 'react';
import { TextField, Button } from 'react-md';

import '../../assets/stylesheets/PIVerificationForm.css';

import { DESKTOP } from '../../utils/constants';

const PIVerificationForm = props => {
  const verifyActions = [];
  verifyActions.push(
    <Button
      flat
      secondary
      onClick={props.handleReset}
      label={props.deviceType === DESKTOP ? 'Cancel' : 'Clear'}
      className="PIVerificationForm__reset--button"
      disabled={
        props.deviceType === DESKTOP
          ? false
          : props.productIdentifier === null ||
            props.productIdentifier === '' ||
            props.disableOnSubmit
      }
    />
  );
  verifyActions.push(
    <Button
      flat
      primary
      onClick={props.handleSubmit}
      label="VERIFY"
      className="PIVerificationForm__verify--button"
      disabled={
        props.productIdentifier === null || props.productIdentifier === ''
      }
    />
  );
  return (
    <div className={`PIVerificationForm-${props.deviceType}`}>
      {props.deviceType === DESKTOP ? (
        <h2 className="PIVerificationForm__title">Verify Product</h2>
      ) : (
        <div className="PIVerificationForm__container">
          <h2 className="PIVerificationForm__instruction">
            Enter a product identifier to verify
          </h2>
        </div>
      )}
      <form onSubmit={props.handleSubmit}>
        <TextField
          autoFocus
          id="product id"
          className="PIVerificationForm__product-id-input"
          label={
            props.deviceType === DESKTOP ? 'Product ID' : 'Product Identifier'
          }
          lineDirection="center"
          value={props.productIdentifier}
          onChange={value => props.handleChange(value)}
        />
        {verifyActions}
      </form>
    </div>
  );
};

PIVerificationForm.propTypes = {
  handleChange: PropTypes.func,
  disableOnSubmit: PropTypes.bool,
  productIdentifier: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleReset: PropTypes.func,
  deviceType: PropTypes.string,
};

export default PIVerificationForm;
