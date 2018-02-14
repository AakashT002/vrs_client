import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Toolbar from 'react-md/lib/Toolbars';
import ListItem from 'react-md/lib/Lists/ListItem';
import MenuButton from 'react-md/lib/Menus/MenuButton';
import { Link } from 'react-router-dom';
import { FontIcon } from 'react-md';

import '../assets/stylesheets/Header.css';
import mesaVerde_logo from '../assets/images/mesaverda_logo.jpg';
import keycloak from '../keycloak-config';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    sessionStorage.clear();
    keycloak.logout();
  }

  renderTitle() {
    var username = sessionStorage.getItem('username');
    if (username === 'undefined') {
      username = sessionStorage.getItem('user');
    }
    return (
      <div>
        <div>
          <img src={mesaVerde_logo} className="Header__title-logo" alt="logo" />
          <div className="Header__title-key">
            <span>MESA VERDE</span>
            <label className="Header__title-username">{username}</label>
            <MenuButton
              anchor={{
                x: MenuButton.HorizontalAnchors.INNER_LEFT,
                y: MenuButton.VerticalAnchors.TOP,
              }}
              position={MenuButton.Positions.TOP_RIGHT}
              icon
              id="userMenu"
              listClassName="md-list--menu-tr"
              menuClassName="header__user-menu"
              menuItems={[
                <ListItem
                  key="log-out"
                  component={Link}
                  onClick={() => this.handleClick()}
                  className="md-text--secondary"
                  primaryText=""
                  secondaryText="Logout"
                  to="/login"
                />,
              ]}
            >
              <FontIcon className="material-icons">arrow_drop_down</FontIcon>
            </MenuButton>
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
