import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import MobileHomePage from './MobileHomePage';
import VerificationsPage from './VerificationsPage';
import '../assets/stylesheets/MobileApp.css';
import 'material-design-icons/iconfont/material-icons.css';

export class MobileApp extends Component {
  render() {
    return (
      <div className="MobileApp">
        <div className="MobileApp-content">
          <Switch>
            <Route exact path="/" component={MobileHomePage} />
            <Route exact path="/home" component={MobileHomePage} />
            <Route exact path="/verifications" component={VerificationsPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

MobileApp.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default withRouter(connect(mapStateToProps)(MobileApp));
