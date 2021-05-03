import {SIGN_IN,SIGN_UP} from './actionType';

export const signIn = ({username,password})=>{
  return {
    type: SIGN_IN,
    username:username,
    password:password,
  }
}