import React, { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import {
    TextInput,
    HelperText,
    Button,
    RadioButton,
    List,
} from "react-native-paper";

import styles from "../styles/global";
import formStyles from "../styles/form";

import Strings from "../constants/strings";
import firebase from "../firebase";

export default function ShareCalendarScreen({ route, navigation }) {
    const { calendar } = route.params;

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const [role, setRole] = useState("collaborator");

    const [existingRoles, setExistingRoles] = useState([]);

    console.log(calendar.roles);

    useEffect(() => {
        Object.keys(calendar.roles).forEach((uid) => {
            firebase
                .firestore()
                .collection("users")
                .doc(uid)
                .get()
                .then((userDoc) => {
                    setExistingRoles([
                        ...existingRoles,
                        {
                            email: userDoc.data().email,
                            role: calendar.roles[uid],
                        },
                    ]);
                });
        });
    }, []);

    const listItems = () => {
        var items = [];
        items = existingRoles.map((member, index) => {
            return (
                <List.Item
                    title={member.email}
                    description={member.role}
                    left={props => <List.Icon {...props} icon="account" />}

                />
            )
        });

        return items;
    }
    

    return (

        <View style={styles.container}>
            <ScrollView style={formStyles.formContainer}>
                <View style={formStyles.formElement}>
                    <TextInput
                        mode="outlined"
                        label={"User Email"}
                        error={emailError != ""}
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                        //placeholder={Strings.evEventTitle}
                    />
                    <HelperText type="error" visible={emailError != ""}>
                        {emailError}
                    </HelperText>
                </View>

                <View
                    style={{
                        marginTop: 20,
                        width: "60%",
                    }}
                >
                    <RadioButton.Group
                        onValueChange={(value) => setRole(value)}
                        value={role}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text style={{ textAlignVertical: "center" }}>
                                Collaborator
                            </Text>
                            <RadioButton value={"collaborator"} />
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text style={{ textAlignVertical: "center" }}>
                                Viewer
                            </Text>
                            <RadioButton value={"viewer"} />
                        </View>
                    </RadioButton.Group>
                </View>

                <List.Section>
                    {listItems()}
                </List.Section>
            </ScrollView>

            <View style={formStyles.formButtons}>
                <Button
                    mode="contained"
                    color="grey"
                    labelStyle={{ color: "white" }}
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    {Strings.genCancel}
                </Button>

                <Button
                    mode="contained"
                    onPress={() => {
                        if (email == "") {
                            setEmailError("This field cannot be empty.");
                            return;
                        }

                        firebase
                            .firestore()
                            .collection("users")
                            .where("email", "==", email)
                            .get()
                            .then((querySnapshot) => {
                                if (!querySnapshot.empty) {
                                    const reciever = querySnapshot.docs[0];
                                    firebase
                                        .firestore()
                                        .collection("invites")
                                        .add({
                                            calendarID: calendar.id,
                                            calendarTitle: calendar.title,
                                            senderID: firebase.auth()
                                                .currentUser.uid,
                                            receiverID: reciever.id,
                                            role: role,
                                            situation: "sent",
                                        })
                                        .then(() => {
                                            navigation.goBack();
                                        })
                                        .catch((error) =>
                                            console.log(
                                                `Error sending invite: ${error}`
                                            )
                                        );
                                } else {
                                    setEmailError(
                                        "No user found with this email."
                                    );
                                    return;
                                }
                            });
                    }}
                >
                    {"Send Invite"}
                </Button>
            </View>
        </View>
    );
}
