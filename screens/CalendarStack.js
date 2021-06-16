import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CalendarDrawer from "./CalendarDrawer";
import NewCalendarScreen from "./NewCalendarScreen";

import EditCalendarScreen from "./EditCalendarScreen";

const Stack = createStackNavigator();

export default function CalendarStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Calendar"
                component={CalendarDrawer}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="New Calendar"
                component={NewCalendarScreen}
            />
            <Stack.Screen
                name="Edit Calendar"
                component={EditCalendarScreen}
            />
        </Stack.Navigator>
    );
}
