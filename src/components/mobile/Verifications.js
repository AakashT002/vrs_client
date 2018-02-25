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
import { SpinLoading } from 'respinner';

import access_time from '../../assets/images/access_time.png';
import check_circle from '../../assets/images/check_circle.png';
import error_outline from '../../assets/images/error_outline.png';
import not_interested from '../../assets/images/not_interested.png';

import '../../assets/stylesheets/Verifications.css';

import {
  ERROR,
  ERROR_LABEL,
  NOT_VERIFIED,
  NOT_VERIFIED_LABEL,
  PENDING,
  PENDING_LABEL,
  VERIFIED,
  VERIFIED_LABEL,
} from '../../utils/constants';

const Verifications = ({ data, requesting }) => {
  const formatDate = date => {
    return moment(date, 'YYYY-MM-DD HH:mm:ss z').format(
      'DD MMM, YYYY HH:mm:ss'
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

  const renderStatusIcon = status => {
    if (status === VERIFIED) {
      return <img src={check_circle} alt="check_circle" />;
    } else if (status === PENDING) {
      return <img src={access_time} alt="access_time" />;
    } else if (status === ERROR) {
      return <img src={error_outline} alt="error_outline" />;
    } else if (status === NOT_VERIFIED) {
      return <img src={not_interested} alt="not_interested" />;
    }
  };

  return (
    <div className="Verifications">
      <DataTable plain className="Verifications__table">
        <TableHeader>
          <TableRow className="Verifications__table--header">
            <TableColumn colSpan="2">
              <font className="Verifications__label">Verifications</font>
              <br />
              <font className="Verifications__hours">Past 24 Hours</font>
            </TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requesting ? (
            <div className="Verifications__loader">
              <SpinLoading
                stroke="$blue-grey"
                borderRadius={2}
                loading={true}
                count={10}
              />
            </div>
          ) : data.length !== 0 ? (
            data.map((verification, index) => (
              <TableRow key={index} className="Verifications__table--row">
                <TableColumn>
                  <font className="Verifications__serialization--code">
                    {verification.srn}
                  </font>
                  <br />
                  <font className="Verifications__status">
                    {renderStatusText(verification.status)}
                  </font>
                  <font className="Verifications__timestamp">
                    {formatDate(verification.responseRcvTime)}
                  </font>
                </TableColumn>
                <TableColumn>
                  {renderStatusIcon(verification.status)}
                </TableColumn>
              </TableRow>
            ))
          ) : (
            <span className="Verifications-msg">
              No Verifications Data Found
            </span>
          )}
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