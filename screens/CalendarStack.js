import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import CalendarDrawer from "./CalendarDrawer";
import NewCalendarScreen from "./NewCalendarScreen";


const Stack = createStackNavigator();

export default function CalendarStack() {
    return (
        <Stack.Navigator
        >
            <Stack.Screen
                name="Calendar"
                component={CalendarDrawer}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="New Calendar"
                component={NewCalendarScreen}
            />
        </Stack.Navigator>
    );
}
