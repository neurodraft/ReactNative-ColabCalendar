import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
//import { Button } from 'react-native-paper';

import styles from '../styles/global'
import firebase from '../firebase'
import Strings from "../constants/strings";


class SettingsScreen extends Component {

    render() {
        return(
            <View style={styles.container}>
                
                <Text>
                    {Strings.setSettingsScreen}
                </Text>
                
                <Button 
                    title={Strings.logLogOut}
                    onPress={() => {
                        firebase.auth().signOut();
                    }}
                />
            </View>
        )
    }

}

export default SettingsScreen;