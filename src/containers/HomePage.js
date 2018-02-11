import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'react-md/lib/Cards';

import '../assets/stylesheets/HomePage.css';

export class HomePage extends Component {
  render() {
    return (
      <div className="HomePage">
        <div className="HomePage-header">
          <h1 className="HomePage__text">More to come...</h1>
        </div>
        <Card className="HomePage-intro" />
      </div>
    );
  }
}

HomePage.propTypes = {
  respData: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = state => ({
  respData: state.user.respData,
});

export default connect(mapStateToProps)(HomePage);
