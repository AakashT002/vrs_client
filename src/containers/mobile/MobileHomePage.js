import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'react-md/lib/Papers';
import { connect } from 'react-redux';
import MDSpinner from 'react-md-spinner';

import MobileHeader from './MobileHeader';
import PIVerification from '../../components/mobile/PIVerification';
import VerificationResult from '../../components/mobile/VerificationResult';
import { verifyProductIdentifier } from '../../store/mobile/verification/action';
import { clearVerificationResult } from '../../store/mobile/verification/action';

import '../../assets/stylesheets/MobileHomePage.css';

export class MobileHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productIdentifier: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearVerificationForm = this.clearVerificationForm.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(clearVerificationResult());
    this.setState({ productIdentifier: null });
  }

  handleChange(value) {
    this.setState({ productIdentifier: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.dispatch(verifyProductIdentifier(this.state.productIdentifier));
  }

  clearVerificationForm() {
    this.setState({ productIdentifier: '' });
  }

  render() {
    let componentToRender = null;
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
    return (
      <Paper className="mobileHomePage">
        <div className="mobileHomePage-container">
          <br />
          <br />
          <div className="mobileHomePage-layout">
            <MobileHeader
              dispatch={this.props.dispatch}
              clearVerificationForm={this.clearVerificationForm}
            />
            {this.props.requesting ? (
              <div className="mobileHomePage-loader">
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
    requesting: state.verification.requesting,
  };
}

MobileHomePage.propTypes = {
  dispatch: PropTypes.func,
  verificationResult: PropTypes.array,
  requesting: PropTypes.bool,
};

export default connect(mapStateToProps)(MobileHomePage);
