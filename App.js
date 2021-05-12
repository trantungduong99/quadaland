import React, {useState} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './navigation/tabs';
import {
  Search,
  Map,
  Project,
  Shopping,
  Rent,
  News,
  ProjectDetail,
  RentDetail,
  ShoppingDetail,
  RootStackScreen,
  ChangePassword,
  MyProfile,
} from './screens/';
import {useAuthDispatch, useAuthState} from './contexts/authContext';
import {checkAuth} from './services/authService';
import {RESTORE_TOKEN} from './actions/actionTypes';
// import {AuthProvider} from './contexts/authContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
const Stack = createStackNavigator();

const App = () => {
  // const [isSignedIn, setIsSignedIn] = useState(false)

  // useEffect(() => {
  //   isSignedIn = true;
  // }, [store.get(user)])
  const {isLoading, isSignOut, userToken} = useAuthState();
  const dispatch = useAuthDispatch();
  React.useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const user = await checkAuth();
        console.log('39:app.js', userToken);
        token = user.token;
      } catch (e) {
        console.log(e.message);
      }
      dispatch({type: RESTORE_TOKEN, token});
    };
    bootstrapAsync();
  }, [userToken]);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {!isLoading && !userToken ? (
          <RootStackScreen />
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={'Home'}>
            <Stack.Screen name="Home" component={Tabs} />

            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Map" component={Map} />
            <Stack.Screen name="Project" component={Project} />
            <Stack.Screen name="Shopping" component={Shopping} />
            <Stack.Screen name="Rent" component={Rent} />
            <Stack.Screen name="News" component={News} />
            <Stack.Screen name="ProjectDetail" component={ProjectDetail} />
            <Stack.Screen name="RentDetail" component={RentDetail} />
            <Stack.Screen name="ShoppingDetail" component={ShoppingDetail} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="MyProfile" component={MyProfile} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
