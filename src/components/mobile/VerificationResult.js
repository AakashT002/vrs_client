import React from 'react';
import { Card, CardTitle, CardText } from 'react-md';
import PropTypes from 'prop-types';

import Status from '../common/Status.js';
import ProductDetails from '../common/ProductDetails.js';

import '../../assets/stylesheets/VerificationResult.css';

import {
  ERROR,
  PENDING,
  REQUEST_RCVD,
  ERROR_ID_LABEL,
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
    } else if (status === PENDING || status === REQUEST_RCVD) {
      return <img src={access_time} alt="access_time" />;
    } else if (status === ERROR) {
      return <img src={error_outline} alt="error_outline" />;
    } else if (status === NOT_VERIFIED) {
      return <img src={not_interested} alt="not_interested" />;
    }
  };

  const entityCheck = (product, event) => {
    if (
      event.eventStatus === VERIFIED ||
      event.eventStatus === NOT_VERIFIED ||
      event.eventStatus === REQUEST_RCVD
    ) {
      return `${event.entityType} ID: ${event.entityId}`;
    } else if (event.eventStatus === ERROR) {
      return ERROR_ID_LABEL + event.statusCode;
    }
  };

  const renderEvent = product => {
    return product.events.map((event, index) => {
      if (
        event.eventStatus === VERIFIED ||
        event.eventStatus === NOT_VERIFIED ||
        event.eventStatus === PENDING ||
        event.eventStatus === REQUEST_RCVD ||
        event.eventStatus === ERROR
      ) {
        return (
          <div key={index}>
            <div>
              <CardText className="md-grid">
                <div className="verification-results_status-icon-small md-cell">
                  {renderStatusThumbnail(event.eventStatus)}
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
        );
      } else {
        return null;
      }
    });
  };

  return (
    <div className="verification-results">
      <Status value={props.data[0].status} deviceType={props.deviceType} />
      <ProductDetails
        productIdentifier={props.productIdentifier}
        gtin={props.data[0].gtin}
        srn={props.data[0].srn}
        lot={props.data[0].lot}
        expDate={props.data[0].expDate}
        productName={props.data[0].productName}
        showInModal={false}
        deviceType={props.deviceType}
      />
      {props.data.map((product, index) => (
        <Card
          key={index}
          className="md-block-centered md-paper--1 verification-results__details-card"
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
  deviceType: PropTypes.string,
};

export default VerificationResult;
