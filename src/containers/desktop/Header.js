import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button } from 'react-md';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Toolbar from 'react-md/lib/Toolbars';
import { FontIcon } from 'react-md';

import '../../assets/stylesheets/Header.css';
import product_logo from '../../assets/images/logo.png';
import keycloak from '../../keycloak-config';

import { clearVerificationResult } from '../../store/mobile/verification/action';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaydropDown: false,
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.handleHome = this.handleHome.bind(this);
  }

  handleLogout() {
    sessionStorage.clear();
    keycloak.logout();
  }

  async handleHome() {
    await this.props.dispatch(clearVerificationResult());
    this.props.history.push('/');
  }

  renderTitle() {
    var fullname = sessionStorage.getItem('fullname');
    if (fullname) {
      fullname = fullname.toUpperCase();
    } else {
      fullname = sessionStorage.getItem('username').toUpperCase();
    }

    const renderDropDown = () => {
      return (
        <div
          className="Header__dropDown-item"
          onClick={() => this.handleLogout()}
        >
          <a>LOGOUT</a>
        </div>
      );
    };

    const dropDownState = () => {
      return this.state.displaydropDown ? 'active' : 'inActive';
    };

    return (
      <div className="Header__inner-container">
        <div
          className="Header__username-dropDown"
          onMouseEnter={() => this.setState({ displaydropDown: true })}
          onMouseLeave={() => this.setState({ displaydropDown: false })}
        >
          <div className={`Header__title ${dropDownState()}`}>
            <p className={`Header__title-username ${dropDownState()}`}>
              {fullname}
            </p>
            <FontIcon
              className={`material-icons Header__dropDown-icon ${dropDownState()}`}
            >
              arrow_drop_down
            </FontIcon>
          </div>
          {this.state.displaydropDown ? renderDropDown() : null}
        </div>
        <Button
          flat
          primary
          className="Header__home-button"
          onClick={this.handleHome}
        >
          <img src={product_logo} className="Header__title-logo" alt="logo" />
        </Button>
      </div>
    );
  }

  render() {
    return (
      <div className="Header">
        <Toolbar
          className="Header-toolbar"
          colored
          title={this.renderTitle()}
        />
      </div>
    );
  }
}

Header.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default withRouter(connect(mapStateToProps)(Header));
