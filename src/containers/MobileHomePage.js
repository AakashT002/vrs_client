import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'react-md/lib/Papers';
import { connect } from 'react-redux';

import MobileHeader from './MobileHeader';
import Verification from '.././components/Verification';
import VerificationDetails from '.././components/VerificationDetails';
import { verifyProductIdentifier } from '../store/verification/action';
import { pageToBeRendered } from '../store/verification/action';

import '../assets/stylesheets/MobileHomePage.css';

export class MobileHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pi: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.resetStateValues = this.resetStateValues.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(pageToBeRendered());
    this.setState({ pi: null });
  }

  handleChange(value) {
    this.setState({ pi: value });
  }

  handleClick() {
    this.props.dispatch(verifyProductIdentifier(this.state.pi));
  }

  resetStateValues() {
    this.setState({ pi: '' });
  }

  render() {
    let componentToRender = null;
    if (this.props.displayPage === 'Verification') {
      componentToRender = (
        <Verification
          handleChange={this.handleChange}
          pi={this.state.pi}
          handleClick={this.handleClick}
        />
      );
    } else {
      componentToRender = (
        <VerificationDetails
          verifiedProduct={this.props.verifiedProduct}
          pi={this.state.pi}
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
              resetStateValues={this.resetStateValues}
            />
            {componentToRender}
          </div>
        </div>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    displayPage: state.verification.displayPage,
    verifiedProduct: state.verification.verifiedProduct,
  };
}

MobileHomePage.propTypes = {
  dispatch: PropTypes.func,
  displayPage: PropTypes.string,
  verifiedProduct: PropTypes.object,
};

export default connect(mapStateToProps)(MobileHomePage);
