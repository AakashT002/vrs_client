import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-md';
import { withRouter } from 'react-router';

import MobileTitle from '../../components/mobile/MobileTitle';
import '../../assets/stylesheets/MobileHeader.css';
import mobile_header from '../../assets/images/mobile_header.jpg';
import MobileButton from '../../components/mobile/MobileButton.js';

import keycloak from '../../keycloak-config';
import { clearVerificationResult } from '../../store/mobile/verification/action';

class MobileHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      position: 'left',
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.openDrawerLeft = this.openDrawerLeft.bind(this);
    this.openDrawerRight = this.openDrawerRight.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.handleVisibility = this.handleVisibility.bind(this);
    this.handleVerifyProduct = this.handleVerifyProduct.bind(this);
    this.handleAllVerifications = this.handleAllVerifications.bind(this);
  }

  handleVerifyProduct() {
    const { history } = this.props;
    if (
      history.location.pathname === '/home' ||
      history.location.pathname === '/'
    ) {
      this.props.clearVerificationForm();
    }
    this.props.dispatch(clearVerificationResult());
    this.closeDrawer();
    history.push('/home');
  }

  handleLogout() {
    sessionStorage.clear();
    keycloak.logout();
  }

  handleAllVerifications() {
    const { history } = this.props;
    this.closeDrawer();
    history.push('/verifications');
  }

  openDrawerLeft() {
    this.setState({ visible: true, position: 'left' });
  }

  openDrawerRight() {
    this.setState({ visible: true, position: 'right' });
  }

  closeDrawer() {
    this.setState({ visible: false });
  }

  handleVisibility(visible) {
    this.setState({ visible });
  }

  render() {
    const isLeft = this.state.position === 'left';
    const closeBtn = (
      <Button
        icon
        className="mobileheader__drawer--close"
        onClick={this.closeDrawer}
      >
        {isLeft ? 'arrow_back' : 'close'}
      </Button>
    );
    return (
      <div className="mobileHeader">
        <div className="mobileHeader-header">
          <img src={mobile_header} alt="logo" />
          <MobileTitle />
        </div>
        <MobileButton
          openDrawerRight={this.openDrawerRight}
          handleVisibility={this.handleVisibility}
          closeDrawer={this.closeDrawer}
          visible={this.state.visible}
          position={this.state.position}
          isLeft={isLeft}
          closeBtn={closeBtn}
          handleVerifyProduct={this.handleVerifyProduct}
          handleLogout={this.handleLogout}
          handleAllVerifications={this.handleAllVerifications}
        />
      </div>
    );
  }
}

MobileHeader.propTypes = {
  history: PropTypes.object,
  dispatch: PropTypes.func,
  clearVerificationForm: PropTypes.func,
};

export default withRouter(MobileHeader);
