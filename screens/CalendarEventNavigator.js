import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CalendarScreen from "./CalendarScreen";
import DaysEventsScreen from "./DaysEventsScreen";
import NewEventScreen from "./NewEventScreen";

export default function CalendarEventNavigator() {
    const Stack = createStackNavigator();

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator>
                <Stack.Screen name="Calendar" component={CalendarScreen} options={{headerShown: false}}/>
                <Stack.Screen
                    name="Day's Events"
                    component={DaysEventsScreen}
                    options={{ title: "Day's Events" }}
                />
                <Stack.Screen
                    name="New Event"
                    component={NewEventScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
