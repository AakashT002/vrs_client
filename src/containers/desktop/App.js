import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import Header from './Header';
import VerificationsPage from './VerificationsPage';
import Dashboard from './Dashboard.js';

import '../../assets/stylesheets/App.css';
import 'material-design-icons/iconfont/material-icons.css';

export class App extends Component {
  render() {
    let homeComponent;
    if (sessionStorage.getItem('userRole') === 'manager') {
      homeComponent  = Dashboard;
    } else {
      homeComponent  = VerificationsPage;
    }
    return (
      <div className="App">
        <Header />

        <div className="App-content">
          <Switch>
            <Route exact path="/" component={homeComponent } />
            <Route exact path="/verifications" component={VerificationsPage} />
            <Route exact path="/dashboard" component={homeComponent } />
            <Route exact path="*" component={homeComponent } />
          </Switch>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default withRouter(connect(mapStateToProps)(App));
