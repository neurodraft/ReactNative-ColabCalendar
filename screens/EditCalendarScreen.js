import React, { useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { TextInput, HelperText, Button } from "react-native-paper";

import styles from "../styles/global";
import formStyles from "../styles/form";

import Strings from "../constants/strings";
import firebase from "../firebase";

export default function EditCalendarScreen({ route, navigation}) {

    const {calendar} = route.params;

    const [title, setTitle] = useState(calendar.title);
    const [titleError, setTitleError] = useState("");
    const [desc, setDesc] = useState(calendar.desc);

    return (
        <View style={styles.container}>

            <ScrollView style={formStyles.formContainer}>
                <View style={formStyles.formElement}>
                    <TextInput
                        mode="outlined"
                        label={Strings.calCalendarTitle}
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
                        label={Strings.calCalendarDesc}
                        value={desc}
                        onChangeText={(value) => setDesc(value)}
                        multiline={true}
                        numberOfLines={4}
                        //placeholder={Strings.evEventTitle}
                    />
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
                            setTitleError(Strings.calNoTitle);
                            return;
                        }

                        firebase
                            .firestore()
                            .collection("calendars")
                            .doc(calendar.id)
                            .set({
                                title: title,
                                desc: desc,
                                roles: calendar.roles,
                            })
                            .then(() => {
                                navigation.goBack();
                            })
                            
                    }}
                >
                    {Strings.calEditCal}
                </Button>
            </View>
        </View>
    );
}

