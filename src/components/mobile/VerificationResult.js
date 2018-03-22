import React from 'react';
import { Card, CardTitle, CardText, Avatar } from 'react-md';
import PropTypes from 'prop-types';

import Status from '../common/Status.js';
import ProductDetails from '../common/ProductDetails.js';

import '../../assets/stylesheets/VerificationResult.css';

import {
  ERROR,
  PENDING,
  REQUESTING,
  REQUESTOR_ID_LABEL,
  RESPONDER_ID_LABEL,
  SYSTEM_ERROR_LABEL,
  NOT_VERIFIED,
  VERIFIED,
} from '../../utils/constants';

import access_time from '../../assets/images/access_time.png';
import check_circle from '../../assets/images/check_circle.png';
import error_outline from '../../assets/images/error_outline.png';
import not_interested from '../../assets/images/not_interested.png';

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

  const entityCheck = (product, event) => {
    if (event.eventStatus === VERIFIED) {
      return RESPONDER_ID_LABEL + product.responderId;
    } else if (
      event.eventStatus === PENDING ||
      event.eventStatus === REQUESTING
    ) {
      return REQUESTOR_ID_LABEL + product.requestorId;
    } else if (event.eventStatus === ERROR) {
      return SYSTEM_ERROR_LABEL;
    } else if (event.eventStatus === NOT_VERIFIED) {
      return RESPONDER_ID_LABEL + product.responderId;
    }
  };

  const renderEvent = product => {
    return product.events.map((event, index) => (
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
                  {props.transactionEventDateFormat(event.eventTime)}
                </h3>
                <p className="md-cell">{entityCheck(product, event)}</p>
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
      <Status value={props.data[0].status} />
      <ProductDetails
        productIdentifier={props.productIdentifier}
        gtin={props.data[0].gtin}
        srn={props.data[0].srn}
        lot={props.data[0].lot}
        expDate={props.data[0].expDate}
        productName={props.data[0].productName}
        showInModal={false}
      />
      {props.data.map((product, index) => (
        <Card
          key={index}
          className="md-block-centered md-paper--3 verification-results__details-card"
        >
          <CardTitle
            className="verification-results__details-card-title"
            title={`Transaction ID: ${product.id}`}
          />
          <hr />
          {renderEvent(product)}
        </Card>
      ))}
    </div>
  );
};

VerificationResult.propTypes = {
  data: PropTypes.array,
  productIdentifier: PropTypes.string,
  expirationDateFormat: PropTypes.func,
  transactionEventDateFormat: PropTypes.func,
};

export default VerificationResult;
