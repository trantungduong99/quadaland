const base_url = 'http://9d2e00e0a689.ngrok.io/api/v1';
export const LOGIN_URL = `${base_url}/auth/sign-in`;
export const REGISTER_URL = `${base_url}/auth/sign-up`;
export const LOGOUT_URL = `${base_url}/auth/sign-out`;
export const CHANGE_PASSWORD_URL = `${base_url}/users/change-password`;
export const UPDATE_CUSTOMER_URL = `${base_url}/customers`;
export const UPDATE_COMPANY_URL = `${base_url}/companies`;
export const CREAT_PROPERTY_URL = `${base_url}/properties`;
export const GET_INTROSALE_URL = `${base_url}/properties?per_page=10`;
export const GET_PROPERTY_URL = `${base_url}/properties?`;
export const DELETE_PROPERTY_URL = `${base_url}/properties/`;
export default {
  LOGIN_URL,
  REGISTER_URL,
  LOGOUT_URL,
  CHANGE_PASSWORD_URL,
  UPDATE_CUSTOMER_URL,
  UPDATE_COMPANY_URL,
  CREAT_PROPERTY_URL,
  GET_INTROSALE_URL,
  GET_PROPERTY_URL,
  DELETE_PROPERTY_URL,
};
