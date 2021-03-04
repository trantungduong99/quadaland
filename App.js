import React from 'react';
import {Text, View} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './navigation/tabs';
import { Community, Notification, Message} from './screens/';
import Account from './screens/Account';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Home'}>
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name="Community" component={Community} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Message" component={Message} />
        <Stack.Screen name="Account" component={Account}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
