import React from 'react';
import { Card, CardTitle, CardText, Avatar } from 'react-md';
import PropTypes from 'prop-types';
import moment from 'moment';

import '../assets/stylesheets/VerificationDetails.css';

import {
  ERROR,
  ERROR_LABEL,
  PENDING,
  PENDING_LABEL,
  REQUESTING,
  NOT_VERIFIED,
  NOT_VERIFIED_LABEL,
  VERIFIED,
  VERIFIED_LABEL,
} from '../utils/constants';

const VerificationDetails = props => {
  const renderStatusIcon = status => {
    if (status === VERIFIED) {
      return <i className="material-icons">check_circle</i>;
    } else if (status === PENDING || status === REQUESTING) {
      return <i className="material-icons">access_time</i>;
    } else if (status === ERROR) {
      return <i className="material-icons">error</i>;
    } else if (status === NOT_VERIFIED) {
      return <i className="material-icons">cancel</i>;
    }
  };

  const renderClassName = status => {
    if (status === VERIFIED) {
      return 'verification-details__green';
    } else if (status === PENDING || status === REQUESTING) {
      return 'verification-details__blue';
    } else if (status === ERROR) {
      return 'verification-details__orange';
    } else if (status === NOT_VERIFIED) {
      return 'verification-details__amber';
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

  const changeDateformat = date => {
    return moment(date).format('DD MMM YYYY H:MM:SS');
  };

  const renderEvent = events => {
    return events.map((event, index) => (
      <div key={index}>
        <div>
          <CardText className="md-grid">
            <div className="material-icons verification-details_status-icon-small md-cell">
              <Avatar
                className={
                  'verification-details_avatar ' +
                  renderClassName(event.eventStatus)
                }
              >
                {renderStatusIcon(event.eventStatus)}
              </Avatar>
            </div>
            <div className="md-cell ">
              <div className="verification-details__transaction-details">
                <h className="md-cell verification-details__transaction-date">
                  {changeDateformat(event.eventTime)}
                </h>
                <p className="md-cell">
                  Requester ID: {props.verifiedProduct.requestorId}
                </p>
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
    <div className="verification-details">
      <div
        className={
          'verification-details__quick-view ' +
          renderClassName(props.verifiedProduct.status)
        }
      >
        <div className={'verification-details__quick-icon'}>
          {renderStatusIcon(props.verifiedProduct.status)}
        </div>
        <h1 className="verification-details__status">
          {renderStatusLabel(props.verifiedProduct.status)}
        </h1>
      </div>
      <h6 className="verification-details__pi">{props.pi}</h6>
      <div className="verification-details__details">
        <p>GTIN: {props.verifiedProduct.gtin}</p>
        <p className="verification-detail__serial-number">
          Serial Number: {props.verifiedProduct.srn}
        </p>
        <p>Lot: {props.verifiedProduct.lot}</p>
        <p>
          Expiration : {expirationDateFormat(props.verifiedProduct.expDate)}
        </p>
        <p>Product: {props.verifiedProduct.product}</p>
      </div>
      <Card className="md-block-centered md-paper--3 verification-details__details-card">
        <CardTitle
          className="verification-details__details-card-title"
          title={'Transaction ID: ' + props.verifiedProduct.transactionId}
          subtitle=""
        />
        <hr />
        {renderEvent(props.verifiedProduct.events)}
      </Card>
    </div>
  );
};

VerificationDetails.propTypes = {
  verifiedProduct: PropTypes.object,
  pi: PropTypes.string,
};

export default VerificationDetails;
