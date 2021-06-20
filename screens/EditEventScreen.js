import React, { useState } from "react";
import { Text, View, Platform, ScrollView } from "react-native";
import {
    Title,
    TextInput,
    HelperText,
    Button,
    Snackbar
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

import styles from "../styles/global";
import formStyles from "../styles/form";
import Strings from "../constants/strings";
import firebase from "../firebase";

export default function EditEventScreen({ route, navigation }) {

    const { day, calendar, event } = route.params;

    const [snackbar, setSnackbar] = useState({ visible: false, message: "" });

    const [titleError, setTitleError] = useState("");
    const [title, setTitle] = useState(event.title);

    var initialDate = new Date(day);

    initialDate.setSeconds(0);

    const [date, setDate] = useState(initialDate);

    const [datePickerVisible, setDatePickerVisible] = useState(false);

    const [desc, setDesc] = useState(event.desc);

    const onEditEvent = () => {

        firebase
        .firestore()
        .collection("calendars")
        .doc(calendar.id)
            .collection("events")
            .doc(event.id)
            .set({
                date, title, desc
            }).then(ok => {

                setSnackbar({
                    visible : !0,
                    message : Strings.edited
                })
                navigation.navigate("Day's Events", {
                    day: day,
                    calendar:calendar,
                })
            })
            .catch(({message}) =>  setSnackbar({
                visible : !0,
                message : message
            }))
    }

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

                        onEditEvent()
                    }}
                >
                    {Strings.evEditEvent}
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
            <Snackbar
                visible={snackbar.visible}
                onDismiss={() => setSnackbar({ visible: false, message: "" })}
                action={{
                    label: "Close",
                    onPress: () => {
                        // Do something
                    },
                }}
            >
                {snackbar.message}
            </Snackbar>
        </View>
    );
}
