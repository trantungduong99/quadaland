import {
  RESTORE_TOKEN,
  SIGN_IN,
  SIGN_OUT,
  SET_COORDINATE,
  GET_INTRO_SALE,
  GET_PROP_BYCOOR,
} from '../actions/actionTypes';

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
        role: action.role,
        username: action.username,
      };
    case SIGN_OUT:
      return {
        ...prevState,
        isSignOut: true,
        userToken: null,
      };
    case SET_COORDINATE:
      return {
        ...prevState,
        coordinate: action.coordinate,
      };
    case GET_INTRO_SALE:
      return {
        ...prevState,
        introSale: action.introSale,
      };
    case GET_PROP_BYCOOR:
      return {
        ...prevState,
        searchList: action.searchList,
      };
    default:
      return prevState;
  }
};
