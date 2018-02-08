import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Toolbar from 'react-md/lib/Toolbars';

import MenuDrawer from '../components/MenuDrawer';
import { logout } from '../store/user/action';

import '../assets/stylesheets/Header.css';
import mesaVerde_logo from '../assets/images/mesaverda_logo.jpg';

class Header extends Component {
  renderMenuDrawer() {
    return (
      <MenuDrawer
        handleLogout={() => this.props.dispatch(logout())}
        history={this.props.history}
        isAuthenticated={this.props.isAuthenticated}
      />
    );
  }

  renderTitle() {
    return (
      <div>
        <div>
          <img src={mesaVerde_logo} className="Header__title-logo" alt="logo" />
          <div className="Header__title-key">
            <span>MESA VERDE</span>
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
