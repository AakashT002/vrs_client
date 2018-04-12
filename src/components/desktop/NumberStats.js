import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'react-md';

import '../../assets/stylesheets/NumberStats.css';

import check_circle from '../../assets/images/check_circle.png';
import error_outline from '../../assets/images/error_outline.png';
import not_interested from '../../assets/images/not_interested.png';

import {
  ERROR,
  ERRORS_LABEL,
  NOT_VERIFIED,
  NOT_VERIFIED_LABEL,
  REQUESTS,
  REQUESTS_LABEL,
  VERIFIED,
  VERIFIED_LABEL,
} from '../../utils/constants';

const NumberStats = ({ status, count }) => {
  const renderClassName = status => {
    if (status === VERIFIED) {
      return 'NumberStats__verified';
    } else if (status === REQUESTS) {
      return 'NumberStats__requests';
    } else if (status === ERROR) {
      return 'NumberStats__error';
    } else if (status === NOT_VERIFIED) {
      return 'NumberStats__notVerified';
    }
  };

  const renderStatusText = status => {
    if (status === VERIFIED) {
      return (
        <font className="NumberStats__verifiedStatusText">
          {VERIFIED_LABEL}
        </font>
      );
    } else if (status === REQUESTS) {
      return (
        <font className="NumberStats__requestsStatusText">
          {REQUESTS_LABEL}
        </font>
      );
    } else if (status === ERROR) {
      return (
        <font className="NumberStats__errorStatusText">{ERRORS_LABEL}</font>
      );
    } else if (status === NOT_VERIFIED) {
      return (
        <font className="NumberStats__notVerifiedStatusText">
          {NOT_VERIFIED_LABEL}
        </font>
      );
    }
  };

  const renderStatusIcon = status => {
    if (status === VERIFIED) {
      return (
        <img
          src={check_circle}
          alt="check_circle"
          className="NumberStats__check_circle"
        />
      );
    } else if (status === ERROR) {
      return (
        <img
          src={error_outline}
          alt="error_outline"
          className="NumberStats__error_outline"
        />
      );
    } else if (status === NOT_VERIFIED) {
      return (
        <img
          src={not_interested}
          alt="not_interested"
          className="NumberStats__not_interested"
        />
      );
    }
  };

  return (
    <div className="NumberStats">
      <Card className="NumberStats__card">
        <CardTitle className={`NumberStats__title ${renderClassName(status)}`}>
          {count}
        </CardTitle>
        <CardText>
          {renderStatusIcon(status)}
          {renderStatusText(status)}
        </CardText>
      </Card>
    </div>
  );
};

NumberStats.propTypes = {
  count: PropTypes.number,
  status: PropTypes.string,
};

export default NumberStats;
