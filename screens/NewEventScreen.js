import React, { useState } from "react";
import { Text, View, Platform, ScrollView } from "react-native";
import {
    Title,
    TextInput,
    HelperText,
    Button,
    Switch,
    RadioButton,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

import styles from "../styles/global";
import formStyles from "../styles/form";
import Strings from "../constants/strings";
import firebase from "../firebase";

import * as Notifications from "expo-notifications";

export default function NewEventScreen({ route, navigation }) {
    const { day, calendar } = route.params;

    const [titleError, setTitleError] = useState("");
    const [title, setTitle] = useState("");

    var initialDate = new Date(day);
    initialDate.setSeconds(0);

    const [date, setDate] = useState(initialDate);

    const [datePickerVisible, setDatePickerVisible] = useState(false);

    const [remindMe, setRemindMe] = useState(false);
    const [minutesBefore, setMinutesBefore] = useState(0);

    const [desc, setDesc] = useState("");

    return (
        <View style={styles.container}>
            <ScrollView
                style={formStyles.formContainer}
                contentContainerStyle={{ alignItems: "center" }}
            >
                <View style={formStyles.formElement}>
                    <TextInput
                        mode="outlined"
                        label={Strings.evEventTitle}
                        error={titleError != ""}
                        value={title}
                        onChangeText={(value) => setTitle(value)}
                        //placeholder={Strings.evEventTitle}
                    />
                    <HelperText type="error" visible={titleError != ""}>
                        {titleError}
                    </HelperText>
                </View>

                <View style={formStyles.formElement}>
                    <TextInput
                        mode="outlined"
                        label={Strings.evEventDesc}
                        value={desc}
                        onChangeText={(value) => setDesc(value)}
                        multiline={true}
                        numberOfLines={4}
                        //placeholder={Strings.evEventTitle}
                    />
                </View>

                <View style={formStyles.formElement}>
                    <TextInput
                        mode="outlined"
                        label={Strings.evEventDate}
                        value={`${date.toDateString()} - ${date.toLocaleTimeString()}`}
                        disabled={true}
                    />
                    <Button
                        onPress={() => {
                            setDatePickerVisible(true);
                        }}
                    >
                        Set Time
                    </Button>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                    }}
                >
                    <Title>Remind me</Title>
                    <Switch style={{marginTop : 8, marginLeft : 10}}
                        value={remindMe}
                        onValueChange={(value) => setRemindMe(value)}
                    />
                </View>
                {remindMe && (
                    <View
                        style={{
                            marginTop: 20,
                            width: "60%",
                        }}
                    >
                        <RadioButton.Group
                            onValueChange={(value) => setMinutesBefore(value)}
                            value={minutesBefore}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Text style={{ textAlignVertical: "center" }}>
                                    On Time
                                </Text>
                                <RadioButton value={0} />
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Text style={{ textAlignVertical: "center" }}>
                                    5 Minutes Before
                                </Text>
                                <RadioButton value={5} />
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Text style={{ textAlignVertical: "center" }}>
                                    15 Minutes Before
                                </Text>
                                <RadioButton value={15} />
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Text style={{ textAlignVertical: "center" }}>
                                    30 Minutes Before
                                </Text>
                                <RadioButton value={30} />
                            </View>
                        </RadioButton.Group>
                    </View>
                )}
            </ScrollView>

            <View style={formStyles.formButtons}>
                <Button
                    mode="contained"
                    color="grey"
                    labelStyle={{ color: "white" }}
                    onPress={() => {
                        navigation.navigate("Day's Events", {
                            day: day,
                            calendar:calendar,
                            refresh : true,
                        })
                    }}
                >
                    {Strings.genCancel}
                </Button>

                <Button
                    mode="contained"
                    onPress={() => {
                        if (title == "") {
                            setTitleError(Strings.evNoTitle);
                            return;
                        }

                        firebase
                            .firestore()
                            .collection("calendars")
                            .doc(calendar.id)
                            .collection("events")
                            .add({
                                title: title,
                                desc: desc,
                                date: date,
                            })
                            .then(async (docRef) => {
                                console.log(
                                    "Document written with ID: ",
                                    docRef.id
                                );

                                if (remindMe) {
                                    var secondsUntilReminder =
                                        Math.floor(
                                            (date.getTime() -
                                                new Date().getTime()) / 1000
                                        ) - (minutesBefore * 60) + 1;

                                    console.log(secondsUntilReminder);

                                    const identifier = await Notifications.scheduleNotificationAsync(
                                        {
                                            content: {
                                                title: title,
                                                body: `In ${minutesBefore} minutes...`,
                                                data: {},
                                            },
                                            trigger: {
                                                seconds: secondsUntilReminder,
                                            },
                                        }
                                    );

                                    firebase
                                        .firestore()
                                        .collection("users")
                                        .doc(firebase.auth().currentUser.uid)
                                        .collection("reminders")
                                        .add({
                                            eventId: docRef.id,
                                            userId: firebase.auth().currentUser
                                                .uid,
                                            identifier: identifier,
                                        })
                                        .then(ok => navigation.navigate("Day's Events", {
                                            day: day,
                                            calendar:calendar
                                        }))
                                }else {

                                    navigation.navigate("Day's Events", {
                                        day: day,
                                        calendar:calendar
                                    });
                                }

                            })
                            .catch((error) => {
                                console.error("Error adding document: ", error);
                            });
                    }}
                >
                    {Strings.evCreateEvent}
                </Button>
            </View>

            {Platform.OS !== "web" && datePickerVisible && (
                <DateTimePicker
                    value={date}
                    mode="time"
                    onChange={(event, selectedDate) => {
                        setDatePickerVisible(false);
                        setDate(selectedDate || date);
                    }}
                />
            )}

            {/*<DateTimePicker value={day} mode='date'/>*/}
        </View>
    );
}
