import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { List } from 'react-native-paper';
import firebase from '../firebase';

export default function DaysEventsScreen({route, navigation}) {

    const { day, calendar} = route.params;

    const date = new Date(day)

    return (
        <View style={{
            backgroundColor : '#fff',
            flex : 1
        }}>
             <Button
            title="New Event"
                onPress={() => {
                    navigation.navigate('New Event', {day: day, calendar: calendar});
                }}
            />
            <List.Section>
            <List.Subheader>{date.toDateString()}</List.Subheader>
            <List.Item title="First Item" left={() => <List.Icon icon="folder" />} />
            <List.Item
                title="Second Item"
                left={() => <List.Icon color="#000" icon="folder" />}
                />
            </List.Section>
        </View>
    )
}