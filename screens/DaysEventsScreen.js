import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { List } from 'react-native-paper';
import firebase from '../firebase';

export default function DaysEventsScreen({route, navigation}) {

    const { day } = route.params;

    return (
        <View style={{
            backgroundColor : '#fff',
            flex : 1
        }}>
            <List.Section>
            <List.Subheader>{day.toDateString()}</List.Subheader>
            <List.Item title="First Item" left={() => <List.Icon icon="folder" />} />
            <List.Item
                title="Second Item"
                left={() => <List.Icon color="#000" icon="folder" />}
                />
            </List.Section>
        </View>
    )
}