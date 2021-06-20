import React, { useState, useEffect } from "react";
import { Text, View, Platform, ScrollView } from "react-native";
import {
    Title,
    TextInput,
    HelperText,
    Button,
    Snackbar,
    List,
    Switch,
    RadioButton
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

import styles from "../styles/global";
import formStyles from "../styles/form";
import Strings from "../constants/strings";
import firebase from "../firebase";

export default function CopyEventScreen({ route, navigation }) {

    const { day, calendar, event } = route.params;

    const [snackbar, setSnackbar] = useState({ visible: false, message: "" });

    const [titleError, setTitleError] = useState("");
    const [title, setTitle] = useState(event.title);

    var initialDate = new Date(day);

    initialDate.setSeconds(0);

    const [date, setDate] = useState(initialDate);

    const [datePickerVisible, setDatePickerVisible] = useState(false);

    const [desc, setDesc] = useState(event.desc ? event.desc : '');

    const [calendars, setCalendars] = useState([]);

    const [calendarId, setCalendarId] = useState(null)

    useEffect(() => {
        firebase
        .firestore()
        .collection("calendars")
        .where(`roles.${firebase.auth().currentUser.uid}`, "in", [
            "owner",
            "collaborator"
        ]).get()
        .then(querySnapshot => {

            const c = [];
            querySnapshot.forEach(q => {
                const data = q.data();
               if(q.id != calendar.id)c.push({...q.data(), id : q.id, selected : false})
            })

            setCalendars(c);
        })
    }, [])

    const onClone = () => {

      if(!calendarId){
        setSnackbar({ visible: true, message: "Selecione um calendario" });
        return;
      }

      firebase
      .firestore()
      .collection("calendars")
      .doc(calendarId)
      .collection('events')
      .add({
          title, 
          desc, 
          date
      })
      .then(cloned => {
            navigation.navigate("Day's Events", {
                day: day,
                calendar:calendar,
            })
      }).catch(({message}) => {

        setSnackbar({ visible: true, message: message });
      })
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
                <View>     
                    <Title>Selecione um calendario para copiar</Title>               
                    <RadioButton.Group onValueChange={newValue => setCalendarId(newValue)} value={calendarId}>
                        {calendars.map((c, i) => {                       
                            return (
                                <View key={i}>
                                    <Text>{c.title}</Text>
                                    <RadioButton value={c.id} />
                                </View>
                            )
                        })}                   
                    </RadioButton.Group>
                  
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
                        onClone()
                    }}
                >
                    Clonar
                </Button>
            </View>
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
