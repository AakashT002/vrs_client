import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import MDSpinner from 'react-md-spinner';

import Verifications from '../../components/desktop/Verifications';
import VerificationDetails from '../../components/desktop/VerificationDetails';

import '../../assets/stylesheets/DesktopVerificationsPage.css';

import {
  sort,
  verifyProductIdentifier,
  clearVerificationResult,
  getVerificationDetails,
  search,
  clearSearchField,
  getVerifications
} from '../../store/mobile/verification/action';

import DateFormat from '../../utils/dateFormat';
import {
  EXPDATE_INDEX,
  GTIN_INDEX,
  LOT_INDEX,
  SRN_INDEX,
  ALL_STATUS,
  ALL_TIME
} from '../../utils/constants';

export class VerificationsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productIdentifier: null,
      isPIVerificationModalVisible: false,
      disableOnSubmit: false,
      searchText: '',
      verificationList: [],
      selectedStatus: ALL_STATUS,
      selectedRequestTime : ALL_TIME
    };
    this.handleVerificationDetails = this.handleVerificationDetails.bind(this);
    this.handleBackToVerifications = this.handleBackToVerifications.bind(this);
    this.handleVerifyProduct = this.handleVerifyProduct.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.clearSearchText = this.clearSearchText.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleRequestedChange = this.handleRequestedChange.bind(this);
  }

  async componentWillMount() {
    await this.props.dispatch(getVerifications(this.state.selectedStatus,this.state.selectedRequestTime));
    this.setState({ verificationList: this.props.data});
  }

  componentDidMount() {
    document.onkeydown = evt => {
      evt = evt || window.event;
      if (
        evt.keyCode === 27 &&
        this.state.isPIVerificationModalVisible === true
      ) {
        this.setState({
          isPIVerificationModalVisible: false,
        });
        this.props.dispatch(clearVerificationResult());
      }
    };
  }

  handleSort(isDescending) {
    this.props.dispatch(sort(this.props.data, !isDescending));
  }

  async handleCancel() {
    this.setState({
      isPIVerificationModalVisible: false,
      productIdentifier: null,
    });
    await this.props.dispatch(clearVerificationResult());
  }

  handleChange(value) {
    this.setState({ productIdentifier: value, disableOnSubmit: false });
  }

  handleVerify(e) {
    e.preventDefault();
    var deviceId = null;
    this.props
      .dispatch(
        verifyProductIdentifier(
          this.state.productIdentifier.trim(),
          process.env.REACT_APP_DEVICE_TYPE,
          deviceId
        )
      )
      .then(() => {
        this.props.dispatch(sort(this.props.data, this.props.isDescending));
      });
    this.setState({ disableOnSubmit: true });
  }

  handleNextProduct() {
    this.props.dispatch(clearVerificationResult());
    this.setState({ productIdentifier: null });
  }

  async handleVerificationDetails(gtin, srn) {
    await this.props.dispatch(clearVerificationResult());
    await this.props.dispatch(getVerificationDetails(gtin, srn));
    this.setState({ isPIVerificationModalVisible: false });
  }

  async handleBackToVerifications() {
    await this.props.dispatch(clearVerificationResult());
    this.setState({ productIdentifier: null });
    this.setState({ isPIVerificationModalVisible: false});
    this.props.history.push('/home');
  }

  handleVerifyProduct() {
    this.setState({
      isPIVerificationModalVisible: true,
      productIdentifier: null,
    });
  }

  async handleFilterChange(value) {
    this.setState({ searchText: value});
    await this.props.dispatch(clearSearchField(this.state.verificationList));
  }

  handleSearch(e) {
    this.props.dispatch(search(this.props.data, this.state.searchText));
    e.preventDefault();
  }

  clearSearchText() {
    this.setState({ searchText: '' });
    this.props.dispatch(clearSearchField(this.state.verificationList));
  }

  async handleStatusChange(value) {
    await this.setState({ selectedStatus: value});
    this.applySearch(value, this.state.selectedRequestTime);
  }

  async handleRequestedChange(value) {
    await this.setState({ selectedRequestTime: value});
    this.applySearch(this.state.selectedStatus, value);
  }

  async applySearch(selectedStatus,selectedRequestTime) {
    await this.props.dispatch(getVerifications(selectedStatus,selectedRequestTime));
    this.setState({ verificationList: this.props.data});
    this.props.dispatch(search(this.props.data, this.state.searchText));
  }

  render() {
    
    let componentToRender = null;
    if (this.props.requesting === true && this.props.filterRequesting === false) {
      return (
        <div className="VerificationsPage__loader">
          <MDSpinner size={50} singleColor="#00b8d4" />
        </div>
      );
    } else {
      if (
        this.props.verificationResult.length === 0 ||
        (this.props.verificationResult.length > 0 &&
          this.state.isPIVerificationModalVisible === true)
      ) {
        componentToRender = (
          <Verifications
            data={this.props.data}
            handleSort={this.handleSort.bind(this)}
            isDescending={this.props.isDescending}
            handleVerificationDetails={this.handleVerificationDetails}
            isPIVerificationModalVisible={
              this.state.isPIVerificationModalVisible
            }
            handleVerifyProduct={this.handleVerifyProduct}
            handleNextProduct={this.handleNextProduct.bind(this)}
            handleCancel={this.handleCancel.bind(this)}
            handleVerify={this.handleVerify.bind(this)}
            verificationResult={this.props.verificationResult}
            handleChange={this.handleChange.bind(this)}
            productIdentifier={this.state.productIdentifier}
            piRequesting={this.props.piRequesting}
            disableOnSubmit={this.state.disableOnSubmit}
            expirationDateFormat={DateFormat.expirationDateFormat}
            transactionEventDateFormat={DateFormat.transactionEventDateFormat}
            deviceType={process.env.REACT_APP_DEVICE_TYPE}
            handleFilterChange={this.handleFilterChange}
            handleSearch={this.handleSearch}
            searchText={this.state.searchText}
            clearSearchText={this.clearSearchText}
            selectedStatus={this.state.selectedStatus}
            handleStatusChange={this.handleStatusChange}
            selectedRequestTime={this.state.selectedRequestTime}
            handleRequestedChange={this.handleRequestedChange}
            filterRequesting={this.props.filterRequesting}
          />
        );
      } else {
        const productIdentifier = `${GTIN_INDEX}${
          this.props.verificationResult[0].gtin
        }${SRN_INDEX}${this.props.verificationResult[0].srn}${LOT_INDEX}${
          this.props.verificationResult[0].lot
        }${EXPDATE_INDEX}${this.props.verificationResult[0].expDate}`;
        componentToRender = (
          <VerificationDetails
            data={this.props.verificationResult}
            productIdentifier={productIdentifier}
            handleBackToVerifications={this.handleBackToVerifications}
            expirationDateFormat={DateFormat.expirationDateFormat}
            transactionEventDateFormat={DateFormat.transactionEventDateFormat}
            isPIVerificationModalVisible={
              this.state.isPIVerificationModalVisible
            }
            deviceType={process.env.REACT_APP_DEVICE_TYPE}
          />
        );
      }
    }
    return (
      <div className="DesktopVerificationsPage">
        <div className="VerificationsPage__header">{componentToRender}</div>
      </div>
    );
  }
}

VerificationsPage.propTypes = {
  dispatch: PropTypes.func,
  requesting: PropTypes.bool,
  data: PropTypes.array,
  isDescending: PropTypes.bool,
  verificationResult: PropTypes.array,
  history: PropTypes.object,
  piRequesting: PropTypes.bool,
  deviceType: PropTypes.string,
  filterRequesting: PropTypes.bool
};

const mapStateToProps = state => ({
  verificationResult: state.verification.verificationResult,
  data: state.verification.verificationList,
  requesting: state.verification.requesting,  
  isDescending: state.verification.isDescending,
  piRequesting: state.verification.piRequesting,
  filterRequesting: state.verification.filterRequesting,
});

export default connect(mapStateToProps)(VerificationsPage);