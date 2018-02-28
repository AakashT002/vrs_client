import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import MobileTitle from '../../components/mobile/MobileTitle';
import MobileButton from '../../components/mobile/MobileButton.js';

import '../../assets/stylesheets/MobileHeader.css';
import mobile_header from '../../assets/images/mobile_header.jpg';

import keycloak from '../../keycloak-config';
import { clearVerificationResult } from '../../store/mobile/verification/action';

class MobileHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.handleDrawer = this.handleDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
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
    this.props.dispatch(clearVerificationResult());
    this.closeDrawer();
    history.push('/verifications');
  }

  handleDrawer() {
    this.setState({ visible: !this.state.visible });
  }

  closeDrawer() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <div className="mobileHeader">
        <div className="mobileHeader-header">
          <img src={mobile_header} alt="logo" />
          <MobileTitle />
        </div>
        <MobileButton
          handleDrawer={this.handleDrawer}
          visible={this.state.visible}
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
