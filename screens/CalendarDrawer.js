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
import { Text, View, TouchableHighlight, Modal } from "react-native";
import { Button, Title } from "react-native-paper";

import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../styles/global";

const Drawer = createDrawerNavigator();

class CalendarDrawer extends Component {
    unsubscribeListener;

    constructor(props) {
        super(props);
        this.state = {
            calendars: [],
            shareVisible: false,
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
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    //console.dir(doc.data());
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

    setShareVisible(value) {
        this.setState({
            ...this.state,
            shareVisible: value,
        });
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
                                <View style={{ flexDirection: "row" }}>
                                    <TouchableHighlight
                                        style={{ marginRight: 10 }}
                                        onPress={() => {
                                            this.props.navigation.navigate(
                                                "Share Calendar",
                                                { calendar: calendar }
                                            );
                                        }}
                                    >
                                        <Ionicons
                                            color="white"
                                            name="share-outline"
                                            size={24}
                                        />
                                    </TouchableHighlight>
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
                                </View>
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
        return (
            <View style={styles.container}>
                <Text>No calendars found...</Text>
                <Button
                    mode="contained"
                    onPress={() => {
                        props.newCalendar();
                    }}
                >
                    New Calendar
                </Button>
            </View>
        );
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
