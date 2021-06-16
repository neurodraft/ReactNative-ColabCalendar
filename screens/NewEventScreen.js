import React, { useState } from "react";
import { Text, View, Platform, ScrollView } from "react-native";
import { TextInput, HelperText, Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

import styles from "../styles/global";
import formStyles from "../styles/form";
import Strings from "../constants/strings";
import firebase from "../firebase";

export default function NewEventScreen({ route, navigation }) {
    const { day, calendar } = route.params;

    const [titleError, setTitleError] = useState("");
    const [title, setTitle] = useState("");
    
    var initialDate = new Date(day);
    initialDate.setSeconds(0);

    const [date, setDate] = useState(initialDate);

    const [datePickerVisible, setDatePickerVisible] = useState(false);

    const [desc, setDesc] = useState("");

    return (
        <View style={styles.container}>
            <ScrollView style={formStyles.formContainer}>
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
                        navigation.goBack();
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
                            .then((docRef) => {
                                console.log(
                                    "Document written with ID: ",
                                    docRef.id
                                );
                                navigation.goBack();
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
