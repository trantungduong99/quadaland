import {API} from '../constants';
import asyncStorage from '@react-native-community/async-storage';
const axios = require('axios');
const _ = require('lodash');
const signIn = async (email, password) => {
  await asyncStorage.clear();
  try {
    const response = await axios.post(API.LOGIN_URL, {
      username: email,
      password: password,
    });
    console.log('Login Response ', response.data);
    const access_token = response.data.access_token;
    const expires_in = response.data.expires_in;
    const role = response.data.role;
    const now = new Date();
    const expires_at =
      now.getTime() +
      parseInt(expires_in.slice(-expires_in.length, -1)) * 60 * 1000;
    await asyncStorage.setItem('token', access_token);
    await asyncStorage.setItem('expires_at', expires_at.toString());
    await asyncStorage.setItem('role', role);
    await asyncStorage.setItem('username', email);
    // await readMyProfile();
    return {
      token: response.data.access_token,
      role: response.data.role,
      username: email,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const signOut = async (token) => {
  try {
    await axios.post(
      API.LOGOUT_URL,
      {},
      {headers: {Authorization: `Bearer ${token}`}},
    );
    await asyncStorage.clear();
    return {
      token: '',
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const checkAuth = async () => {
  try {
    const token = await asyncStorage.getItem('token');
    const expires_at = await asyncStorage.getItem('expires_at');
    const role = await asyncStorage.getItem('role');
    const username = await asyncStorage.getItem('username');

    console.log('authService.js data asyncStorage', {
      token: token,
      expires_at: expires_at,
      role: role,
      username: username,
    });
    const now = new Date();
    if (now.getTime() - expires_at > 0) {
      await asyncStorage.clear(); // token
      return '';
    }
    return {token};
  } catch (error) {
    throw new Error(error.message);
  }
};

const signUp = async (email, password) => {
  try {
    const response = await axios.post(API.REGISTER_URL, {
      username: email,
      password: password,
    });
    console.log('register response in authService.js:60 :', response);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const changePassword = async (
  old_password,
  new_password,
  confirmed_new_password,
) => {
  const token = await asyncStorage.getItem('token');
  try {
    const response = await axios.post(
      API.CHANGE_PASSWORD_URL,
      {
        old_password: old_password,
        new_password: new_password,
        confirmed_new_password: confirmed_new_password,
      },
      {headers: {Authorization: `Bearer ${token}`}},
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
const updateCustomer = async (values) => {
  const username = await asyncStorage.getItem('username');
  const token = await asyncStorage.getItem('token');
  const role = await asyncStorage.getItem('role');
  if (role == 'customer') {
    try {
      const response = await axios.patch(
        API.UPDATE_CUSTOMER_URL + '/' + username,
        values,
        {headers: {Authorization: `Bearer ${token}`}},
      );
      console.log('tra ve cua server update ', response);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  if (role == 'company') {
    try {
      const response = await axios.patch(
        API.UPDATE_COMPANY_URL + '/' + username,
        values,
        {headers: {Authorization: `Bearer ${token}`}},
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

const readMyProfile = async () => {
  const username = await asyncStorage.getItem('username');
  const token = await asyncStorage.getItem('token');
  const role = await asyncStorage.getItem('role');
  if (role == 'customer') {
    try {
      const response = await axios.get(
        API.UPDATE_CUSTOMER_URL + '/' + username,
        {headers: {Authorization: `Bearer ${token}`}},
      );
      const {full_name, phone, email, address} = response.data;
      await asyncStorage.setItem('full_name', full_name);
      await asyncStorage.setItem('phone', phone);
      await asyncStorage.setItem('email', email);
      await asyncStorage.setItem('address', address);
      console.log('Read My Profile Response in authService ', response);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  if (role == 'company') {
    try {
      const response = await axios.get(
        API.UPDATE_COMPANY_URL + '/' + username,
        {headers: {Authorization: `Bearer ${token}`}},
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

const createProperty = async (values) => {
  const token = await asyncStorage.getItem('token');
  const role = await asyncStorage.getItem('role');
  console.log('called to create');
  if (role === 'company' || role === 'super_user') {
    try {
      const response = await axios.post(API.CREAT_PROPERTY_URL, values, {
        headers: {Authorization: `Bearer ${token}`},
      });
      console.log('Response create property:', response);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  } else {
    console.log('Mày đâu phải company =))');
  }
};

const getPropertyByCoordinate = async (coordinate, radius) => {
  const {latitude, longitude} = coordinate;
  const token = await asyncStorage.getItem('token');
  console.log(
    `${API.GET_PROPERTY_URL}coordinates[]=${latitude},${longitude}&radius=${radius}`,
  );
  try {
    const response = await axios.get(
      `${API.GET_PROPERTY_URL}coordinates[]=${latitude},${longitude}&radius=${radius}`,
      {
        headers: {Authorization: `Bearer ${token}`},
      },
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteProperty = async (slug) => {
  const token = await asyncStorage.getItem('token');
  console.log(`${API.DELETE_PROPERTY_URL}${slug}`);
  try {
    const response = axios.delete(`${API.DELETE_PROPERTY_URL}${slug}`, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getProperty = async (query) => {
  const token = await asyncStorage.getItem('token');
  try {
    const response = axios.get(API.GET_PROPERTY_URL, {
      headers: {Authorization: `Bearer ${token}`},
      params: query,
    });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
const updateProperty = async (property, slug) => {
  const token = await asyncStorage.getItem('token');
  console.log(`${API.UPDATE_PROPERTY_URL}${slug}`);
  try {
    const response = await axios.patch(
      `${API.UPDATE_PROPERTY_URL}${slug}`,
      property,
      {
        headers: {Authorization: `Bearer ${token}`},
      },
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
const getOneProperty = async (slug) => {
  const token = await asyncStorage.getItem('token');
  console.log(`${API.GET_ONE_PROPERTY_URL}${slug}`);
  try {
    const response = await axios.get(`${API.GET_ONE_PROPERTY_URL}${slug}`, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
const createMedia = async (localPhotos) => {
  if (localPhotos && localPhotos.length > 0) {
    let formData = new FormData();
    localPhotos.forEach((image) => {
      const file = {
        uri: image.path,
        name:
          image.filename ||
          Math.floor(Math.random() * Math.floor(9999999999)) + '.jpg',
        type: image.mime || 'image/jpeg',
      };
      formData.append('files', file);
    });
    try {
      const response = await axios.post(API.CREATE_MEDIA_URL, formData, {
        headers: {Authorization: `Bearer ${token}`},
      });

      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  } else {
    return [];
  }
};

const getMedia = async (values) => {
  const token = await asyncStorage.getItem('token');
  const username = await asyncStorage.getItem('username');
  const {page} = values;
  const query = {
    username: username,
    per_page: 25,
    page: page,
    sort_by: '-created_at',
  };
  try {
    const response = await axios.get(API.CREATE_MEDIA_URL, {
      headers: {Authorization: `Bearer ${token}`},
      params: query,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
const deleteMedia = async (slugs) => {
  const token = await asyncStorage.getItem('token');
  // console.log('Data gui di', {slugs: slugs});
  try {
    const response = await axios.delete(API.CREATE_MEDIA_URL, {
      headers: {Authorization: `Bearer ${token}`},
      data: {slugs: slugs},
    });
    console.log('res tra ve', response);
    return response;
  } catch (error) {
    console.log('Loi tra ve', error);
  }
};
export {
  signIn,
  signOut,
  checkAuth,
  signUp,
  changePassword,
  updateCustomer,
  readMyProfile,
  createProperty,
  getPropertyByCoordinate,
  deleteProperty,
  getProperty,
  updateProperty,
  getOneProperty,
  createMedia,
  getMedia,
  deleteMedia,
};
