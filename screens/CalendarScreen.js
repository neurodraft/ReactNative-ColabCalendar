import React, {Component} from 'react';
import {View, Text} from 'react-native';

import MyCalendar from '../components/MyCalendar';

import styles from '../styles/global';

export default function CalendarScreen() {

    const months = ["January", "February", "March", "April", 
    "May", "June", "July", "August", "September", "October", 
    "November", "December"];

    var today = new Date();

    return (
    <View style={styles.container}>
        <Text style = {{
            textAlign: 'center',
            fontSize: 24,
            fontWeight: 'bold'
        }}>
            {months[today.getMonth()]} &nbsp;
            {today.getFullYear()}
        </Text>
        <MyCalendar today={today}/>
    </View>
    )
}