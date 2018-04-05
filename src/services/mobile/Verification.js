import {
  VERIFIED,
  NOT_VERIFIED,
  PENDING,
  ERROR,
  PAST_7_DAYS,
  PAST_30_DAYS,
  PAST_90_DAYS,
  PAST_12_MONTHS,
  PAST_6_MONTHS,
  ALL_TIME,
  NOT_VERIFIED_LABEL,
  VERIFIED_LABEL,
  PENDING_LABEL,
  ERROR_LABEL,
  ALL_STATUS,
  ONE_D,
  SEVEN_D,
  THIRTY_D,
  NINTEE_DAY,
  SIX_M,
  TWELVE_M,
} from '../../utils/constants';

const API_URL = process.env.REACT_APP_API_URL;

class Verification {
  static async verify(pi, deviceType, deviceId) {
    const token = sessionStorage.kctoken;
    const verificationUrl = `${API_URL}/api/productIdentifier`;
    const response = await fetch(verificationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        pi: pi,
        requestorId: process.env.REACT_APP_REQUESTOR_ID,
        deviceType: deviceType,
        deviceId: deviceId,
        gln: process.env.REACT_APP_REQUESTOR_GLN,
      }),
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Error while verifying product.');
    }
  }

  static async getVerificationDetails(gtin, srn) {
    const token = sessionStorage.kctoken;
    const verificationUrl = `${API_URL}/api/verification/${gtin}/${srn}`;
    const response = await fetch(verificationUrl, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Product details could not be fetched.');
    }
  }

  static async getVerifications(status, requestedTime) {
    let tempRequest;
    let tempStatus;

    switch (requestedTime) {
      case PAST_7_DAYS:
        tempRequest = SEVEN_D;
        break;
      case PAST_30_DAYS:
        tempRequest = THIRTY_D;
        break;
      case PAST_90_DAYS:
        tempRequest = NINTEE_DAY;
        break;
      case PAST_12_MONTHS:
        tempRequest = SIX_M;
        break;
      case PAST_6_MONTHS:
        tempRequest = TWELVE_M;
        break;
      case ALL_TIME:
        tempRequest = ALL_STATUS.toLowerCase();
        break;
      default:
        tempRequest = ONE_D;
        break;
    }

    const token = sessionStorage.kctoken;

    switch (status) {
      case VERIFIED_LABEL:
        tempStatus = VERIFIED;
        break;
      case NOT_VERIFIED_LABEL:
        tempStatus = NOT_VERIFIED;
        break;
      case ERROR_LABEL:
        tempStatus = ERROR;
        break;
      case PENDING_LABEL:
        tempStatus = PENDING;
        break;
      default:
        tempStatus = ALL_STATUS;
        break;
    }

    const verificationUrl = `${API_URL}/api/verifications?status=${tempStatus}&pastRequestedTime=${tempRequest}`;
    const response = await fetch(verificationUrl, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Verifications could not be fetched.');
    }
  }
}
export default Verification;