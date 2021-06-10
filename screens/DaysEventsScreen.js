import React, {Component, useState} from 'react';
import {View, Text, Button} from 'react-native';

import MyCalendar from '../components/MyCalendar';

import styles from '../styles/global';

export default function DaysEventsScreen({route, navigation}) {

    const { day } = route.params;
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
    <View style={styles.container}>
        <Text style = {{
            textAlign: 'center',
            fontSize: 24,
            fontWeight: 'bold'
        }}>
            {day.toDateString()}
        </Text>

        <Button
            title="New Event"
            onPress={() => {
                navigation.navigate('New Event', {day: day});
            }}
        />
    </View>
    )
}