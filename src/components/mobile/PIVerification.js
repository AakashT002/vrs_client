import React from 'react';
import { TextField, Button } from 'react-md';
import PropTypes from 'prop-types';
import '../../assets/stylesheets/PIVerification.css';

const PIVerification = props => {
  let classname = props.productIdentifier ? 'active' : 'inActive';
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
          <div className="md-grid pi-verification__buttons">
            <Button
              className={`md-cell pi-verification__clear-button-${classname}`}
              onClick={props.handleClear}
              raised
              label="CLEAR"
            />
            <Button
              className={`md-cell pi-verification__verify-button-${classname}`}
              type="submit"
              onClick={props.handleSubmit}
              raised
              label="VERIFY"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

PIVerification.propTypes = {
  handleChange: PropTypes.func,
  productIdentifier: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleClear: PropTypes.func,
};

export default PIVerification;
