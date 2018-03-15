import { Card } from 'react-md';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
} from 'react-md';

import '../../assets/stylesheets/VerificationDetails.css';

import {
  ERROR,
  ERROR_LABEL,
  NOT_VERIFIED,
  NOT_VERIFIED_LABEL,
  PENDING,
  PENDING_LABEL,
  REQUESTING,
  REQUESTOR_ID_LABEL,
  RESPONDER_ID_LABEL,
  SYSTEM_ERROR_LABEL,
  VERIFIED,
  VERIFIED_LABEL,
} from '../../utils/constants';

import access_time from '../../assets/images/access_time.png';
import check_circle from '../../assets/images/check_circle.png';
import error_outline from '../../assets/images/error_outline.png';
import not_interested from '../../assets/images/not_interested.png';

const VerificationDetails = props => {
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

  const renderStatusLabelColor = status => {
    if (status === VERIFIED) {
      return 'VerificationDetails__green';
    } else if (status === PENDING || status === REQUESTING) {
      return 'VerificationDetails__blue';
    } else if (status === ERROR) {
      return 'VerificationDetails__orange';
    } else if (status === NOT_VERIFIED) {
      return 'VerificationDetails__amber';
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

  const transactionEventDateFormat = date => {
    return moment(date, 'YYYY-MM-DD HH:mm:ss z').format('DD MMM YYYY HH:mm:ss');
  };

  const entityCheck = (transaction, event) => {
    if (event.eventStatus === VERIFIED) {
      return RESPONDER_ID_LABEL + transaction.responderId;
    } else if (
      event.eventStatus === PENDING ||
      event.eventStatus === REQUESTING
    ) {
      return REQUESTOR_ID_LABEL + transaction.requestorId;
    } else if (event.eventStatus === ERROR) {
      return SYSTEM_ERROR_LABEL;
    } else if (event.eventStatus === NOT_VERIFIED) {
      return RESPONDER_ID_LABEL + transaction.responderId;
    }
  };

  const renderEvents = transaction => {
    return transaction.events.map((event, index) => (
      <TableRow key={index} className="VerificationDetails__body--row">
        <TableColumn>
          <span className="VerificationDetails__status--Thumbnail">
            {renderStatusThumbnail(event.eventStatus)}
          </span>
          <span className="VerificationDetails__entity">
            {entityCheck(transaction, event)}
          </span>
          <br />
          <span className="VerificationDetails__eventMessage">
            {event.eventMessage}
          </span>
        </TableColumn>
        <TableColumn>
          <span className="VerificationDetails__eventTime">
            {transactionEventDateFormat(event.eventTime)}
          </span>
        </TableColumn>
      </TableRow>
    ));
  };

  const renderTransactions = transactions => {
    return transactions.map((transaction, index) => (
      <div key={index}>
        <DataTable className="VerificationDetails__table" plain>
          <TableHeader>
            <TableRow className="VerificationDetails__header--row">
              <TableColumn colSpan="2">
                <font className="VerificationDetails__header-column">{`Transaction ID: ${
                  transaction.id
                }`}</font>
              </TableColumn>
            </TableRow>
          </TableHeader>
          <TableBody>{renderEvents(transaction)}</TableBody>
        </DataTable>
        <br />
      </div>
    ));
  };

  return (
    <div className="VerificationDetails">
      <div className="VerificationDetails__header">
        <div className="VerificationDetails__header-details">
          <div onClick={props.handleBackToVerifications}>
            <i className="material-icons VerificationDetails__arrow-back">
              arrow_back
            </i>
          </div>
          <span className="VerificationDetails__srn">{props.data[0].srn}</span>
          <span className="VerificationDetails__quick-icon">
            {renderStatusThumbnail(props.data[0].status)}
          </span>
          <span
            className={`VerificationDetails__status ${renderStatusLabelColor(
              props.data[0].status
            )}`}
          >
            {renderStatusLabel(props.data[0].status)}
          </span>
        </div>
        <h6 className="VerificationDetails__pi">{props.productIdentifier}</h6>
        <div className="VerificationDetails__productDetails">
          <p>GTIN: {props.data[0].gtin}</p>
          <p>Serial Number: {props.data[0].srn}</p>
          <p>Lot: {props.data[0].lot}</p>
          <p>Expiration : {expirationDateFormat(props.data[0].expDate)}</p>
          <p>Product: {props.data[0].productName}</p>
        </div>
      </div>
      <Card className="VerificationDetails__details-card">
        {renderTransactions(props.data)}
        <br />
        <br />
      </Card>
    </div>
  );
};

VerificationDetails.propTypes = {
  data: PropTypes.array,
  productIdentifier: PropTypes.string,
  handleBackToVerifications: PropTypes.func,
};

export default VerificationDetails;
