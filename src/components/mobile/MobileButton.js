import React from 'react';
import PropTypes from 'prop-types';

import '../../assets/stylesheets/MobileButton.css';
import mesaVerde_logo from '../../assets/images/mesaverda_logo.jpg';

import {
  ALL_VERIFICATIONS,
  LOGOUT,
  MESA_VERDE,
  VERIFY_PRODUCT,
} from '../../utils/constants';

const MobileButton = props => {
  return (
    <div className="mobileButton__toolbar">
      <img src={mesaVerde_logo} className="mobileButton-logo" alt="logo" />
      <label className="mobileButton__title">{MESA_VERDE}</label>
      <i
        className="material-icons mobileButton__option"
        onClick={props.handleDrawer}
      >
        {props.visible ? 'close' : 'menu'}
      </i>
      <div
        className={`mobileButton__menu-drawer ${
          props.visible ? 'open' : 'close'
        }`}
      >
        <hr />
        <div className="mobileButton__row" onClick={props.handleVerifyProduct}>
          <h1>{VERIFY_PRODUCT}</h1>
        </div>
        <hr />
        <div
          className="mobileButton__row"
          onClick={props.handleAllVerifications}
        >
          <h1>{ALL_VERIFICATIONS}</h1>
        </div>
        <hr />
        <div className="mobileButton__row" onClick={props.handleLogout}>
          <h1>{LOGOUT}</h1>
        </div>
        <hr />
      </div>
    </div>
  );
};

MobileButton.propTypes = {
  handleDrawer: PropTypes.func,
  visible: PropTypes.bool,
  handleVerifyProduct: PropTypes.func,
  handleLogout: PropTypes.func,
  handleAllVerifications: PropTypes.func,
};

export default MobileButton;
