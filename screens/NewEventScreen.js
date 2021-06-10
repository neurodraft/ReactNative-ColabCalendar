import React from "react";
import { Text, TextInput, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';


import styles from "../styles/global";

export default function NewEventScreen({ route, navigation }) {

    const {day} = route.params;

    return (
        <View style={styles.container}>
            <Text>New Event</Text>

            <Text>Title:</Text>
            <TextInput placeholder="Event Title" />

            <Text>Description:</Text>
            <TextInput placeholder="Event Description" multiline={true} />

            <Text>Date:</Text>
            <Text>{day.toDateString()}</Text>
            {/*<DateTimePicker value={day} mode='date'/>*/}
        </View>
    );
}
