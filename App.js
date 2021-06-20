import React, { useState, useEffect, useRef} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";

import SettingsScreen from "./screens/SettingsScreen.js";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

import { View, Text , Platform} from "react-native";

import firebase from "./firebase";
import Strings from "./constants/strings";
import CalendarStack from "./screens/CalendarStack";
import { Title } from "react-native-paper";
import InvitesScreen from "./screens/InvitesScreen.js";

import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export default function App() {
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const [expoPushToken, setExpoPushToken] = useState("");

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) =>
            setExpoPushToken(token)
        );
    }, []);

    firebase.auth().onAuthStateChanged((user) => {
        setUser(user);
        setIsLoading(false);
    });

    if (isLoading) {
        // Splash Screen here
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "tomato",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Title style={{ color: "white" }}>CollabCalendar</Title>
            </View>
        );
    }

    if (!user) {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="login">
                    <Stack.Screen
                        name="login"
                        component={LoginScreen}
                        options={{ title: "Login", headerShown: false }}
                    />
                    <Stack.Screen
                        name="signup"
                        component={SignupScreen}
                        options={{ title: "Sign Up", headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

    return (
        <NavigationContainer>
            <Tab.Navigator
                detachInactiveScreens={true}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === "Calendar") {
                            iconName = focused
                                ? "calendar"
                                : "calendar-outline";
                        } else if (route.name === "Settings") {
                            iconName = focused
                                ? "settings"
                                : "settings-outline";
                        } else if (route.name === "Invites") {
                            iconName = focused ? "mail" : "mail-outline";
                        }

                        // You can return any component that you like here!
                        return (
                            <Ionicons
                                name={iconName}
                                size={size}
                                color={color}
                            />
                        );
                    },
                })}
                tabBarOptions={{
                    activeTintColor: "tomato",
                    inactiveTintColor: "gray",
                }}
            >
                <Tab.Screen
                    name="Calendar"
                    component={CalendarStack}
                    options={{ title: "Calendar" }}
                />
                <Tab.Screen
                    name="Invites"
                    component={InvitesScreen}
                    options={{ title: "Invites" }}
                />
                <Tab.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{ title: "Settings" }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const {
            status: existingStatus,
        } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
            //alert("Failed to get push token for push notification!");
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        //alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        });
    }

    return token;
}
