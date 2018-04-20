import PropTypes from 'prop-types';
import React from 'react';
import { DialogContainer } from 'react-md';
import { CSVLink } from 'react-csv';

import '../../assets/stylesheets/ExportData.css';

const ExportData = ({ handlePostExportData, isModalVisible, data, fileName, infoText }) => {

  return (
    <div className="ExportData">
      <DialogContainer
        id="ExportData__dialogContainer"
        visible={isModalVisible}
        onHide={handlePostExportData}
        focusOnMount={false}
      >
        <span className="ExportData__dialogContainer--instruction">
          {infoText}
        </span>
        <CSVLink
          data={data}
          filename={fileName}
          className="ExportData__dialogContainer--export-button"
          target="_blank">
          <span className="ExportData__dialogContainer--export-button-text"
            onClick={handlePostExportData}>
            EXPORT TO CSV
            </span>
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
  infoText: PropTypes.string
};

export default ExportData;
