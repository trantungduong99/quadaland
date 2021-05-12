/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {AuthProvider} from './contexts/authContext';

const appProvider = ()=>{
  return(
    <AuthProvider>
      <App/>
    </AuthProvider>
  )
}


AppRegistry.registerComponent(appName, () => appProvider);
