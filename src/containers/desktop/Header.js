import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Toolbar from 'react-md/lib/Toolbars';
import { FontIcon } from 'react-md';

import '../../assets/stylesheets/Header.css';
import mesaVerde_logo from '../../assets/images/mesaverda_logo.jpg';
import keycloak from '../../keycloak-config';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaydropDown: false,
    };

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    sessionStorage.clear();
    keycloak.logout();
  }

  renderTitle() {
    var username = sessionStorage.getItem('username').toUpperCase();
    if (username === 'UNDEFINED') {
      username = sessionStorage.getItem('user').toUpperCase();
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
      <div>
        <img src={mesaVerde_logo} className="Header__title-logo" alt="logo" />
        <div className="Header__title-key">
          <span>MESA VERDE</span>
          <div
            className="Header__username-dropDown"
            onMouseEnter={() => this.setState({ displaydropDown: true })}
            onMouseLeave={() => this.setState({ displaydropDown: false })}
          >
            <div className={`Header__title ${dropDownState()}`}>
              <p className={`Header__title-username ${dropDownState()}`}>
                {username}
              </p>
              <FontIcon
                className={`material-icons Header__dropDown-icon ${dropDownState()}`}
              >
                arrow_drop_down
              </FontIcon>
            </div>
            {this.state.displaydropDown ? renderDropDown() : null}
          </div>
        </div>
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
