import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';

import {Home,Community,Notification,Message,Account} from '../screens';

import {COLORS, icons} from '../constants';

const Tab = createBottomTabNavigator();

const Tabs = ()=>{
  return(
    <Tab.Navigator tabBarOptions={{
      showLabel:false
    }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon:({focused})=>(
            <Image source={icons.home}
            resizeMode="contain"
            style={{width:25,height:25,tintColor:focused?COLORS.primary:COLORS.secondary}}

            />
          ) 
        }}
      />
      <Tab.Screen
        name="Community"
        component={Community}
        options={{
          tabBarIcon:({focused})=>(
            <Image source={icons.community}
            resizeMode="contain"
            style={{width:25,height:25,tintColor:focused?COLORS.primary:COLORS.secondary}}

            />
          ) 
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon:({focused})=>(
            <Image source={icons.notification}
            resizeMode="contain"
            style={{width:25,height:25,tintColor:focused?COLORS.primary:COLORS.secondary}}

            />
          ) 
        }}
      />
      <Tab.Screen
        name="Message"
        component={Message}
        options={{
          tabBarIcon:({focused})=>(
            <Image source={icons.message}
            resizeMode="contain"
            style={{width:25,height:25,tintColor:focused?COLORS.primary:COLORS.secondary}}

            />
          ) 
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon:({focused})=>(
            <Image source={icons.account}
            resizeMode="contain"
            style={{width:25,height:25,tintColor:focused?COLORS.primary:COLORS.secondary}}

            />
          ) 
        }}
      />
      
    </Tab.Navigator>
  )
}

export default Tabs