import React, { Component, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { List, Button } from "react-native-paper";
import firebase from "../firebase";

import styles from "../styles/global";

export default class InvitesScreen extends Component {
    unsubscribeListener;

    constructor(props) {
        super(props);

        this.state = {
            invites: [],
        };
    }

    componentDidMount() {
        this.unsubscribeListener = firebase
            .firestore()
            .collection("invites")
            .where("receiverID", "==", firebase.auth().currentUser.uid)
            .where("situation", "==", "sent")
            .onSnapshot((querySnapshot) => {
                var newInvites = [];
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    newInvites = [...newInvites, { ...doc.data(), id: doc.id }];
                });
                this.setState({
                    ...this.state,
                    invites: newInvites,
                });
            });
    }

    componentWillUnmount() {
        if (!!this.unsubscribeListener) {
            this.unsubscribeListener();
        }
    }

    render() {
        var items = [];
        items = this.state.invites.map((invite, index) => {
            return (
                <List.Item
                    key={index}
                    title={invite.calendarTitle}
                    description={`You were invited to be a ${invite.role} in this calendar.`}
                    left={(props) => (
                        <List.Icon {...props} icon="email-alert" />
                    )}
                    right={(props) => (
                        <View>
                            <Button
                                onPress={() => {
                                    firebase
                                        .firestore()
                                        .collection("calendars")
                                        .doc(invite.calendarID)
                                        .update({
                                            [`roles.${
                                                firebase.auth().currentUser.uid
                                            }`]: invite.role,
                                        })
                                        .then(() => {
                                            firebase
                                                .firestore()
                                                .collection("invites")
                                                .doc(invite.id)
                                                .delete()
                                                .then(() => {
                                                    console.log(
                                                        "Document successfully deleted!"
                                                    );
                                                })
                                                .catch((error) => {
                                                    console.error(
                                                        "Error removing document: ",
                                                        error
                                                    );
                                                });
                                        });
                                }}
                            >
                                Accept
                            </Button>
                            <Button
                                onPress={() => {
                                    firebase
                                        .firestore()
                                        .collection("invites")
                                        .doc(invite.id)
                                        .delete()
                                        .then(() => {
                                        console.log(
                                            "Document successfully deleted!"
                                        );
                                    }).catch((error) => {
                                        console.error(
                                            "Error removing document: ",
                                            error
                                        );
                                    });
                                }}
                            >
                                Reject
                            </Button>
                        </View>
                    )}
                />
            );
        });

        return (
            <View style={styles.container}>
                <ScrollView>
                    <List.Section>{items}</List.Section>
                </ScrollView>
            </View>
        );
    }
}
