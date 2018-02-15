import React from 'react';
import {
  Avatar,
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
} from 'react-md';
import moment from 'moment';
import PropTypes from 'prop-types';

import '../assets/stylesheets/Verifications.css';

import {
  ERROR,
  ERROR_LABEL,
  NOT_VERIFIED,
  NOT_VERIFIED_LABEL,
  PENDING,
  PENDING_LABEL,
  VERIFIED,
  VERIFIED_LABEL,
} from '../utils/constants';

const Verifications = ({ verificationList }) => {
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
      return (
        <Avatar className="Verifications__check--oval">
          <i className="material-icons">check</i>
        </Avatar>
      );
    } else if (status === PENDING) {
      return (
        <Avatar className="Verifications__hourglass--oval">
          <i className="material-icons">hourglass_empty</i>
        </Avatar>
      );
    } else if (status === ERROR) {
      return (
        <Avatar className="Verifications__error--oval">
          <i className="material-icons">error_outline</i>
        </Avatar>
      );
    } else if (status === NOT_VERIFIED) {
      return (
        <Avatar className="Verifications__close--oval">
          <i className="material-icons">close</i>
        </Avatar>
      );
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
          {verificationList.map((verification, index) => (
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
              <TableColumn>{renderStatusIcon(verification.status)}</TableColumn>
            </TableRow>
          ))}
        </TableBody>
      </DataTable>
    </div>
  );
};

Verifications.propTypes = {
  verificationList: PropTypes.array,
};

export default Verifications;
