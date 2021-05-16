const base_url = 'http://9d2e00e0a689.ngrok.io';
export const LOGIN_URL = `${base_url}/api/v1/auth/sign-in`;
export const REGISTER_URL = `${base_url}/api/v1/auth/sign-up`;
export const LOGOUT_URL = `${base_url}/api/v1/auth/sign-out`;
export const CHANGE_PASSWORD_URL = `${base_url}/api/v1/users/change-password`;
export const UPDATE_CUSTOMER_URL = `${base_url}/api/v1/customers`;
export const UPDATE_COMPANY_URL = `${base_url}/api/v1/companies`;
export const CREAT_PROPERTY_URL = `${base_url}/api/v1/properties`;
export const GET_INTROSALE_URL = `${base_url}/api/v1/properties?per_page=10`;
export const GET_PROPERTY_BYCOORDINATE_URL = `${base_url}/api/v1/properties?`;

export default {
  LOGIN_URL,
  REGISTER_URL,
  LOGOUT_URL,
  CHANGE_PASSWORD_URL,
  UPDATE_CUSTOMER_URL,
  UPDATE_COMPANY_URL,
  CREAT_PROPERTY_URL,
  GET_INTROSALE_URL,
  GET_PROPERTY_BYCOORDINATE_URL,
};
