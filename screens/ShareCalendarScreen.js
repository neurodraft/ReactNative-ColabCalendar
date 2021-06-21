import React, { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import {
    TextInput,
    HelperText,
    Button,
    RadioButton,
    List,
    IconButton,
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

    const updateRoles = () => {
        var promises = [];
        firebase.firestore().collection("calendars").doc(calendar.id).get().then((doc) => {
            Object.keys(doc.data().roles).forEach((uid) => {
                promises.push(
                    firebase.firestore().collection("users").doc(uid).get()
                );
            });
    
            var newRoles = [];
    
            Promise.all(promises).then((result) => {
                result.forEach((userDoc) => {
                    newRoles.push({
                        uid: userDoc.data().id,
                        email: userDoc.data().email,
                        role: calendar.roles[userDoc.data().id],
                    });
                });
                console.log("newRoles: ", newRoles);
                setExistingRoles(newRoles);
            });
        })
        
    };

    useEffect(() => {
        updateRoles();
    }, []);

    const getMyPermission = () => {
        return calendar.roles[firebase.auth().currentUser.uid];
    };

    const listItems = () => {
        console.log(existingRoles);
        var items = [];
        items = existingRoles.map((member, index) => {
            return (
                <List.Item
                    title={member.email}
                    description={member.role}
                    left={(props) => <List.Icon {...props} icon="account" />}
                    right={(props) =>
                        member.role != "owner" &&
                        getMyPermission() == "owner" && (
                            <IconButton
                                icon="delete"
                                size={26}
                                onPress={() => {
                                    console.log(member.uid);
                                    firebase
                                        .firestore()
                                        .collection("calendars")
                                        .doc(calendar.id)
                                        .set(
                                            {
                                                roles: {
                                                    [member.uid]: firebase.firestore.FieldValue.delete(),
                                                },
                                            },
                                            { merge: true }
                                        )
                                        .then(updateRoles())
                                        .catch((error) => {
                                            console.log(error);
                                        });
                                }}
                            />
                        )
                    }
                    key={index}
                />
            );
        });

        return items;
    };

    return (
        <ScrollView style={{flex: 1, backgroundColor: "white"}}>
            <View style={formStyles.formContainer}>
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
                        width: "100%",
                        justifyContent: "center",
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
                                alignItems: "center",
                            }}
                        >
                            <Text>{Strings.roCollab}</Text>
                            <RadioButton value={"collaborator"} />
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Text>{Strings.roView}</Text>
                            <RadioButton value={"viewer"} />
                        </View>
                    </RadioButton.Group>
                </View>
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

                            existingRoles.forEach((member) => {
                                if (email == member.email) {
                                    setEmailError(
                                        "This account is already added."
                                    );
                                    return;
                                }
                            });

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

            <ScrollView style={{width: "80%"}}>
                <List.Section>{listItems()}</List.Section>
            </ScrollView>
        </ScrollView>
    );
}
