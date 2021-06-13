import React from "react";
import { View, Text, TextInput } from "react-native";

import styles from "../styles/form";

export default function FormFieldComponent({fieldTitle, placeholder, setText, isMultiline = false}) {

    return (
        <View>
            <Text>{fieldTitle}</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder={placeholder}
                    onChangeText={(text) => setText(text)}
                    multiline={isMultiline}
                />
            </View>
        </View>
    );
}
