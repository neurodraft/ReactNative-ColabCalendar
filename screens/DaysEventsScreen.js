import React, { Component, useState } from "react";
import { render } from "react-dom";
import { View, Text, Button } from "react-native";
import { List } from "react-native-paper";
import firebase from "../firebase";

export default class DaysEventsScreen extends Component {
    unsubscribeListener;


    constructor(props) {
        super(props);

        this.state = {
            events: [],
        };
    }

    componentDidMount() {

        const day = new Date(this.props.route.params.day);
        var start = new Date(day.getFullYear(), day.getMonth(), day.getDate());
        var end = new Date(day.getFullYear(), day.getMonth(), day.getDate() - 1);

        this.unsubscribeListener = firebase
            .firestore()
            .collection("calendars")
            .doc(this.props.route.params.calendar.id)
            .collection("events", ref => ref
            .where('date', '>', start)
            .where('date', '<', end))
            .orderBy("date", 'asc')
            .onSnapshot((querySnapshot) => {
                var newEvents = [];
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    newEvents = [...newEvents, { ...doc.data(), id: doc.id }];
                });
                this.setState({
                    ...this.state,
                    events: newEvents,
                });
            });
    }

    componentWillUnmount() {
        if (!!this.unsubscribeListener) {
            this.unsubscribeListener();
        }
    }

    render() {
        const { route, navigation } = this.props;
        const { day, calendar } = route.params;

        var items = [];
        items = this.state.events.map((event, index) => {
            var date = event.date.toDate();
            return (
                <List.Item
                    title={event.title}
                    description={event.desc}
                    left={props => <List.Icon {...props} icon="calendar-clock" />}
                    right={props => <Text style={{textAlignVertical: "center"}}{...props}>{`${date.getHours()}:${date.getMinutes()}`}</Text>}
                />
            );
        });

        return (
            <View
                style={{
                    backgroundColor: "#fff",
                    flex: 1,
                }}
            >
                <Button
                    title="New Event"
                    onPress={() => {
                        navigation.navigate("New Event", {
                            day: day,
                            calendar: calendar,
                        });
                    }}
                />
                <List.Section>
                    {items}
                </List.Section>
            </View>
        );
    }
}
