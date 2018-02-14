import React from 'react';

import home from '../assets/images/home.svg';
import more_vert from '../assets/images/more_vert.svg';
import '../assets/stylesheets/MobileTitle.css';
import { PROJECT_TITLE } from '../utils/constants';

const MobileTitle = () => {
  return (
    <div className="mobileTitle">
      <img src={home} className="mobileTitle-home" alt="home" />
      <div className="mobileTitle__title--bar">
        <label className="mobileTitle__title--project">{PROJECT_TITLE} </label>
      </div>
      <img src={more_vert} className="mobileTitle__title--more" alt="more" />
    </div>
  );
};

export default MobileTitle;
