import React from 'react';
import {Text, View} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './navigation/tabs';
import {Search, Map,Project,Shopping,Rent,News,ProjectDetail,RentDetail,ShoppingDetail} from './screens/';

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
        {/* Hiding tab bar in specific screens */}
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="Project" component={Project} />
        <Stack.Screen name="Shopping" component={Shopping} />
        <Stack.Screen name="Rent" component={Rent} />
        <Stack.Screen name="News" component={News} />
        <Stack.Screen name="ProjectDetail" component={ProjectDetail} />
        <Stack.Screen name="RentDetail" component={RentDetail} />
        <Stack.Screen name="ShoppingDetail" component={ShoppingDetail} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
