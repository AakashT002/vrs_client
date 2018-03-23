import React from 'react';
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  Card,
  DialogContainer,
} from 'react-md';
import PropTypes from 'prop-types';
import MDSpinner from 'react-md-spinner';

import VerificationResult from './VerificationResult';
import PIVerificationForm from '../../components/common/PIVerificationForm';

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
  SORT_FIELD_LAST_UPDATED,
} from '../../utils/constants';

const Verifications = ({
  data,
  handleSort,
  isDescending,
  handleVerificationDetails,
  handleVerifyProduct,
  handleNextProduct,
  handleCancel,
  handleVerify,
  verificationResult,
  handleChange,
  productIdentifier,
  isPIVerificationModalVisible,
  piRequesting,
  disableOnSubmit,
  expirationDateFormat,
  transactionEventDateFormat,
  deviceType
}) => {
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
      return (
        <img
          src={check_circle}
          alt="check_circle"
          className="DesktopVerifications__status--icon"
        />
      );
    } else if (status === PENDING) {
      return (
        <img
          src={access_time}
          alt="access_time"
          className="DesktopVerifications__status--icon"
        />
      );
    } else if (status === ERROR) {
      return (
        <img
          src={error_outline}
          alt="error_outline"
          className="DesktopVerifications__status--icon"
        />
      );
    } else if (status === NOT_VERIFIED) {
      return (
        <img
          src={not_interested}
          alt="not_interested"
          className="DesktopVerifications__status--icon"
        />
      );
    }
  };

  const renderHeaderAndSortable = (header, isDescending) => {
    if (header === SORT_FIELD_LAST_UPDATED) {
      return (
        <label>
          {header}
          <i
            className="material-icons DesktopVerifications__table--header-icon"
            onClick={() => handleSort(isDescending)}
          >
            {isDescending ? 'arrow_downward' : 'arrow_upward'}
          </i>
        </label>
      );
    } else {
      return header;
    }
  };

  let renderModalContent = null;
  if (verificationResult.length === 0) {
    renderModalContent = (
      <PIVerificationForm
        productIdentifier={productIdentifier}
        handleChange={value => handleChange(value)}
        handleSubmit={handleVerify}
        handleReset={handleCancel}
        disableOnSubmit={disableOnSubmit}
        deviceType={deviceType}
      />
    );
  } else {
    renderModalContent = (
      <VerificationResult
        data={verificationResult}
        productIdentifier={productIdentifier}
        expirationDateFormat={expirationDateFormat}
        isPIVerificationModalVisible={isPIVerificationModalVisible}
        handleNextProduct={handleNextProduct}
        handleVerificationDetails={handleVerificationDetails}
        deviceType={deviceType}
      />
    );
  }

  const renderId =
    verificationResult.length === 0 ? 'verifyProduct' : 'verificationResult';

  const renderTitle = verificationResult.length === 0 ? 'Verify Product' : null;

  return (
    <div className="DesktopVerifications">
      <div className="DesktopVerifications__title">
        <span className="DesktopVerifications__title--text">Verifications</span>
        <DialogContainer
          id={`DesktopVerifications__${renderId}--dialogContainer`}
          visible={isPIVerificationModalVisible}
          onHide={handleCancel}
          title={renderTitle}
          modal
        >
          {renderModalContent}
          {piRequesting ? (
            <div className="DesktopVerifications__loader">
              <MDSpinner size={20} singleColor="#00b8d4" />
            </div>
          ) : null}
        </DialogContainer>
        <Card className="DesktopVerifications__card">
          <DataTable className="DesktopVerifications__table" plain>
            <a
              onClick={handleVerifyProduct}
              label="VERIFY PRODUCT"
              className="DesktopVerifications__verify-product--button"
            >
              VERIFY PRODUCT
            </a>
            <TableHeader>
              <TableRow className="DesktopVerifications__table--header">
                {VERIFICATIONS_HEADER.map(header => (
                  <TableColumn
                    key={header}
                    className="DesktopVerifications__table--header-data"
                  >
                    {renderHeaderAndSortable(header, isDescending)}
                  </TableColumn>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length !== 0 ? (
                data.map((verification, index) => (
                  <TableRow
                    key={index}
                    className="DesktopVerifications__table--row"
                    onClick={() => {
                      handleVerificationDetails(
                        verification.gtin,
                        verification.srn
                      );
                    }}
                  >
                    <TableColumn className="DesktopVerifications__table--column">
                      <font className="DesktopVerifications__serial--number">
                        {verification.srn}
                      </font>
                    </TableColumn>
                    <TableColumn className="DesktopVerifications__table--column">
                      {renderStatusIcon(verification.status)}
                      <span className={renderClassName(verification.status)}>
                        <font className="DesktopVerifications__status">
                          {renderStatusText(verification.status)}
                        </font>
                      </span>
                    </TableColumn>
                    <TableColumn className="DesktopVerifications__table--column">
                      <font className="DesktopVerifications__last--updated">
                        {transactionEventDateFormat(
                          verification.requestSentTime
                        )}
                      </font>
                    </TableColumn>
                    <TableColumn className="DesktopVerifications__table--column">
                      <font className="DesktopVerifications__gtin">
                        {verification.gtin}
                      </font>
                    </TableColumn>
                    <TableColumn className="DesktopVerifications__table--column">
                      <font className="DesktopVerifications__product--name">
                        {verification.productName}
                      </font>
                    </TableColumn>
                    <TableColumn className="DesktopVerifications__table--column">
                      <font className="DesktopVerifications__lot">
                        {verification.lot}
                      </font>
                    </TableColumn>
                    <TableColumn className="DesktopVerifications__table--column">
                      <font className="DesktopVerifications__expiration">
                        {expirationDateFormat(verification.expDate)}
                      </font>
                    </TableColumn>
                  </TableRow>
                ))
              ) : (
                <span className="DesktopVerifications__no-data-found">
                  No Verifications Data Found
                </span>
              )}
            </TableBody>
          </DataTable>
        </Card>
      </div>
    </div>
  );
};

Verifications.propTypes = {
  data: PropTypes.array,
  requesting: PropTypes.bool,
  piRequesting: PropTypes.bool,
  handleSort: PropTypes.func,
  isDescending: PropTypes.bool,
  handleVerificationDetails: PropTypes.func,
  handleVerifyProduct: PropTypes.func,
  handleNextProduct: PropTypes.func,
  handleNextCancel: PropTypes.func,
  verificationResult: PropTypes.array,
  handleVerify: PropTypes.func,
  handleChange: PropTypes.func,
  productIdentifier: PropTypes.string,
  handleCancel: PropTypes.func,
  isPIVerificationModalVisible: PropTypes.bool,
  disableOnSubmit: PropTypes.bool,
  expirationDateFormat: PropTypes.func,
  transactionEventDateFormat: PropTypes.func,
  deviceType: PropTypes.string
};

export default Verifications;
