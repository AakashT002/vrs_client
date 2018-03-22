import React from 'react';
import PropTypes from 'prop-types';

import {
  ERROR,
  ERROR_LABEL,
  NOT_VERIFIED,
  NOT_VERIFIED_LABEL,
  PENDING,
  PENDING_LABEL,
  REQUESTING,
  VERIFIED,
  VERIFIED_LABEL,
} from '../../utils/constants';

import verified from '../../assets/images/verified.png';
import pending from '../../assets/images/pending.png';
import error from '../../assets/images/error.png';
import not_verified from '../../assets/images/not-verified.png';

import '../../assets/stylesheets/Status.css';

const Status = ({ value }) => {
  const renderStatusIcon = value => {
    if (value === VERIFIED) {
      return <img src={verified} alt="verified" />;
    } else if (value === PENDING) {
      return <img src={pending} alt="pending" />;
    } else if (value === ERROR) {
      return <img src={error} alt="error" />;
    } else if (value === NOT_VERIFIED) {
      return <img src={not_verified} alt="not-verified" />;
    }
  };

  const renderbgColor = value => {
    if (value === VERIFIED) {
      return 'Status__green';
    } else if (value === PENDING || value === REQUESTING) {
      return 'Status__blue';
    } else if (value === ERROR) {
      return 'Status__orange';
    } else if (value === NOT_VERIFIED) {
      return 'Status__amber';
    }
  };

  const renderStatusLabel = value => {
    if (value === VERIFIED) {
      return VERIFIED_LABEL;
    } else if (value === PENDING) {
      return PENDING_LABEL;
    } else if (value === ERROR) {
      return ERROR_LABEL;
    } else if (value === NOT_VERIFIED) {
      return NOT_VERIFIED_LABEL;
    }
  };

  return (
    <div className="Status">
      <div
        className={`Status__bgColor-${
          process.env.REACT_APP_DEVICE_TYPE
        } ${renderbgColor(value)}`}
      >
        <div className={'Status__icon'}>{renderStatusIcon(value)}</div>
        <h1 className="Status__label">{renderStatusLabel(value)}</h1>
      </div>
    </div>
  );
};

Status.propTypes = {
  value: PropTypes.string,
};

export default Status;
