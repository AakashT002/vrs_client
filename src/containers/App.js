import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import Header from './Header';
import HomePage from './HomePage';

import '../assets/stylesheets/App.css';
import 'material-design-icons/iconfont/material-icons.css';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />

        <div className="App-content">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/home" component={HomePage} />
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
