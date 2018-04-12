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

  static async getVerificationDetails(gtin, srn, requestedTime) {
    const token = sessionStorage.kctoken;
    const verificationUrl = `${API_URL}/api/verification/${gtin}/${srn}?pastRequestedTime=${requestedTime}`;
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
    const token = sessionStorage.kctoken;
    const verificationUrl = `${API_URL}/api/verifications?status=${status}&pastRequestedTime=${requestedTime}`;
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