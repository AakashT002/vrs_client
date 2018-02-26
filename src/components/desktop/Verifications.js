import React from 'react';
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
} from 'react-md';
import moment from 'moment';
import PropTypes from 'prop-types';
import MDSpinner from 'react-md-spinner';

import access_time from '../../assets/images/access_time.png';
import check_circle from '../../assets/images/check_circle.png';
import error_outline from '../../assets/images/error_outline.png';
import not_interested from '../../assets/images/not_interested.png';

import 'font-awesome/css/font-awesome.min.css';
import '../../assets/stylesheets/DesktopVerifications.css';

import {
  ERROR,
  ERROR_LABEL,
  NOT_VERIFIED,
  NOT_VERIFIED_LABEL,
  PENDING,
  PENDING_LABEL,
  VERIFIED,
  VERIFIED_LABEL,
  VERIFICATIONS_HEADER,
} from '../../utils/constants';

const Verifications = ({ data, requesting }) => {

  const formatDate = date => {
    return moment(date, 'YYYY-MM-DD HH:mm:ss z').format(
      'DD MMM YYYY HH:mm:ss'
    );
  };

  const formatExpiryDate = date => {
    return moment(date, 'YYYY-MM-DD HH:mm:ss z').format(
      'DD MMM YYYY'
    );
  };

  const renderStatusText = status => {
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

  const renderClassName = status => {
    if (status === VERIFIED) {
      return 'DesktopVerifications__table--column-verifiedStatusText';
    } else if (status === PENDING) {
      return 'DesktopVerifications__table--column-pendingStatusText';
    } else if (status === ERROR) {
      return 'DesktopVerifications__table--column-errorStatusText';
    } else if (status === NOT_VERIFIED) {
      return 'DesktopVerifications__table--column-notVerifiedStatusText';
    }
  };

  const renderStatusIcon = status => {
    if (status === VERIFIED) {
      return <img src={check_circle} alt="check_circle" className="DesktopVerifications__status--icon" />;
    } else if (status === PENDING) {
      return <img src={access_time} alt="access_time" className="DesktopVerifications__status--icon" />;
    } else if (status === ERROR) {
      return <img src={error_outline} alt="error_outline" className="DesktopVerifications__status--icon" />;
    } else if (status === NOT_VERIFIED) {
      return <img src={not_interested} alt="not_interested" className="DesktopVerifications__status--icon" />;
    }
  };

  const renderIconClassName = data => {
    if (data.length !== 0) {
      return 'material-icons DesktopVerifications__table--header-data-icon';
    }
    else {
      return 'material-icons DesktopVerifications__table--header-no-data-icon';
    }
  };

  return (
    <div className="DesktopVerifications">
      <DataTable className="DesktopVerifications__table" plain>
        <TableHeader>
          <TableRow className="DesktopVerifications__table--header">
            {VERIFICATIONS_HEADER.map(header => <TableColumn key={header}
              className="DesktopVerifications__table--header-data">{header}</TableColumn>)}
            <i className={renderIconClassName(data)}>arrow_downward</i>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requesting ? (
            <div className="DesktopVerifications__loader">
              <MDSpinner size={90} singleColor="#00b8d4" />
            </div>
          ) : data.length !== 0 ? (
            data.map((verification, index) => (
              <TableRow key={index} className="DesktopVerifications__table--row">
                <TableColumn className="DesktopVerifications__table--column">
                  <font className="DesktopVerifications__serial--number">{verification.srn}
                  </font>
                </TableColumn>
                <TableColumn className="DesktopVerifications__table--column">
                  {renderStatusIcon(verification.status)}
                  <span className={renderClassName(verification.status)}>
                    <font className="DesktopVerifications__status">{renderStatusText(verification.status)}
                    </font>
                  </span>
                </TableColumn>
                <TableColumn className="DesktopVerifications__table--column">
                  <font className="DesktopVerifications__last--updated">{formatDate(verification.requestSentTime)}
                  </font>
                </TableColumn>
                <TableColumn className="DesktopVerifications__table--column">
                  <font className="DesktopVerifications__gtin">{verification.gtin}
                  </font>
                </TableColumn>
                <TableColumn className="DesktopVerifications__table--column">
                  <font className="DesktopVerifications__product--name">{verification.productName}
                  </font>
                </TableColumn>
                <TableColumn className="DesktopVerifications__table--column">
                  <font className="DesktopVerifications__lot">{verification.lot}
                  </font>
                </TableColumn>
                <TableColumn className="DesktopVerifications__table--column">
                  <font className="DesktopVerifications__expiration">{formatExpiryDate(verification.expDate)}
                  </font>
                </TableColumn>
              </TableRow>
            )))
              : (
                <span className="DesktopVerifications__no-data-found">
                  No Verifications Data Found
                </span>
              )
          }
        </TableBody>
      </DataTable>
    </div>
  );
};

Verifications.propTypes = {
  data: PropTypes.array,
  requesting: PropTypes.bool,
};

export default Verifications;
