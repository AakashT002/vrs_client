export const ALL_VERIFICATIONS = 'ALL VERIFICATIONS';
export const DESKTOP = 'desktop';
export const ENTER_PRODUCT_ID = 'ENTER PRODUCT ID';
export const ERROR = 'ERROR';
export const ERROR_LABEL = 'Error';
export const ERRORS_LABEL = 'Errors';
export const EXPIRATION_LABEL = 'Expiration';
export const GTIN_LABEL = 'GTIN';
export const LOGOUT = 'LOGOUT';
export const LOT_LABEL = 'Lot';
export const MESA_VERDE = 'MESA VERDE';
export const MOBILE = 'mobile';
export const NOT_VERIFIED = 'NOT_VERIFIED';
export const NOT_VERIFIED_LABEL = 'Not Verified';
export const PENDING = 'PENDING';
export const PENDING_LABEL = 'Pending';
export const PRODUCT_LABEL = 'Product';
export const NEXT_STEPS_LABEL = 'Next Steps';
export const PROJECT_TITLE = 'vrs.productm.com';
export const REQUESTED_LABEL = 'Requested';
export const REQUEST_RCVD = 'REQUEST_RECEIVED';
export const REQUESTOR_ID_LABEL = 'Requestor ID : ';
export const REQUESTS = 'REQUESTS';
export const REQUESTS_LABEL = 'Requests';
export const RESPONDER_ID_LABEL = 'Responder ID : ';
export const SERIAL_NUMBER_LABEL = 'Serial Number';
export const SORT_FIELD_LAST_UPDATED = 'LAST UPDATED';
export const SORT_FIELD_REQUESTED = 'REQUESTED';
export const ERROR_ID_LABEL = 'Error ID: ';
export const PAST_24_HOURS = 'Past 24 Hours';
export const PAST_24_HOURS_DASHBOARD =
  'Verification Requests in the Past 24 Hours';
export const PAST_7_DAYS = 'Past 7 Days';
export const PAST_7_DAYS_DASHBOARD = 'Verification Requests in the Past 7 Days';
export const PAST_30_DAYS = 'Past 30 Days';
export const PAST_30_DAYS_DASHBOARD =
  'Verification Requests in the Past 30 Days';
export const PAST_90_DAYS = 'Past 90 Days';
export const PAST_90_DAYS_DASHBOARD =
  'Verification Requests in the Past 90 Days';
export const PAST_12_MONTHS = 'Past 12 Months';
export const PAST_12_MONTHS_DASHBOARD =
  'Verification Requests in the Past 12 Months';
export const PAST_6_MONTHS = 'Past 6 Months';
export const PAST_6_MONTHS_DASHBOARD =
  'Verification Requests in the Past 6 Months';
export const REQUESTED_TIME_LABEL = 'Requested Time';
export const ALL_TIME = 'All Time';
export const VERIFIED = 'VERIFIED';
export const VERIFIED_LABEL = 'Verified';
export const VERIFY_PRODUCT = 'VERIFY PRODUCT';
export const ALL_STATUS = 'All';
export const ONE_DAY = '1d';
export const SEVEN_DAY = '7d';
export const THIRTY_DAY = '30d';
export const NINETY_DAY = '90d';
export const SIX_M = '6 months';
export const TWELVE_M = '12 months';

export const VERIFICATIONS_HEADER = [
  'SNI',
  'STATUS',
  'REQUESTED',
  'USER',
  'RETURNED BY',
  'SHIPPED BY',
];
export const RETURNED_BY = [
  'Walgreens',
  'Pharmaca',
  'CVS Pharmacy',
  'Target Pharmacy',
];
export const SHIPPED_BY = [
  'ABC Shipping',
  'FedEx',
  'USPS',
  'Hoover Shipping',
  'Ship It',
];
export const STATUS = [
  { title: ALL_STATUS, value: ALL_STATUS },
  { title: VERIFIED_LABEL, value: VERIFIED },
  { title: NOT_VERIFIED_LABEL, value: NOT_VERIFIED },
  { title: PENDING_LABEL, value: PENDING },
  { title: ERROR_LABEL, value: ERROR },
];
export const REQUESTED_TIME = [
  { title: PAST_24_HOURS, value: ONE_DAY },
  { title: PAST_7_DAYS, value: SEVEN_DAY },
  { title: PAST_30_DAYS, value: THIRTY_DAY },
  { title: PAST_90_DAYS, value: NINETY_DAY },
  { title: PAST_6_MONTHS, value: SIX_M },
  { title: PAST_12_MONTHS, value: TWELVE_M },
  { title: ALL_TIME, value: ALL_STATUS },
];
export const REQUESTED_TIME_DASHBOARD = [
  { title: PAST_24_HOURS_DASHBOARD, value: ONE_DAY },
  { title: PAST_7_DAYS_DASHBOARD, value: SEVEN_DAY },
  { title: PAST_30_DAYS_DASHBOARD, value: THIRTY_DAY },
  { title: PAST_90_DAYS_DASHBOARD, value: NINETY_DAY },
  { title: PAST_6_MONTHS_DASHBOARD, value: SIX_M },
  { title: PAST_12_MONTHS_DASHBOARD, value: TWELVE_M },
  { title: ALL_TIME, value: ALL_STATUS },
];
export const SEARCH_QUERY_LABEL = 'Search Query';
export const SRN = 'SRN';
export const STATUS_LABEL = 'Status';
export const STATUS_HEADER = 'STATUS';
export const GTIN = 'GTIN';
export const PI = 'PI';
export const LOT = 'LOT';
export const EXPIRATION = 'EXPIRATION';
export const PRODUCT = 'PRODUCT';
export const EXPORT_TRANSACTION_DETAILS_HEADER = [
  'TRANSACTION ID',
  'TIME',
  'DETAILS',
];
export const EXPORT_DATA_INSTRUCTION =
  'Exporting will compile all data about this product into a downloadable csv.';
export const EXPORT_DATA_LIST_INSTRUCTION =
  'Exporting will compile all data currently visible on the verifications table into a downloadable csv';
export const LOOKUP_NOT_FOUND =
  'Move to Review bin. Contact the Manufacturer / Product GTIN Owner';
export const PRODUCT_NOT_VERIFIED =
  'DO NOT resell ! Move to Quarantine bin Q25.';
