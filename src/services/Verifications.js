const API_URL = process.env.REACT_APP_API_URL;

class Verifications {
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
export default Verifications;
