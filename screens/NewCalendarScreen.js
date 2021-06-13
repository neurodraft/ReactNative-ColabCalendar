import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import FormFieldComponent from "../components/FormFieldComponent";

import styles from "../styles/global";

export default function NewCalendarScreen({ route, navigation }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (
        <View style={styles.container}>
            <Text>New Calendar</Text>

            <FormFieldComponent
                fieldTitle="Title:"
                placeholder="Calendar's title"
                setText={(text) => {
                    setTitle(text);
                }}
            />

            <FormFieldComponent
                fieldTitle="Description:"
                placeholder="Calendar's description"
                setText={(text) => {
                    setDescription(text);
                }}
                isMultiline={true}
            />
        </View>
    );
}
