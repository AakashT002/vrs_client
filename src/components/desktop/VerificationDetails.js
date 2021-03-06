import { Card } from 'react-md';
import PropTypes from 'prop-types';
import React from 'react';
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  Button,
} from 'react-md';
import moment from 'moment';

import ProductDetails from '../common/ProductDetails.js';
import ExportData from './ExportData.js';

import '../../assets/stylesheets/VerificationDetails.css';

import {
  ERROR,
  ERROR_LABEL,
  NEXT_STEPS_LABEL,
  NOT_VERIFIED,
  NOT_VERIFIED_LABEL,
  PENDING,
  PENDING_LABEL,
  PRODUCT_LABEL,
  REQUEST_RCVD,
  ERROR_ID_LABEL,
  VERIFIED,
  VERIFIED_LABEL,
  EXPORT_TRANSACTION_DETAILS_HEADER,
  SRN,
  STATUS_HEADER,
  GTIN,
  PI,
  LOT,
  EXPIRATION,
  EXPORT_DATA_INSTRUCTION,
  LOOKUP_NOT_FOUND,
  PRODUCT_NOT_VERIFIED,
  MANUFACTURER_ID,
  VRS_PROVIDER_ID
} from '../../utils/constants';
import DateFormat from '../../utils/dateFormat';

import access_time from '../../assets/images/access_time.png';
import check_circle from '../../assets/images/check_circle.png';
import error_outline from '../../assets/images/error_outline.png';
import not_interested from '../../assets/images/not_interested.png';

