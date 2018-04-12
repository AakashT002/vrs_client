

const API_URL = process.env.REACT_APP_API_URL;

class Dashboard {
  static async getStatsForUser(requestedTime) {
    const token = sessionStorage.kctoken;
    const userStatsUrl = `${API_URL}/api/verifications/stats/percentage?type=u&pastRequestedTime=${requestedTime}`;
    const response = await fetch(userStatsUrl, {
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

  static async getStatsForDevices(requestedTime) {
    const token = sessionStorage.kctoken;
    const deviceStatsUrl = `${API_URL}/api/verifications/stats/percentage?type=d&pastRequestedTime=${requestedTime}`;
    const response = await fetch(deviceStatsUrl, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Stats for devices could not be fetched.');
    }
  }

  static async getStatsForNumbers(requestedTime) {
    const token = sessionStorage.kctoken;
    const numberStatsUrl = `${API_URL}/api/verifications/stats/number?pastRequestedTime=${requestedTime}`;
    const response = await fetch(numberStatsUrl, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Stats for numbers could not be fetched.');
    }
  }
}
export default Dashboard;
