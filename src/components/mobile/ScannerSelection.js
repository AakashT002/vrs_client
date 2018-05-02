import React from 'react';
import { Button, TextField, Checkbox } from 'react-md';
import PropTypes from 'prop-types';

import '../../assets/stylesheets/ScannerSelection.css';

const ScannerSelection = props => {
  var user = sessionStorage.getItem('username');
  user = user.charAt(0).toUpperCase() + user.slice(1);
  let isSignInDisabled =
    props.scannerId || props.isMobileScannerChecked ? false : true;

  return (
    <div className="scannerSelection">
      <h2 className="scannerSelection__welcome">Hello, {user}</h2>
      <p className="scannerSelection__instruction">
        Enter a scanner ID if you are using a handheld scanner.
      </p>
      <form onSubmit={() => props.handleSubmit()}>
        <TextField
          id="scanner-id-text-field"
          label="Scanner ID"
          className="scannerSelection__text-field"
          lineDirection="center"
          maxlength={10}
          value={props.scannerId}
          disabled={props.isMobileScannerChecked}
          onChange={value => props.handleFieldChange(value)}
        />
        <Checkbox
          name="scanner-id-Checkbox"
          id="scanner-id-Checkbox"
          className="scannerSelection__check-box"
          label="Use this phone as scanner"
          onChange={() => props.handleCheckBoxSelection()}
          checked={props.isMobileScannerChecked}
        />
        <Button
          className="scannerSelection__verify-button"
          type="submit"
          raised
          disabled={isSignInDisabled}
        >
          SIGN IN
        </Button>
      </form>
    </div>
  );
};

ScannerSelection.propTypes = {
  handleFieldChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  scannerId: PropTypes.string,
  isMobileScannerChecked: PropTypes.bool,
  handleCheckBoxSelection: PropTypes.func,
};

export default ScannerSelection;
