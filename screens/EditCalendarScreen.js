import React, { useState } from "react";
import { Text, View, ScrollView } from "react-native";
import {
    TextInput,
    HelperText,
    Button,
    Paragraph,
    Dialog,
} from "react-native-paper";

import styles from "../styles/global";
import formStyles from "../styles/form";

import Strings from "../constants/strings";
import firebase from "../firebase";

export default function EditCalendarScreen({ route, navigation }) {
    const { calendar } = route.params;

    const [title, setTitle] = useState(calendar.title);
    const [titleError, setTitleError] = useState("");
    const [desc, setDesc] = useState(calendar.desc);
    const [dialogDelete, setDialogDelete] = useState({
        show: false,
        message: "",
    });

    const onDelete = () => {
        firebase
            .firestore()
            .collection("calendars")
            .doc(calendar.id)
            .delete()
            .then((deleted) => {
                setDialogDelete({
                    show: true,
                    message: Strings.deleted,
                });

                navigation.navigate("Calendar");
            })
            .catch(({ message }) => {
                setDialogDelete({
                    show: true,
                    message: message,
                });
            });
    };

    const getMyPermission = () => {
        return calendar.roles[firebase.auth().currentUser.uid];
    };

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
                <View>
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
                                });
                        }}
                    >
                        {Strings.genSave}
                    </Button>
                    {["owner"].some(
                        (c) => c == getMyPermission()
                    ) ? (
                        <Button
                            mode="contained"
                            style={{ marginTop: 10 }}
                            onPress={() =>
                                setDialogDelete({
                                    show: true,
                                    message: Strings.isDelete,
                                })
                            }
                        >
                            {Strings.genRemove}
                        </Button>
                    ) : null}
                </View>
            </View>
            <Dialog
                visible={dialogDelete.show}
                onDismiss={() =>
                    setDialogDelete({ ...dialogDelete, show: false })
                }
            >
                <Dialog.Title>{Strings.warning}</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>{dialogDelete.message}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button
                        onPress={() =>
                            setDialogDelete({ ...dialogDelete, show: false })
                        }
                    >
                        {Strings.genNo}
                    </Button>
                    <Button onPress={() => onDelete()}>{Strings.genYes}</Button>
                </Dialog.Actions>
            </Dialog>
        </View>
    );
}
