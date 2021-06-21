import React, { Component } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { Divider } from "react-native-elements";
import styles from "../styles/global";
import {
    DrawerContentScrollView,
    DrawerItemList,
    createDrawerNavigator,
} from "@react-navigation/drawer";

import firebase from "../firebase";
import CalendarEventNavigator from "./CalendarEventNavigator";
import { Text, View, TouchableHighlight, Modal } from "react-native";
import { Button, Title, Paragraph, Dialog } from "react-native-paper";

import Ionicons from "react-native-vector-icons/Ionicons";
import strings from "../constants/strings";

import Strings from "../constants/strings";

const Drawer = createDrawerNavigator();

class CalendarDrawer extends Component {
    unsubscribeListener;

    constructor(props) {
        super(props);
        console.log('props ', props)
        this.state = {
            calendars: [],
            shareVisible: false,
            showDialogDelete : false,
        };
    }

    componentDidMount() {
        this.unsubscribeListener = firebase
            .firestore()
            .collection("calendars")
            .where(`roles.${firebase.auth().currentUser.uid}`, "in", [
                "owner",
                "collaborator",
                "viewer"
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

    setShareVisible(value) {
        this.setState({
            ...this.state,
            shareVisible: value,
        });
    }

    render() {
        console.log(this.state.calendars)
        if (this.state.calendars.length > 0) {
            var calendarScreens = [];
            calendarScreens = this.state.calendars.map((calendar, index) => {
                const myPermission = calendar.roles[firebase.auth().currentUser.uid];

            
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
                                ['owner', 'collaborator'].some(c => c == myPermission)  ?
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
                                        <TouchableHighlight
                                            style={{ marginRight: 10 }}
                                            onPress={() => {
                                                this.props.navigation.navigate(
                                                    "Copy Calendar",
                                                    { calendar: calendar }
                                                );
                                            }}
                                        >
                                            <Ionicons
                                                color="white"
                                                name="copy"
                                                size={24}
                                            />
                                        </TouchableHighlight>
                                    </View>
                                : (
                                    <View style={{ flexDirection: "row" }}>
                                        <TouchableHighlight
                                            style={{ marginRight: 10 }}
                                            onPress={() => {
                                                this.props.navigation.navigate(
                                                    "Copy Calendar",
                                                    { calendar: calendar }
                                                );
                                            }}
                                        >
                                            <Ionicons
                                                color="white"
                                                name="copy"
                                                size={24}
                                            />
                                        </TouchableHighlight>
                                    </View>
                                )
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
                <Text>{Strings.calNoCalendarFound}</Text>
                <Button
                    mode="contained"
                    onPress={() => {
                        props.newCalendar();
                    }}
                >
                    {strings.calNewCalendar}
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
                    {Strings.utiCreateNew}
                </Button>
            </View>
        </View>
    );
}

export default CalendarDrawer;
