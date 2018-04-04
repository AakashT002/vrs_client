import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import PercentageStats from '../../components/desktop/PercentageStats';

import {
  getStatsForUser,
  getStatsForDevices,
} from '../../store/desktop/dashboard/action';

class Dashboard extends Component {
  async componentWillMount() {
    await this.props.dispatch(getStatsForUser());
    await this.props.dispatch(getStatsForDevices());
  }
  render() {
    return (
      <div className="Dashboard">
        <PercentageStats stats={this.props.statsForUser} />
        <PercentageStats stats={this.props.statsForDevices} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func,
  statsForUser: PropTypes.object,
  statsForDevices: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    statsForUser: state.dashboard.statsForUser,
    statsForDevices: state.dashboard.statsForDevices,
  };
}

export default connect(mapStateToProps)(Dashboard);
