import React, { Component } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import CalendarScreen from "./CalendarScreen";
import DaysEventsScreen from "./DaysEventsScreen";
import NewEventScreen from "./NewEventScreen";
import firebase from "../firebase";

const Stack = createStackNavigator();

class CalendarEventNavigator extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { calendar } = this.props.route.params;
        return (
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        height: 40
                    },
                    headerTitleStyle: {
                        justifyContent: 'center'
                    }
                }}
            >
                <Stack.Screen
                    name="Calendar"
                    component={CalendarScreen}
                    options={{ headerShown: false }}
                    initialParams={{
                        calendar: calendar,
                    }}
                />
                <Stack.Screen
                    name="Day's Events"
                    component={DaysEventsScreen}
                    options={{ title: "Day's Events" }}
                />
                <Stack.Screen
                    name="New Event"
                    component={NewEventScreen}
                    options={{ title: "New Event" }}
                />
            </Stack.Navigator>
        );
    }
}

export default CalendarEventNavigator;
