import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import Drawer from 'react-md/lib/Drawers';
import Toolbar from 'react-md/lib/Toolbars';

import keycloak from '../keycloak-config';

import '../assets/stylesheets/MenuDrawer.css';

class MenuDrawer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState({ visible: !this.state.visible });
  }

  getMenuItems() {
    const { history, isAuthenticated } = this.props;
    const menuItems = [
      {
        primaryText: 'Home',
        className: 'MenuDrawer-link',
        onClick: () => history.push('/home'),
        visible: true,
      },
      {
        primaryText: 'Dashboard',
        className: 'MenuDrawer-link',
        onClick: () => history.push('/dashboard'),
        visible: isAuthenticated,
      },
      {
        divider: true,
        visible: true,
      },
      {
        primaryText: 'Sign In',
        className: 'MenuDrawer-link',
        onClick: () => history.push('/dashboard'),
        visible: !isAuthenticated,
      },
      {
        primaryText: 'Sign Out',
        className: 'MenuDrawer-link',
        onClick: () => {
          sessionStorage.removeItem('kctoken');
          sessionStorage.removeItem('refresh_token');

          if (process.env.REACT_APP_IDP === 'keycloak') {
            keycloak.logout();
          } else {
            this.props.handleLogout();
          }
        },
        visible: isAuthenticated,
      },
    ];

    return menuItems.reduce((items, item) => {
      if (item.visible) {
        delete item.visible;
        items.push(item);
      }
      return items;
    }, []);
  }

  render() {
    const close = (
      <Button
        className="MenuDrawer-close-button"
        icon
        onClick={this.handleToggle}
      >
        arrow_forward
      </Button>
    );

    const header = (
      <Toolbar
        actions={close}
        className="md-divider-border md-divider-border--bottom"
      />
    );

    return (
      <div className="MenuDrawer">
        <Button
          key="nav"
          className="MenuDrawer-button"
          icon
          onClick={this.handleToggle}
        >
          menu
        </Button>
        <Drawer
          visible={this.state.visible}
          className="MenuDrawer-container"
          position="right"
          navItems={this.getMenuItems()}
          onVisibilityChange={this.handleToggle}
          desktopType={Drawer.DrawerTypes.TEMPORARY}
          header={header}
        />
      </div>
    );
  }
}

MenuDrawer.propTypes = {
  handleLogout: PropTypes.func,
  history: PropTypes.object,
  isAuthenticated: PropTypes.bool,
};

export default MenuDrawer;
