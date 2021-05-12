import {API} from '../constants';
import asyncStorage from '@react-native-community/async-storage';
const axios = require('axios');
const signIn = async (email, password) => {
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
    return {
      token: response.data.access_token,
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
const updateCustomer = async (full_name, phone, address, email) => {
  const username = await asyncStorage.getItem('username');
  const token = await asyncStorage.getItem('token');
  try {
    const response = await axios.patch(API.UPDATE_CUSTOMER_URL+'/'+username,
      {
        full_name: full_name,
        phone: phone,
        address: address,
        email: email,
      },
      {headers: {Authorization: `Bearer ${token}`}},
    );
    console.log("tra ve cua server update ",response)
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export {signIn, signOut, checkAuth, signUp, changePassword,updateCustomer};
