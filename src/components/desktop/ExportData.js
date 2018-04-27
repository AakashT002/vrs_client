import PropTypes from 'prop-types';
import React from 'react';
import { Button, DialogContainer } from 'react-md';
import { CSVLink } from 'react-csv';

import '../../assets/stylesheets/ExportData.css';

const ExportData = ({
  handlePostExportData,
  isModalVisible,
  data,
  fileName,
  infoText,
  modal,
}) => {
  return (
    <div className="ExportData">
      <DialogContainer
        id={`ExportData__dialogContainer-${modal}`}
        visible={isModalVisible}
        onHide={handlePostExportData}
        focusOnMount={false}
      >
        <span className={`ExportData__dialogContainer--instruction-${modal}`}>
          {infoText}
        </span>
        <CSVLink
          data={data}
          filename={fileName}
          target="_blank"
        >
          <Button
            className={`ExportData__dialogContainer--export-button-${modal}`}
            onClick={handlePostExportData}
          >
            EXPORT TO CSV
          </Button>
        </CSVLink>
      </DialogContainer>
    </div>
  );
};

ExportData.propTypes = {
  handlePostExportData: PropTypes.func,
  isModalVisible: PropTypes.bool,
  data: PropTypes.array,
  fileName: PropTypes.string,
  infoText: PropTypes.string,
  modal: PropTypes.string,
};

export default ExportData;
