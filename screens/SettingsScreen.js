import React, { Component } from "react";
import { View, Text, Platform } from "react-native";
import { Button } from "react-native-paper";

import Strings from "../constants/strings";

import styles from "../styles/global";
import firebase from "../firebase";

class SettingsScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View
                    style={{
                        flexDirection: "column",
                        justifyContent: "space-between",
                        width: 150,
                        height: 100,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Button
                            mode="outlined"
                            onPress={() => {
                                Strings.setLanguage("pt");
                            }}
                        >
                            PT
                        </Button>
                        <Button
                            mode="outlined"
                            onPress={() => {
                                Strings.setLanguage("eng");
                            }}
                        >
                            ENG
                        </Button>
                    </View>
                    <Button
                        mode="contained"
                        onPress={() => {
                            firebase.auth().signOut();
                        }}
                    >
                        {Strings.logLogOut}
                    </Button>
                </View>
            </View>
        );
    }
}

export default SettingsScreen;
