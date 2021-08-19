const base_url = 'http://123.19.51.38:3000/api/v1';
export const LOGIN_URL = `${base_url}/auth/sign-in`;
export const REGISTER_URL = `${base_url}/auth/sign-up`;
export const LOGOUT_URL = `${base_url}/auth/sign-out`;
export const CHANGE_PASSWORD_URL = `${base_url}/users/change-password`;
export const UPDATE_CUSTOMER_URL = `${base_url}/customers`;
export const UPDATE_COMPANY_URL = `${base_url}/companies`;
export const CREAT_PROPERTY_URL = `${base_url}/properties`;
export const GET_INTROSALE_URL = `${base_url}/properties?per_page=10`;
export const GET_PROPERTY_URL = `${base_url}/properties?`;
export const GET_ONE_PROPERTY_URL = `${base_url}/properties/`;
export const DELETE_PROPERTY_URL = `${base_url}/properties/`;
export const UPDATE_PROPERTY_URL = `${base_url}/properties/`;
export const CREATE_MEDIA_URL = `${base_url}/media`;
export const GET_BOOKMARKS = `${base_url}/bookmarks`;
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
  UPDATE_PROPERTY_URL,
  GET_ONE_PROPERTY_URL,
  CREATE_MEDIA_URL,
  GET_BOOKMARKS,
};
