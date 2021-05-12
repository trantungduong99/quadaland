import React from 'react';
import {authReducer} from '../reducers/authReducer';

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

const AuthProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(authReducer, {
    isLoading: true,
    isSignOut: false,
    userToken: null,
  });

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

const useAuthState = () => {
  const context = React.useContext(AuthStateContext);
  console.log(context)
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }
  return context;
};

const useAuthDispatch = () => {
  const context = React.useContext(AuthDispatchContext);
  
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider');
  }
  return context;
};

export {AuthProvider, useAuthState, useAuthDispatch};
