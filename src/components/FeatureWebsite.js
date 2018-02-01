import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-md/lib/Buttons';

const FeatureWebsite = ({ website }) => (
  <Button raised primary href={website} target="_blank">
    Visit Website
  </Button>
);

FeatureWebsite.propTypes = {
  website: PropTypes.string,
};

export default FeatureWebsite;
