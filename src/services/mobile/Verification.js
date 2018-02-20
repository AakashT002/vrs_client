const API_URL = process.env.REACT_APP_API_URL;

class Verification {
  static async verify(pi) {
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
        deviceType: process.env.REACT_APP_DEVICE_TYPE,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Error while verifying product.');
    }
  }

  static async getVerificationList() {
    const token = sessionStorage.kctoken;
    const verificationUrl = `${API_URL}/api/verifications`;
    const response = await fetch(verificationUrl, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Verifications could not be fetched.');
    }
  }
}
export default Verification;
