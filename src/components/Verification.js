import React from 'react';
import { TextField, Button } from 'react-md';
import PropTypes from 'prop-types';
import '../assets/stylesheets/Verification.css';

const Verification = props => {
  let classname = props.pi
    ? 'verification__verify-button-active'
    : 'verification__verify-button-inActive';
  return (
    <div className="verification">
      <div className="verification__container">
        <h2 className="verification__instruction">
          Enter a product identifier to verify
        </h2>
        <TextField
          autoFocus
          id="floating-center-title"
          label="Product Identifier"
          lineDirection="center"
          placeholder=""
          className="verification__serial-number-input"
          onChange={value => props.handleChange(value)}
          value={props.pi}
        />
        <Button className={classname} onClick={props.handleClick} raised>
          Verify
        </Button>
      </div>
    </div>
  );
};

Verification.propTypes = {
  handleChange: PropTypes.func,
  pi: PropTypes.string,
  handleClick: PropTypes.func,
};

export default Verification;
