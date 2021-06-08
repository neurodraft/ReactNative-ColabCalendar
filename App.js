import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles/global';

//import TabBar from './components/TabBar'

import CalendarScreen from './screens/CalendarScreen';
import SettingsScreen from './screens/SettingsScreen.js';


const Tab = createBottomTabNavigator();

export default function App() {

  const [notes, setNotes] = React.useState([]);

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
          component={CalendarScreen}
          options={{ title: 'Calendar' }}/>
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Settings' }}/>

      </Tab.Navigator>
    </NavigationContainer>
  );
}


