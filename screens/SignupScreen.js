import React, {useState} from 'react';
import {View, Text, Button, TextInput, CheckBox} from 'react-native';
import {Snackbar} from 'react-native-paper';

import firebase from '../firebase'

import styles from '../styles/global'

export default function SignupScreen({navigation}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [snackbar, setSnackbar] = useState({visible: false, message: ''});

    return (
        <View style={styles.container}>
            <View style={styles.inputView} >
                <TextInput  
                    style={styles.inputText}
                    placeholder="Email" 
                    //placeholderTextColor="#003f5c"
                    onChangeText={text => setEmail(text)}/>
                
                
            </View>
            <View style={styles.inputView} >
                <TextInput  
                        style={styles.inputText}
                        secureTextEntry={true}
                        placeholder="Password" 
                        //placeholderTextColor="#003f5c"
                        onChangeText={text => setPassword(text)}/>
            </View>
            <View style={styles.inputView} >
                <TextInput  
                        style={styles.inputText}
                        secureTextEntry={true}
                        placeholder="Verify password" 
                        //placeholderTextColor="#003f5c"
                        onChangeText={text => setPassword(text)}/>
            </View>

            <Button
                title="Sign Up"
                onPress={() => {
                    firebase.auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(() => {
                        console.log('User signed up');
                        
                    })
                    .catch(error => {
                        if (error.code === 'auth/operation-not-allowed') {
                        console.log('Enable anonymous in your firebase console.');
                        }

                        console.error(error);
                        setSnackbar({visible: true, message: error.message});
                    });

                }}/>
            <Button
                title="Return to Login"
                onPress={() => {
                    navigation.goBack()
                }}
            />
           <Snackbar
                visible={snackbar.visible}
                onDismiss={() => (setSnackbar({visible: false, message: ''}))}
                action={{
                    label: 'Close',
                    onPress: () => {
                        // Do something
                    },
                }}>
                {snackbar.message}
            </Snackbar>
        </View>
    )
}