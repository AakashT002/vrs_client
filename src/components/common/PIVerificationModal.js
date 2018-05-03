import React from 'react';
import { DialogContainer } from 'react-md';
import PropTypes from 'prop-types';
import MDSpinner from 'react-md-spinner';

import VerificationResult from '../../components/desktop/VerificationResult';
import PIVerificationForm from '../../components/common/PIVerificationForm';

import 'font-awesome/css/font-awesome.min.css';
import '../../assets/stylesheets/PIVerificationModal.css';

const PIVerificationModal = ({
  handleVerificationDetails,
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
  deviceType,
  modal,
  selectedRequestTime,
}) => {
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
        selectedRequestTime={selectedRequestTime}
      />
    );
  }

  const renderId =
    verificationResult.length === 0 ? 'verifyProduct' : 'verificationResult';

  return (
    <div className="PIVerificationModal">
      <DialogContainer
        aria-label="Verify Product"
        id={`PIVerificationModal__${renderId}--dialogContainer`}
        visible={isPIVerificationModalVisible}
        onHide={handleCancel}
        focusOnMount={false}
      >
        {renderModalContent}
        {piRequesting ? (
          <div className={`PIVerificationModal__loader-${modal}`}>
            <MDSpinner size={20} singleColor="#00b8d4" />
          </div>
        ) : null}
      </DialogContainer>
    </div>
  );
};

PIVerificationModal.propTypes = {
  data: PropTypes.array,
  requesting: PropTypes.bool,
  piRequesting: PropTypes.bool,
  handleSort: PropTypes.func,
  isDescending: PropTypes.bool,
  handleVerificationDetails: PropTypes.func,
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
  deviceType: PropTypes.string,
  handleSearch: PropTypes.func,
  handleFilterChange: PropTypes.func,
  searchText: PropTypes.string,
  clearSearchText: PropTypes.func,
  selectedStatus: PropTypes.string,
  handleStatusChange: PropTypes.func,
  handleRequestedChange: PropTypes.func,
  selectedRequestTime: PropTypes.string,
  filterRequesting: PropTypes.bool,
  modal: PropTypes.string,
};

export default PIVerificationModal;