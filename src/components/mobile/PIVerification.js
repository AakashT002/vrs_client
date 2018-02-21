import React from 'react';
import { TextField, Button } from 'react-md';
import PropTypes from 'prop-types';
import '../../assets/stylesheets/PIVerification.css';

const PIVerification = props => {
  let classname = props.productIdentifier
    ? 'pi-verification__verify-button-active'
    : 'pi-verification__verify-button-inActive';
  return (
    <div className="pi-verification">
      <div className="pi-verification__container">
        <h2 className="pi-verification__instruction">
          Enter a product identifier to verify
        </h2>
        <form onSubmit={props.handleSubmit}>
          <TextField
            autoFocus
            id="floating-center-title"
            label="Product Identifier"
            lineDirection="center"
            placeholder=""
            required
            className="pi-verification__serial-number-input"
            onChange={value => props.handleChange(value)}
            value={props.productIdentifier}
          />
          <Button
            className={classname}
            type="submit"
            onClick={props.handleSubmit}
            raised
          >
            Verify
          </Button>
        </form>
      </div>
    </div>
  );
};

PIVerification.propTypes = {
  handleChange: PropTypes.func,
  productIdentifier: PropTypes.string,
  handleSubmit: PropTypes.func,
};

export default PIVerification;
