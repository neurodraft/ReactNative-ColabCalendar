
import React, { useState } from "react";
import { View} from "react-native";
import { Snackbar, Title, TextInput, Button} from "react-native-paper";

import firebase from "../firebase";
import Calendar from '../services/Calendar';
import User from "../services/User";
import Strings from "../constants/strings";
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
                    User.new(userCredential.user.uid, {
                        id: userCredential.user.uid,
                        email: email
                    });
                    

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
                <Title>{Strings.logSignUp}</Title>
            </View>
            <View style={{marginBottom : 20}}>              
                <TextInput
                    mode="outlined"
                    label={Strings.logEmailLabel}
                    value={email}
                    style={{marginBottom : 10}}
                    onChangeText={v => setEmail(v)}
                />
                <TextInput
                    mode="outlined"
                    label={Strings.logPasswordLabel}
                    secureTextEntry={true}
                    value={password}
                    style={{marginBottom : 10}}
                    onChangeText={v => setPassword(v)}
                />                
                 <TextInput
                    mode="outlined"
                    label={Strings.logVerifyPasswordLabel}
                    secureTextEntry={true}
                    value={verifyPassword}
                    onChangeText={v => setVerifyPassword(v)}
                />                
            </View>
            <View style={{marginBottom : 20}}>
                <Button mode="contained" onPress={() => signUp()}>
                    {Strings.logSignUp}
                </Button>
            </View>
            <View style={{marginBottom : 20}}>
                <Button mode="text" onPress={() => navigation.navigate('login')}>
                    {Strings.logLoginButton}
                </Button>
            </View>
            <Snackbar
                visible={snackbar.visible}
                onDismiss={() => setSnackbar({ visible: false, message: "" })}
                action={{
                    label: Strings.genClose,
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
