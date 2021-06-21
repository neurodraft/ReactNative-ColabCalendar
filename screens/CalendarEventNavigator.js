import React, { Component } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import CalendarScreen from "./CalendarScreen";
import DaysEventsScreen from "./DaysEventsScreen";
import NewEventScreen from "./NewEventScreen";
import EditEventScreen from "./EditEventScreen";
import CopyEventScreen from "./CopyEventScreen";

import Strings from "../constants/strings";

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
                    options={{ title: Strings.eveDaysEvents }}
                />
                <Stack.Screen
                    name="New Event"
                    component={NewEventScreen}
                    options={{ title: Strings.eveNewEvent }}
                />
                 <Stack.Screen
                    name="edit-event"
                    component={EditEventScreen}
                    options={{ title: "Edit Event" }}
                />
                <Stack.Screen
                    name="copy-event"
                    component={CopyEventScreen}
                    options={{ title: "Copy Event" }}
                />
            </Stack.Navigator>
        );
    }
}

export default CalendarEventNavigator;
