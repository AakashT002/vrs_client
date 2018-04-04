import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'react-md';
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
} from 'react-md';

import '../../assets/stylesheets/PercentageStats.css';

const PercentageStats = ({ stats }) => {
  const renderPercentageStats = (total, fields) => {
    return Object.keys(fields).map(function(key) {
      var percentage = fields[key] / total * 100;
      var value = percentage.toFixed(2);
      var style = { width: value + '%' };
      return (
        <div
          key={key}
          style={style}
          className={`PercentageStats__response-${key}`}
          title={value + '%'}
        />
      );
    });
  };

  return (
    <div className="PercentageStats">
      <Card className="PercentageStats__card">
        <CardTitle className="PercentageStats__title" title={stats.type} />
        <CardText>
          <DataTable className="PercentageStats__table" plain>
            <TableHeader className="PercentageStats__table-header">
              <TableRow className="PercentageStats__table-header-row">
                {stats.headers.map((header, index) => (
                  <TableColumn
                    key={index}
                    className={`PercentageStats__table-header${index}`}
                  >
                    <p>{header.toUpperCase()}</p>
                  </TableColumn>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats.data.map((data, index) => (
                <TableRow key={index} className="PercentageStats__table-row">
                  <TableColumn className="PercentageStats__table-row-name">
                    {data.value1}
                  </TableColumn>
                  <TableColumn className="PercentageStats__table-row-requests">
                    {data.value2}
                  </TableColumn>
                  <TableColumn className="PercentageStats__table-row-response">
                    <div className="PercentageStats__response">
                      {renderPercentageStats(data.value2, data.value3)}
                    </div>
                  </TableColumn>
                </TableRow>
              ))}
            </TableBody>
          </DataTable>
        </CardText>
      </Card>
    </div>
  );
};

PercentageStats.propTypes = {
  stats: PropTypes.object,
};

export default PercentageStats;
