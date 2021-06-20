import React, { Component } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { Divider } from "react-native-elements";

import {
    DrawerContentScrollView,
    DrawerItemList,
    createDrawerNavigator,
} from "@react-navigation/drawer";

import firebase from "../firebase";
import CalendarEventNavigator from "./CalendarEventNavigator";
import { Text, View, TouchableHighlight } from "react-native";
import { Button, Title } from "react-native-paper";

import Ionicons from "react-native-vector-icons/Ionicons";

const Drawer = createDrawerNavigator();

class CalendarDrawer extends Component {
    unsubscribeListener;

    constructor(props) {
        super(props);
        this.state = {
            calendars: [],
        };
    }

    componentDidMount() {
        this.unsubscribeListener = firebase
            .firestore()
            .collection("calendars")
            .where(`roles.${firebase.auth().currentUser.uid}`, "in", [
                "owner",
                "collaborator",
            ])
            .onSnapshot((querySnapshot) => {
                this.clearCalendars();
                querySnapshot.forEach((doc) => {
                
                    var calendar = {
                        ...doc.data(),
                        id: doc.id,
                    };
                    this.addCalendar(calendar);
                });
                console.dir(this.state.calendars);
            });
    }

    componentWillUnmount() {
        if (!!this.unsubscribeListener) {
            this.unsubscribeListener();
        }
    }

    clearCalendars() {
        this.setState({
            ...this.state,
            calendars: [],
        });
    }

    addCalendar(calendar) {
        this.setState({
            ...this.state,
            calendars: [...this.state.calendars, calendar],
        });
    }

    newCalendarScreen() {
        this.props.navigation.navigate("New Calendar");
    }

    render() {
        if (this.state.calendars.length > 0) {
            var calendarScreens = [];
            calendarScreens = this.state.calendars.map((calendar, index) => {
                return (
                    <Drawer.Screen
                        name={index + calendar.title}
                        component={CalendarEventNavigator}
                        initialParams={{ calendar: calendar }}
                        options={{
                            title: calendar.title,
                            headerShown: true,
                            headerStyle: { backgroundColor: "tomato" },
                            headerTintColor: "white",
                            headerRight: () => (
                                <TouchableHighlight
                                    style={{ marginRight: 10 }}
                                    onPress={() => {
                                        this.props.navigation.navigate(
                                            "Edit Calendar",
                                            { calendar: calendar }
                                        );
                                    }}
                                >
                                    <Ionicons
                                        color="white"
                                        name="create-outline"
                                        size={24}
                                    />
                                </TouchableHighlight>
                            ),
                        }}
                        key={index}
                    />
                );
            });

            return (
                <Drawer.Navigator
                    drawerContent={(props) => (
                        <CustomDrawerContent
                            {...props}
                            newCalendar={() => this.newCalendarScreen()}
                        />
                    )}
                    drawerStyle={{
                        width: 240,
                    }}
                >
                    {calendarScreens}
                </Drawer.Navigator>
            );
        }
        return <View></View>;
    }
}

function CustomDrawerContent(props) {
    return (
        <View style={{ flex: 1, flexDirection: "column" }}>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <Divider orientation="horizontal" />
            <View
                style={{
                    padding: 20,
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-end",
                }}
            >
                <Button
                    mode="contained"
                    onPress={() => {
                        props.newCalendar();
                    }}
                >
                    New Calendar
                </Button>
            </View>
        </View>
    );
}

export default CalendarDrawer;
