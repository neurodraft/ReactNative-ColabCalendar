import React, {useState} from 'react';
import { View } from 'react-native';
import { Snackbar, Title, TextInput, Button} from "react-native-paper";

import firebase from '../firebase';
import Strings from "../constants/strings";
import styles from "../styles/global";

export default function LoginScreen({navigation}){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [snackbar, setSnackbar] = useState({ visible: false, message: "" });

    return (
        <View style={styles.fullPageContainer}>

            <View style={{marginBottom : 20, alignItems: 'center'}}>
                <Title>{Strings.logLogin}</Title>
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
                    value={password}
                    secureTextEntry={true}
                    style={{marginBottom : 10}}
                    onChangeText={v => setPassword(v)}
                />
                
            </View>
            <View style={{marginBottom : 20}}>
                <Button mode="contained" onPress={() => {
                    firebase.auth()
                    .signInWithEmailAndPassword(email, password)
                        .then(ok => console.log(ok))
                        .catch(({message}) => setSnackbar({
                                visible: true,
                                message: message,
                            })
                        );
                }}>
                    {Strings.logLoginButton}
                </Button>
            </View>
            <View style={{marginBottom : 20}}>
                <Button mode="text" onPress={() => navigation.navigate('signup')}>
                    {Strings.logSignUp}
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
                }}>
                {snackbar.message}
            </Snackbar>
        </View>
    )
}