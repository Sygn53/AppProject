import React, { useEffect, useState } from "react";
import type {Node} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet, Text, View,
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FastImage from "react-native-fast-image";
import HomeScreen from "./src/screens/LoginScreen";
import MenuScreen from "./src/screens/MenuScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import LogoTitle from "./src/components/LogoTitle";
import LoginScreen from "./src/screens/LoginScreen";

const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  const [data, setData] = useState([]);

  const getFetchApi = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/data');
      const json = await response.json();
      setData(json.extras);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getFetchApi();
  }, []);

  if (data.length <= 0) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle={'dark-content'}/>
      <Tab.Navigator>
        <Tab.Screen name="login" component={LoginScreen} options={{ headerTitle: (props) => <LogoTitle headerImage={data.header.headerImage} />,
          tabBarIcon: () => (
            <FastImage  source={{uri: data.tabBar.home}}
                        style={{width: 36, height: 36}}/>
          ), }}/>
        <Tab.Screen name="Menu" component={MenuScreen} options={{ headerTitle: (props) => <LogoTitle headerImage={data.header.headerImage}/>,
          tabBarIcon: () => (
            <FastImage  source={{uri: data.tabBar.menu}}
                        style={{width: 36, height: 36}}/>
          ), }}/>
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerTitle: (props) => <LogoTitle headerImage={data.header.headerImage}/>,
          tabBarIcon: () => (
            <FastImage  source={{uri: data.tabBar.profile}}
                        style={{width: 36, height: 36}}/>
          ), }}/>
        <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerTitle: (props) => <LogoTitle headerImage={data.header.headerImage}/>,
          tabBarIcon: () => (
            <FastImage  source={{uri: data.tabBar.settings}}
                        style={{width: 36, height: 36}}/>
          ), }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};



export default App;
