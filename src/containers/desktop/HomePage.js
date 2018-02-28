import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'react-md';

import Verifications from '../../components/desktop/Verifications';

import '../../assets/stylesheets/HomePage.css';

import {
  getVerificationList,
  sort,
} from '../../store/mobile/verification/action';

export class HomePage extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getVerificationList());
  }

  handleSort(isDescending) {
    this.props.dispatch(sort(this.props.data, !isDescending));
  }

  render() {
    return (
      <div className="HomePage">
        <div className="HomePage__header">
          <div className="HomePage__title">
            <span className="HomePage__title--text">Verifications</span>
          </div>
          <Card className="HomePage__card">
            <Verifications
              data={this.props.data}
              requesting={this.props.requesting}
              handleSort={this.handleSort.bind(this)}
              isDescending={this.props.isDescending}
            />
          </Card>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func,
  requesting: PropTypes.bool,
  data: PropTypes.array,
  isDescending: PropTypes.bool,
};

const mapStateToProps = state => ({
  data: state.verification.verificationList,
  requesting: state.verification.requesting,
  isDescending: state.verification.isDescending,
});

export default connect(mapStateToProps)(HomePage);
