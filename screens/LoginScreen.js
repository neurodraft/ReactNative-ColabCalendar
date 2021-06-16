import React, {useState} from 'react';
import { View } from 'react-native';
import { Snackbar, Title, TextInput, Button} from "react-native-paper";

import firebase from '../firebase';

import styles from "../styles/global";

export default function LoginScreen({navigation}){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [snackbar, setSnackbar] = useState({ visible: false, message: "" });

    const logIn = () =>  firebase.auth()
            .signInWithEmailAndPassword(email, password)
                .then(ok => console.log(ok))
                .catch(({message}) => setSnackbar({
                        visible: true,
                        message: message,
                    })
                );

    return (
        <View style={styles.fullPageContainer}>
        
            <View style={{marginBottom : 20, alignItems: 'center'}}>
                <Title>Login</Title>
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
                    value={password}
                    secureTextEntry={true}
                    style={{marginBottom : 10}}
                    onChangeText={v => setPassword(v)}
                />
                
            </View>
            <View style={{marginBottom : 20}}>
                <Button mode="contained" onPress={() => logIn()}>
                    Log in
                </Button>
            </View>
            <View style={{marginBottom : 20}}>
                <Button mode="text" onPress={() => navigation.navigate('signup')}>
                    Sign up
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
                }}>
                {snackbar.message}
            </Snackbar>
        </View>
    )
}