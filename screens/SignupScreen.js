
import React, { useState } from "react";
import { View} from "react-native";
import { Snackbar, Title, TextInput, Button} from "react-native-paper";

import firebase from "../firebase";
import Calendar from '../services/Calendar';

import styles from "../styles/global";

export default function SignupScreen({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [snackbar, setSnackbar] = useState({ visible: false, message: "" });

    const signUp = () => {

        if([email, password, verifyPassword].some(input => !input))return setSnackbar({
            visible: true,
            message: "Campos em branco",
        });

        if(password != verifyPassword) {
            return setSnackbar({
                visible: true,
                message: "A confirmação da senha não corresponde",
            });
        }

        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                   
                    Calendar.new({
                        title: "My Calendar",
                        description: "My Personal Calendar",
                        roles: {
                            [userCredential.user.uid] : 'owner'
                        }
                    }).then(created => {

                    }).catch(({message}) => setSnackbar({
                        visible: true,
                        message: message,
                    }));

                })
                .catch(({message}) => setSnackbar({
                        visible: true,
                        message: message,
                    }));
    }

    return (
        <View style={styles.fullPageContainer}>
              <View style={{marginBottom : 20, alignItems: 'center'}}>
                <Title>Sign up</Title>
            </View>
            <View style={{marginBottom : 20}}>              
                <TextInput
                    mode="outlined"
                    label="Email..."
                    value={email}
                    style={{marginBottom : 10}}
                    onChangeText={v => setEmail(v)}
                />
                <TextInput
                    mode="outlined"
                    label="Password..."
                    secureTextEntry={true}
                    value={password}
                    style={{marginBottom : 10}}
                    onChangeText={v => setPassword(v)}
                />                
                 <TextInput
                    mode="outlined"
                    label="Verify password..."
                    secureTextEntry={true}
                    value={verifyPassword}
                    onChangeText={v => setVerifyPassword(v)}
                />                
            </View>
            <View style={{marginBottom : 20}}>
                <Button mode="contained" onPress={() => signUp()}>
                    Sign up
                </Button>
            </View>
            <View style={{marginBottom : 20}}>
                <Button mode="text" onPress={() => navigation.navigate('login')}>
                    Log in
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
