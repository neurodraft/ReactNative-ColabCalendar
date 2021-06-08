import React, {Component} from 'react';
import {View, Text} from 'react-native';

import styles from '../styles/global'

class SettingsScreen extends Component {

    render() {
        return(
            <View style={styles.container}>
                <Text>
                    Settings Screen.
                </Text>
            </View>
        )
    }

}

export default SettingsScreen;