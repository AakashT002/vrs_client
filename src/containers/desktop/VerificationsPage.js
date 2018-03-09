import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button, DialogContainer } from 'react-md';
import MDSpinner from 'react-md-spinner';

import { verifyProductIdentifier, clearVerificationResult } from
  '../../store/mobile/verification/action';
import Verifications from '../../components/desktop/Verifications';
import VerifyProduct from '../../components/desktop/VerifyProduct';
import VerificationResult from '../../components/desktop/VerificationResult';

import '../../assets/stylesheets/DesktopVerificationsPage.css';

import {
  getVerificationList,
  sort,
} from '../../store/mobile/verification/action';

export class VerificationsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      productIdentifier: null,
      isPIVerificationModalVisible: false,
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getVerificationList());
  }

  handleSort(isDescending) {
    this.props.dispatch(sort(this.props.data, !isDescending));
  }

  handleCancel() {
    this.setState({ isPIVerificationModalVisible: false });
  }

  handleChange(value) {
    this.setState({ productIdentifier: value });
  }

  handleVerify() {
    this.props.dispatch(verifyProductIdentifier(this.state.productIdentifier.trim()));
  }

  handleNextProduct() {
    this.props.dispatch(clearVerificationResult());
    this.setState({ productIdentifier: null });
  }

  render() {
    const renderId = this.props.verificationResult.length === 0 ?
      'verifyProduct' : 'verificationResult';

    const renderTitle = this.props.verificationResult.length === 0 ?
      'Verify Product' : null;

    const verifyActions = [];
    verifyActions.push(
      <Button
        flat
        secondary
        onClick={() => this.handleCancel()}
        className="VerificationsPage__cancel--button"
      >
        Cancel
      </Button>
    );
    verifyActions.push(
      <Button
        flat
        primary
        onClick={() => this.handleVerify()}
        className="VerificationsPage__verify--button"
        disabled={this.state.productIdentifier === null || this.state.productIdentifier === ''}
      >
        VERIFY
      </Button>
    );

    const verificationResultActions = [];
    verificationResultActions.push(
      <Button
        flat
        secondary
        onClick={() => this.handleCancel()}
        className="VerificationsPage__view-details--button"
      >
        VIEW DETAILS
      </Button>
    );
    verificationResultActions.push(
      <Button
        flat
        primary
        onClick={() => this.handleNextProduct()}
        className="VerificationsPage__next-product--button"
      >
        NEXT PRODUCT
      </Button>
    );

    const renderActions = this.props.verificationResult.length === 0 ? verifyActions : verificationResultActions;

    let componentToRender = null;
    if (this.props.verificationResult.length === 0) {
      componentToRender = (
        <VerifyProduct
          productIdentifier={this.state.productIdentifier}
          handleChange={(value) =>
            this.handleChange(value)
          }
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
      <div className="DesktopVerificationsPage">
        <div className="VerificationsPage__header">
          <div className="VerificationsPage__title">
            <span className="VerificationsPage__title--text">Verifications</span>
            <DialogContainer
              id={`VerificationsPage__${renderId}--dialogContainer`}
              visible={this.state.isPIVerificationModalVisible}
              onHide={() => this.handleCancel()}
              actions={renderActions}
              title={renderTitle}
            >
              {componentToRender}
              {this.props.requesting ? (
                <span className="VerificationsPage__verify-product--loader">
                  <MDSpinner size={18} singleColor="#00b8d4" />
                </span>
              ) : null}
            </DialogContainer>
            <a
              onClick={() => this.setState({ isPIVerificationModalVisible: true })}
              label="VERIFY PRODUCT"
              className="VerificationsPage__verify-product--button"
            >VERIFY PRODUCT</a>
          </div>
          <Card className="VerificationsPage__card">
            <Verifications
              data={this.props.data}
              requesting={this.props.requesting}
              handleSort={this.handleSort.bind(this)}
              isDescending={this.props.isDescending}
            />
          </Card>
        </div>
      </div>
    );
  }
}

VerificationsPage.propTypes = {
  dispatch: PropTypes.func,
  requesting: PropTypes.bool,
  data: PropTypes.array,
  isDescending: PropTypes.bool,
  verificationResult: PropTypes.array,
};

const mapStateToProps = state => ({
  verificationResult: state.verification.verificationResult,
  data: state.verification.verificationList,
  requesting: state.verification.requesting,
  isDescending: state.verification.isDescending,
});

export default connect(mapStateToProps)(VerificationsPage);
