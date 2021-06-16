import React, { useState } from "react";
import { Text, View } from "react-native";
import { TextInput, HelperText, Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

import styles from "../styles/global";
import formStyles from "../styles/form";
import Strings from "../constants/strings";
import firebase from "../firebase";

export default function NewEventScreen({ route, navigation }) {
    const { day } = route.params;

    const [titleError, setTitleError] = useState("");
    const [title, setTitle] = useState("");

    const [desc, setDesc] = useState("");

    return (
        <View style={styles.container}>
            <View style={formStyles.formContainer}>
                <View style={formStyles.formElement}>
                    <TextInput
                        mode="outlined"
                        label={Strings.evEventTitle}
                        error={titleError != ""}
                        value={title}
                        onChangeText={(value) => setTitle(value)}
                        //placeholder={Strings.evEventTitle}
                    />
                    <HelperText type="error" visible={titleError != ""}>{titleError}</HelperText>
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
                        value={day.toDateString()}
                        disabled={true}
                    />
                </View>
            </View>

            <View style={formStyles.formButtons}>
                <Button
                    mode="contained"
                    onPress={() => {
                        if (title == "") {
                            setTitleError(Strings.evNoTitle);
                            return;
                        }
                    }}
                >
                    {Strings.evCreateEvent}
                </Button>
            </View>

            {/*<DateTimePicker value={day} mode='date'/>*/}
        </View>
    );
}
