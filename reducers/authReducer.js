import {RESTORE_TOKEN, SIGN_IN, SIGN_OUT} from '../actions/actionTypes';

export const authReducer = (prevState, action) => {
  switch (action.type) {
    case RESTORE_TOKEN:
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case SIGN_IN:
      return {
        ...prevState,
        isSignOut: false,
        userToken: action.token,
      };
    case SIGN_OUT:
      return {
        ...prevState,
        isSignOut: true,
        userToken: null,
      };
    default: 
      return prevState;
  }
};
