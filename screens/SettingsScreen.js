import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
//import { Button } from 'react-native-paper';

import styles from '../styles/global'
import firebase from '../firebase'


class SettingsScreen extends Component {

    render() {
        return(
            <View style={styles.container}>
                
                <Text>
                    Settings Screen.
                </Text>
                
                <Button 
                    title="Logout"
                    onPress={() => {
                        firebase.auth().signOut();
                    }}
                />
            </View>
        )
    }

}

export default SettingsScreen;