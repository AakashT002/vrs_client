import React from 'react';
import PropTypes from 'prop-types';
import '../assets/stylesheets/MobileHeader.css';
import mesaVerde_logo from '../assets/images/mesaverda_logo.jpg';
import option_button from '../assets/images/option_button.svg';
import {
  Drawer,
  Toolbar,
  DataTable,
  TableBody,
  TableRow,
  TableColumn,
} from 'react-md';
import {
  ALL_VERIFICATIONS,
  VERIFY_PRODUCT,
  LOGOUT,
  MESA_VERDE,
} from '../utils/constants';

const MobileButton = props => {
  return (
    <div className="mobileHeader-toolbar">
      <img src={mesaVerde_logo} className="mobileHeader-logo" alt="logo" />
      <label className="mobileHeader-title">{MESA_VERDE}</label>
      <img
        src={option_button}
        onClick={props.openDrawerRight}
        className="mobileHeader-option"
        alt="logo"
      />
      <Drawer
        id="menu-drawer"
        className="md-data-table--responsive"
        type={Drawer.DrawerTypes.TEMPORARY}
        visible={props.visible}
        position={props.position}
        onVisibilityChange={props.handleVisibility}
        header={
          <Toolbar
            nav={props.isLeft ? null : props.closeBtn}
            actions={props.isLeft ? props.closeBtn : null}
            className="md-divider-border md-divider-border--bottom"
          />
        }
      >
        <div>
          <DataTable plain>
            <TableBody id="drawer_menu">
              <TableRow className="md-table-row">
                <TableColumn
                  className="mobileHeader_drawer-options"
                  onClick={props.handleVerifyProduct}
                >
                  {VERIFY_PRODUCT}
                </TableColumn>
              </TableRow>
              <TableRow className="md-table-row">
                <TableColumn
                  className="mobileHeader_drawer-options"
                  onClick={props.handleAllVerifications}
                >
                  {ALL_VERIFICATIONS}
                </TableColumn>
              </TableRow>
              <TableRow className="md-table-row">
                <TableColumn
                  className="mobileHeader_drawer-options"
                  onClick={props.handleLogout}
                >
                  {LOGOUT}
                </TableColumn>
              </TableRow>
            </TableBody>
          </DataTable>
        </div>
      </Drawer>
    </div>
  );
};

MobileButton.propTypes = {
  location: PropTypes.object,
  handleOnClick: PropTypes.func,
  openDrawerRight: PropTypes.func,
  visible: PropTypes.bool,
  position: PropTypes.string,
  handleVisibility: PropTypes.func,
  isLeft: PropTypes.bool,
  closeBtn: PropTypes.string,
  handleVerifyProduct: PropTypes.func,
  handleLogout: PropTypes.func,
  handleAllVerifications: PropTypes.func,
};

export default MobileButton;
