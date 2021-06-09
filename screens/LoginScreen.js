import React, {useState} from 'react';
import {View, Text, Button, TextInput, CheckBox} from 'react-native';

import firebase from '../firebase'

import styles from '../styles/global'

export default function LoginScreen({navigation}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    //firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

    return (
        <View style={styles.container}>
            <View style={styles.inputView} >
                <TextInput  
                    style={styles.inputText}
                    placeholder="Email" 
                    onChangeText={text => setEmail(text)}/>
                
                
            </View>
            <View style={styles.inputView} >
                <TextInput  
                        style={styles.inputText}
                        secureTextEntry={true}
                        placeholder="Password" 
                        onChangeText={text => setPassword(text)}/>
            </View>
            <View>
                <CheckBox
                    value={rememberMe}
                    onValueChange={(value) => {
                        setRememberMe(value);

                        if(value) firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
                        else firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
                    }}
                />
                <Text>Remember me?</Text>
            </View>
            <Button
                title="Login"
                onPress={() => {
                    firebase.auth()
                    .signInWithEmailAndPassword(email, password)
                    .then(() => {
                        console.log('User signed in anonymously');
                    })
                    .catch(error => {
                        if (error.code === 'auth/operation-not-allowed') {
                        console.log('Enable anonymous in your firebase console.');
                        }

                        console.error(error);
                    });

                }}/>
            <Button
                title="Sign Up"
                onPress={() => {
                    navigation.navigate('Sign Up')
                }}
            />
           
        </View>
    )
}