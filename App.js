import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Text, View } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles/global';

//import TabBar from './components/TabBar'

import CalendarEventNavigator from './screens/CalendarEventNavigator';
import SettingsScreen from './screens/SettingsScreen.js';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';


import firebase from "./firebase";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  /* const auth = firebase.auth();
  const firestore = firebase.firestore(); */

  const [user, setUser] = useState();

  firebase.auth().onAuthStateChanged(user => {
    //console.log(user)
    setUser(user);

  });

  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Login' }}
          />
          <Stack.Screen
            name="Sign Up"
            component={SignupScreen}
            options={{ title: 'Sign Up' }}
          />
        </Stack.Navigator>
      </NavigationContainer>

    );
  }

  return (   
    <NavigationContainer>
      <Tab.Navigator
      /*tabBar={props => <TabBar {...props}/>}*/
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Calendar') {
                iconName = focused
                  ? 'calendar'
                  : 'calendar-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
        >
        <Tab.Screen
          name="Calendar"
          component={CalendarEventNavigator}
          options={{ title: 'Calendar' }}/>
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Settings' }}/>

      </Tab.Navigator>
    </NavigationContainer>
  );
}


