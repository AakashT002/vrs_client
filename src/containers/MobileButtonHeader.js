import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import MobileButton from '../components/MobileButton.js';
import { Button } from 'react-md';
import '../assets/stylesheets/MobileHeader.css';
import keycloak from '../keycloak-config';

class MobileButtonHeader extends Component {
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
    this.handleAllVerifications = this.handleAllVerifications.bind(this);
  }

  handleLogout() {
    sessionStorage.clear();
    keycloak.logout();
  }

  handleAllVerifications() {
    const { history } = this.props;
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
      <MobileButton
        openDrawerRight={this.openDrawerRight}
        handleVisibility={this.handleVisibility}
        closeDrawer={this.closeDrawer}
        visible={this.state.visible}
        position={this.state.position}
        isLeft={isLeft}
        closeBtn={closeBtn}
        handleLogout={this.handleLogout}
        handleAllVerifications={this.handleAllVerifications}
      />
    );
  }
}

MobileButtonHeader.prototypes = {
  history: PropTypes.object,
};

export default withRouter(MobileButtonHeader);
