import React, { Component } from "react";
import { View, Text, Button, Platform } from "react-native";
//import { Button } from 'react-native-paper';
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

import styles from "../styles/global";
import firebase from "../firebase";

class SettingsScreen extends Component {
    

    render() {
        return (
            <View style={styles.container}>
                <Text>Settings Screen.</Text>

                <Button
                    title="Test Notification"
                    onPress={async () => {
                        await Notifications.scheduleNotificationAsync({
                            content: {
                                title: "Test",
                                body: "Hello world!",
                                data: { data: 'goes here' },
                            },
                            trigger: {seconds: 1},
                        })
                    }}
                />

                <Button
                    title="Logout"
                    onPress={() => {
                        firebase.auth().signOut();
                    }}
                />
            </View>
        );
    }
}

export default SettingsScreen;
