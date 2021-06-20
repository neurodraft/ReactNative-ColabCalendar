import React, { useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { TextInput, HelperText, Button, Paragraph, Dialog } from "react-native-paper";

import styles from "../styles/global";
import formStyles from "../styles/form";

import Strings from "../constants/strings";
import firebase from "../firebase";

export default function CopyCalendarScreen({ route, navigation}) {

    const {calendar} = route.params;

    const [title, setTitle] = useState(`Copy - ${calendar.title}`);
    const [titleError, setTitleError] = useState("");
    const [desc, setDesc] = useState(calendar.desc);
    const [dialogDelete, setDialogDelete] = useState({ show: false, message: "" })


    const currentUID = firebase.auth().currentUser.uid;

    const copyCalendar = () => {

        const copyCalendar = {
            title : title,
            description : desc,
            id_user : currentUID,
            roles : {
                [currentUID] : 'owner'
            }
        }

        firebase
            .firestore()
            .collection("calendars")
            .add(copyCalendar)
            .then((docRef) => {               
                navigation.navigate("Calendar");
            })
            .catch((error) => {
                setDialogDelete({show : true, message : error.message})
            });
    }

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

                            copyCalendar();
                        }}
                    >
                           {Strings.genSave}
                    </Button>
                </View>                   
            </View>
            <Dialog visible={dialogDelete.show} onDismiss={() => this.currentId = null}>
                    <Dialog.Title>{Strings.warning}</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>{dialogDelete.message}</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setDialogDelete({...dialogDelete, show : false})}>Cancelar</Button>
                        <Button onPress={() => onDelete()}>{Strings.genYes}</Button>
                    </Dialog.Actions>
                </Dialog>
        </View>
    );
}

