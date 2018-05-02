import React from 'react';
import PropTypes from 'prop-types';

import '../../assets/stylesheets/MobileButton.css';
import product_logo from '../../assets/images/logo.png';

import {
  ALL_VERIFICATIONS,
  LOGOUT,
  VERIFY_PRODUCT,
} from '../../utils/constants';

const MobileButton = props => {
  return (
    <div className="mobileButton__toolbar">
      <img src={product_logo} className="mobileButton-logo" alt="logo" />
      {sessionStorage.getItem('deviceType') ? (
        <i
          className="material-icons mobileButton__option"
          onClick={props.handleDrawer}
        >
          {props.visible ? 'close' : 'menu'}
        </i>
      ) : null}
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
