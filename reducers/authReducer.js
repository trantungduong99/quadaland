import {
  RESTORE_TOKEN,
  SIGN_IN,
  SIGN_OUT,
  SET_COORDINATE,
  GET_SUB_RENT,
  GET_PROP_BYCOOR,
  GET_SUB_SALE,
  GET_SALE_PROPERTY,
  GET_RENT_PROPERTY,
  GET_MY_PROPERTY,
  DELETE_MY_PROPERTY,
  CHOOSE_MANY_PHOTOS,
  GET_MEDIA,
  GET_ROLE,
  REFRESH,
} from '../actions/actionTypes';

import _ from 'lodash';

export const authReducer = (prevState, action) => {
  console.log('prevState:', prevState);
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
        username: '',
        role: '',
        coordinate: {
          latitude: '',
          longitude: '',
        },
        subSaleArray: [],
        subRentArray: [],
        saleArray: [],
        rentArray: [],
        myPropery: [],
        searchList: [],
        galleryList: [],
        imagesSelected: [],
      };
    case SET_COORDINATE:
      return {
        ...prevState,
        coordinate: action.coordinate,
      };
    case GET_SUB_SALE:
      return {
        ...prevState,
        subSaleArray: action.subSaleArray,
      };
    case GET_SUB_RENT:
      return {
        ...prevState,
        subRentArray: action.subRentArray,
      };
    case GET_PROP_BYCOOR:
      return {
        ...prevState,
        searchList: action.searchList,
      };
    case GET_SALE_PROPERTY:
      return {
        ...prevState,
        saleArray: action.saleArray,
      };
    case GET_RENT_PROPERTY:
      return {
        ...prevState,
        rentArray: action.rentArray,
      };
    case GET_MY_PROPERTY:
      return {
        ...prevState,
        myProperty: action.myProperty,
      };
    case DELETE_MY_PROPERTY:
      return {
        ...prevState,
        myProperty: action.myProperty,
      };
    case CHOOSE_MANY_PHOTOS:
      console.log('action imagesSelecte', action.imagesSelected);
      return {
        ...prevState,
        imagesSelected: action.imagesSelected,
      };
    case GET_MEDIA:
      return {
        ...prevState,
        galleryList: action.galleryList,
      };
    case GET_ROLE:
      return {
        ...prevState,
        role: action.role,
      };
    case REFRESH:
      return {
        ...prevState,
        refresh: action.refresh,
      };
    default:
      return prevState;
  }
};
