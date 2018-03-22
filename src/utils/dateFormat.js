import moment from 'moment';

class DateFormat {
  static transactionEventDateFormat(date) {
    var gmtDateTime = moment(date, 'YYYY-MM-DD HH:mm:ss.SSS z').format(
      'DD MMM YYYY HH:mm:ss.SSS'
    );
    return gmtDateTime + ' GMT';
  }

  static expirationDateFormat(date) {
    return moment(date, 'YYYY-MM-DD HH:mm:ss z').format('DD MMM YYYY');
  }
}
export default DateFormat;
