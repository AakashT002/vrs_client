import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'react-md/lib/Papers';
import { connect } from 'react-redux';
import MDSpinner from 'react-md-spinner';

import MobileHeader from './MobileHeader';
import ScannerSelection from '../../components/mobile/ScannerSelection';
import PIVerification from '../../components/mobile/PIVerification';
import VerificationResult from '../../components/mobile/VerificationResult';

import '../../assets/stylesheets/ProductVerification.css';

import { verifyProductIdentifier } from '../../store/mobile/verification/action';
import { clearVerificationResult } from '../../store/mobile/verification/action';
import { resetSelectScanner } from '../../store/mobile/verification/action';

export class ProductVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productIdentifier: null,
      scannerId: null,
      isMobileScannerChecked: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearVerificationForm = this.clearVerificationForm.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleScannerSignIn = this.handleScannerSignIn.bind(this);
    this.handleCheckBoxSelection = this.handleCheckBoxSelection.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(clearVerificationResult());
    this.setState({ productIdentifier: null });
  }

  handleChange(value) {
    this.setState({ productIdentifier: value });
  }

  handleFieldChange(value) {
    value = value.toUpperCase();
    this.setState({ scannerId: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const pi = this.state.productIdentifier;
    const scannerId = this.state.scannerId;
    var deviceType = this.state.isMobileScannerChecked
      ? process.env.REACT_APP_DEVICE_TYPE
      : scannerId;
    this.props.dispatch(verifyProductIdentifier(pi, deviceType));
  }

  clearVerificationForm() {
    this.setState({ productIdentifier: '' });
  }

  handleScannerSignIn() {
    this.props.dispatch(resetSelectScanner());
  }

  handleCheckBoxSelection() {
    this.setState({
      isMobileScannerChecked: !this.state.isMobileScannerChecked,
      scannerId: '',
    });
  }

  render() {
    let componentToRender = null;
    if (this.props.isScannerSelection === true) {
      componentToRender = (
        <ScannerSelection
          scannerId={this.state.scannerId}
          handleFieldChange={this.handleFieldChange}
          handleSubmit={this.handleScannerSignIn}
          isMobileScannerChecked={this.state.isMobileScannerChecked}
          handleCheckBoxSelection={this.handleCheckBoxSelection}
        />
      );
    } else {
      if (this.props.verificationResult.length === 0) {
        componentToRender = (
          <PIVerification
            handleChange={this.handleChange}
            productIdentifier={this.state.productIdentifier}
            handleSubmit={this.handleSubmit}
            handleClear={this.clearVerificationForm}
          />
        );
      } else {
        componentToRender = (
          <VerificationResult
            data={this.props.verificationResult}
            productIdentifier={this.state.productIdentifier}
          />
        );
      }
    }
    return (
      <Paper className="productVerification">
        <div className="productVerification-container">
          <br />
          <br />
          <div className="productVerification-layout">
            <MobileHeader
              dispatch={this.props.dispatch}
              clearVerificationForm={this.clearVerificationForm}
            />
            {this.props.piRequesting ? (
              <div className="productVerification-loader">
                <MDSpinner size={50} singleColor="#00b8d4" />
              </div>
            ) : (
              componentToRender
            )}
          </div>
        </div>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    verificationResult: state.verification.verificationResult,
    piRequesting: state.verification.piRequesting,
    isScannerSelection: state.verification.isScannerSelection,
  };
}

ProductVerification.propTypes = {
  dispatch: PropTypes.func,
  verificationResult: PropTypes.array,
  piRequesting: PropTypes.bool,
  isScannerSelection: PropTypes.bool,
};

export default connect(mapStateToProps)(ProductVerification);
