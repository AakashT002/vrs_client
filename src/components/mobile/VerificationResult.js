import React from 'react';
import { Card, CardTitle, CardText, Avatar } from 'react-md';
import PropTypes from 'prop-types';
import moment from 'moment';

import '../../assets/stylesheets/VerificationResult.css';

import {
  ERROR,
  ERROR_LABEL,
  PENDING,
  PENDING_LABEL,
  REQUESTING,
  REQUESTOR_ID_LABEL,
  RESPONDER_ID_LABEL,
  SYSTEM_ERROR_LABEL,
  NOT_VERIFIED,
  NOT_VERIFIED_LABEL,
  VERIFIED,
  VERIFIED_LABEL,
} from '../../utils/constants';

import access_time from '../../assets/images/access_time.png';
import check_circle from '../../assets/images/check_circle.png';
import error_outline from '../../assets/images/error_outline.png';
import not_interested from '../../assets/images/not_interested.png';

import verified from '../../assets/images/verified.png';
import pending from '../../assets/images/pending.png';
import error from '../../assets/images/error.png';
import not_verified from '../../assets/images/not-verified.png';

const VerificationResult = props => {
  const renderStatusThumbnail = status => {
    if (status === VERIFIED) {
      return <img src={check_circle} alt="check_circle" />;
    } else if (status === PENDING || status === REQUESTING) {
      return <img src={access_time} alt="access_time" />;
    } else if (status === ERROR) {
      return <img src={error_outline} alt="error_outline" />;
    } else if (status === NOT_VERIFIED) {
      return <img src={not_interested} alt="not_interested" />;
    }
  };

  const renderStatusIcon = status => {
    if (status === VERIFIED) {
      return <img src={verified} alt="verified" />;
    } else if (status === PENDING) {
      return <img src={pending} alt="pending" />;
    } else if (status === ERROR) {
      return <img src={error} alt="error" />;
    } else if (status === NOT_VERIFIED) {
      return <img src={not_verified} alt="not-verified" />;
    }
  };

  const renderbgColor = status => {
    if (status === VERIFIED) {
      return 'verification-results__green';
    } else if (status === PENDING || status === REQUESTING) {
      return 'verification-results__blue';
    } else if (status === ERROR) {
      return 'verification-results__orange';
    } else if (status === NOT_VERIFIED) {
      return 'verification-results__amber';
    }
  };

  const renderStatusLabel = status => {
    if (status === VERIFIED) {
      return VERIFIED_LABEL;
    } else if (status === PENDING) {
      return PENDING_LABEL;
    } else if (status === ERROR) {
      return ERROR_LABEL;
    } else if (status === NOT_VERIFIED) {
      return NOT_VERIFIED_LABEL;
    }
  };

  const expirationDateFormat = date => {
    return moment(date).format('DD MMM YYYY');
  };

  const formatDate = date => {
    return moment(date).format('DD MMM YYYY H:MM:SS');
  };

  const entityCheck = event => {
    if (event.eventStatus === VERIFIED) {
      return RESPONDER_ID_LABEL + props.data.responderId;
    } else if (
      event.eventStatus === PENDING ||
      event.eventStatus === REQUESTING
    ) {
      return REQUESTOR_ID_LABEL + props.data.requestorId;
    } else if (event.status === ERROR) {
      return SYSTEM_ERROR_LABEL;
    } else if (event.status === NOT_VERIFIED) {
      return RESPONDER_ID_LABEL + props.data.responderId;
    }
  };

  const renderEvent = events => {
    return events.map((event, index) => (
      <div key={index}>
        <div>
          <CardText className="md-grid">
            <div className="verification-results_status-icon-small md-cell">
              <Avatar
                className={`verification-results_avatar ${renderbgColor(
                  event.eventStatus
                )}`}
              >
                {renderStatusThumbnail(event.eventStatus)}
              </Avatar>
            </div>
            <div className="md-cell ">
              <div className="verification-results__transaction-details">
                <h3 className="md-cell verification-results__transaction-date">
                  {formatDate(event.eventTime)}
                </h3>
                <p className="md-cell">{entityCheck(event)}</p>
                <p className="md-cell">{event.eventMessage}</p>
              </div>
            </div>
          </CardText>
          <hr />
        </div>
      </div>
    ));
  };

  return (
    <div className="verification-results">
      <div
        className={`verification-results__quick-view ${renderbgColor(
          props.data.status
        )}`}
      >
        <div className={'verification-results__quick-icon'}>
          {renderStatusIcon(props.data.status)}
        </div>
        <h1 className="verification-results__status">
          {renderStatusLabel(props.data.status)}
        </h1>
      </div>
      <h6 className="verification-results__pi">{props.productIdentifier}</h6>
      <div className="verification-results__details">
        <p>GTIN: {props.data.gtin}</p>
        <p className="verification-detail__serial-number">
          Serial Number: {props.data.srn}
        </p>
        <p>Lot: {props.data.lot}</p>
        <p>Expiration : {expirationDateFormat(props.data.expDate)}</p>
        <p>Product: {props.data.product}</p>
      </div>
      <Card className="md-block-centered md-paper--3 verification-results__details-card">
        <CardTitle
          className="verification-results__details-card-title"
          title={`Transaction ID: ${props.data.transactionId}`}
          subtitle=""
        />
        <hr />
        {renderEvent(props.data.events)}
      </Card>
    </div>
  );
};

VerificationResult.propTypes = {
  data: PropTypes.object,
  productIdentifier: PropTypes.string,
};

export default VerificationResult;
