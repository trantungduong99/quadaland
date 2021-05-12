import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  SignInScreen,
  SignUpScreen,
  SplashScreen,
  PerInfoRegistScreen,
} from '../screens';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => {
  return (
    <RootStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="SplashScreen">
      <RootStack.Screen name="SplashScreen" component={SplashScreen} />
      <RootStack.Screen name="SignInScreen" component={SignInScreen} />
      <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
      <RootStack.Screen
        name="PerInfoRegistScreen"
        component={PerInfoRegistScreen}
      />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