const VerificationDetails = props => {

  const renderErrorMessage = (data) => {
    let errorMessage, errorLabel, errorText;
    if (data.status === ERROR) {
      var events = data.events;
      for (var i = 0; i < data.events.length; i++) {
        if (events[i].eventStatus === ERROR) {
          errorMessage = `Error ${events[i].statusCode}: ${events[i].eventMessage}`;
          errorLabel = `Error ${events[i].statusCode}`;
          errorText = events[i].eventMessage;
          break;
        }
      }
    }
    return { errorMessage: errorMessage, errorLabel: errorLabel, errorText: errorText };
  };

  let errorValues = renderErrorMessage(props.data[0]);

  const renderStatusThumbnail = status => {
    if (status === VERIFIED) {
      return (
        <img className="img_resolution" src={check_circle} alt="check_circle" />
      );
    } else if (status === PENDING || status === REQUEST_RCVD) {
      return (
        <img className="img_resolution" src={access_time} alt="access_time" />
      );
    } else if (status === ERROR) {
      return (
        <img
          className="img_resolution"
          src={error_outline}
          alt="error_outline"
        />
      );
    } else if (status === NOT_VERIFIED) {
      return (
        <img
          className="img_resolution"
          src={not_interested}
          alt="not_interested"
        />
      );
    }
  };

  const renderStatusLabelColor = status => {
    if (status === VERIFIED) {
      return 'VerificationDetails__green';
    } else if (status === PENDING) {
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

  const entityCheck = (transaction, event) => {
    if (
      event.eventStatus === VERIFIED ||
      event.eventStatus === NOT_VERIFIED ||
      event.eventStatus === REQUEST_RCVD
    ) {
      if (event.entityType === 'MANUFACTURER') {
        return `${MANUFACTURER_ID}: ${event.entityId}`;
      }
      else if (event.entityType === 'VRS_PROVIDER') {
        return `${VRS_PROVIDER_ID}: ${event.entityId}`;
      }
      else {
        return `${event.entityType} ID: ${event.entityId}`;
      }
    } else if (event.eventStatus === ERROR) {
      return ERROR_ID_LABEL + event.statusCode;
    }
  };

  const renderEvents = transaction => {
    return transaction.events.map((event, index) => {
      if (
        event.eventStatus === VERIFIED ||
        event.eventStatus === NOT_VERIFIED ||
        event.eventStatus === PENDING ||
        event.eventStatus === REQUEST_RCVD ||
        event.eventStatus === ERROR
      ) {
        return (
          <TableRow
            key={index}
            className="VerificationDetails__body--row md-table-row--hover"
          >
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
                {props.transactionEventDateFormat(event.eventTime)}
              </span>
            </TableColumn>
          </TableRow>
        );
      } else {
        return null;
      }
    });
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

  var currentDateFormat = moment().format('YYYY-MM-DD HH:mm:ss');

  let exportData = [];

  const FormateEventLabel = status => {
    if (status === VERIFIED) {
      return PRODUCT_LABEL;
    }
    else if (status === NOT_VERIFIED) {
      return NEXT_STEPS_LABEL;
    }
    else if (status === ERROR) {
      return errorValues.errorLabel;
    }
  };

  const FormateEventMessage = data => {
    if (data[0].status === VERIFIED) {
      return data[0].productName;
    }
    else if (data[0].status === NOT_VERIFIED) {
      return data[0].nextStepCode === 'LOOKUP_NOT_FOUND'
        ? LOOKUP_NOT_FOUND
        : PRODUCT_NOT_VERIFIED;
    }
    else if (data[0].status === ERROR) {
      return errorValues.errorText;
    }
  };

  const FormatExportData = data => {
    const productLabel = FormateEventLabel(data[0].status);
    const productLabelText = FormateEventMessage(data);

    exportData.push(
      [SRN, `'${data[0].srn}'`],
      [STATUS_HEADER, renderStatusLabel(props.data[0].status)],
      [GTIN, `'${data[0].gtin}'`],
      [PI, data[0].pi],
      [LOT, data[0].lot],
      [EXPIRATION, DateFormat.expirationDateFormat(data[0].expDate)],
      [productLabel, productLabelText],
      [],
      EXPORT_TRANSACTION_DETAILS_HEADER
    );

    data.forEach(transaction => {
      transaction.events.forEach(event => {
        if (
          event.eventStatus === VERIFIED ||
          event.eventStatus === NOT_VERIFIED ||
          event.eventStatus === PENDING ||
          event.eventStatus === REQUEST_RCVD ||
          event.eventStatus === ERROR
        ) {
          exportData.push([
            event.verificationId,
            DateFormat.transactionEventDateFormat(event.eventTime),
            `${entityCheck(transaction, event)},
						${event.eventMessage}`,
          ]);
        }
      });
    });
    return exportData;
  };

  return (
    <div className="VerificationDetails">
      <div className="VerificationDetails__header">
        <div className="VerificationDetails__inner">
          <div className="VerificationDetails__header-details">
            <Button
              className="material-icons VerificationDetails__arrow-back"
              onClick={props.handleBackToVerifications}
            >
              arrow_back
            </Button>
            <span className="VerificationDetails__srn">
              {props.data[0].srn}
            </span>
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
          <Button
            className="VerificationDetails__export-data--button"
            onClick={props.handleExportData}
          >
            EXPORT DATA
          </Button>
          <ExportData
            handlePostExportData={props.handlePostExportData}
            isModalVisible={props.isModalVisible}
            data={FormatExportData(props.data)}
            fileName={`exportList_${props.data[0].srn}${
              props.data[0].gtin
              }_${currentDateFormat}.csv`}
            infoText={EXPORT_DATA_INSTRUCTION}
            modal="vrsDetails"
          />
          <ProductDetails
            productIdentifier={props.data[0].pi}
            gtin={props.data[0].gtin}
            srn={props.data[0].srn}
            lot={props.data[0].lot}
            expDate={props.data[0].expDate}
            productName={props.data[0].productName}
            showInModal={props.isPIVerificationModalVisible}
            deviceType={props.deviceType}
            status={props.data[0].status}
            errorMessage={errorValues.errorMessage}
            nextStepCode={props.data[0].nextStepCode}
          />
        </div>
      </div>
      <Card className="VerificationDetails__details-card">
        {renderTransactions(props.data)}
        <br />
        <br />
      </Card>
      <br />
    </div>
  );
};

VerificationDetails.propTypes = {
  data: PropTypes.array,
  productIdentifier: PropTypes.string,
  handleBackToVerifications: PropTypes.func,
  expirationDateFormat: PropTypes.func,
  transactionEventDateFormat: PropTypes.func,
  isPIVerificationModalVisible: PropTypes.bool,
  deviceType: PropTypes.string,
  handleExportData: PropTypes.func,
  handlePostExportData: PropTypes.func,
  isModalVisible: PropTypes.bool,
};

export default VerificationDetails;
