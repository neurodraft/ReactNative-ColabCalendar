import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { List } from 'react-native-paper';
import firebase from '../firebase';
import Strings from "../constants/strings";

export default function InvitesScreen({route, navigation}) {



    return (
        <View style={{
            backgroundColor : '#fff',
            flex : 1
        }}>
            
            <List.Section>
            <List.Subheader>{Strings.invCollab}</List.Subheader>
            <List.Item title="First Item" left={() => <List.Icon icon="folder" />} />
            <List.Item
                title="Second Item"
                left={() => <List.Icon color="#000" icon="folder" />}
                />
            <List.Subheader>{Strings.invView}</List.Subheader>
            <List.Item title="First Item" left={() => <List.Icon icon="folder" />} />
            <List.Item
                title="Second Item"
                left={() => <List.Icon color="#000" icon="folder" />}
                />
            </List.Section>
        </View>
    )
}