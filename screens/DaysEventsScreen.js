import React, { Component } from "react";

import { View, Text, ScrollView } from "react-native";
import {
    List,
    Button,
    IconButton,
    Paragraph,
    Dialog,
    Snackbar,
} from "react-native-paper";
import firebase from "../firebase";
import Strings from "../constants/strings";
import styles from "../styles/global";

export default class DaysEventsScreen extends Component {
    unsubscribeListener;
    currentId;

    constructor(props) {
        super(props);

        this.state = {
            events: [],
            showDialogDelete: false,
            snackbar: { visible: false, message: "" },
        };
    }

    getMyPermission() {
        return this.props.route.params.calendar.roles[
            firebase.auth().currentUser.uid
        ];
    }

    componentDidMount() {
        const day = new Date(this.props.route.params.day),
            start = new Date(day.getFullYear(), day.getMonth(), day.getDate()),
            end = new Date(
                day.getFullYear(),
                day.getMonth(),
                day.getDate(),
                23,
                59,
                59
            );

        this.unsubscribeListener = firebase
            .firestore()
            .collection("calendars")
            .doc(this.props.route.params.calendar.id)
            .collection("events")
            .where("date", ">=", start)
            .where("date", "<=", end)
            .orderBy("date", "desc")
            .onSnapshot((querySnapshot) => {
                let newEvents = [];

                querySnapshot.forEach(
                    (doc) =>
                        (newEvents = [
                            ...newEvents,
                            { ...doc.data(), id: doc.id },
                        ])
                );

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

    onEditEvent(event) {
        this.props.navigation.navigate("edit-event", {
            calendar: this.props.route.params.calendar,
            day: this.props.route.params.day,
            event: event,
        });
    }

    renderResults() {
        let items = [];

        items = this.state.events.map((event, index) => {
            const date = event.date.toDate();
            return (
                <List.Item
                    title={event.title}
                    description={
                        event.desc.length > 20
                            ? `${event.desc.substr(0, 20)}...`
                            : event.desc
                    }
                    left={(props) => (
                        <List.Icon {...props} icon="calendar-clock" />
                    )}
                    key={index}
                    right={(props) => (
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    paddingRight: 10,
                                }}
                            >
                                {["owner", "collaborator"].some(
                                    (c) => c == this.getMyPermission()
                                ) ? (
                                    <IconButton
                                        icon="pencil"
                                        size={16}
                                        onPress={() => this.onEditEvent(event)}
                                    />
                                ) : null}
                                {["owner", "collaborator"].some(
                                    (c) => c == this.getMyPermission()
                                ) ? (
                                    <IconButton
                                        icon="delete"
                                        size={16}
                                        onPress={() => {
                                            this.currentId = event.id;
                                            this.setState({
                                                ...this.state,
                                                showDialogDelete: true,
                                            });
                                        }}
                                    />
                                ) : null}
                                <IconButton
                                    icon="calendar-multiple"
                                    size={16}
                                    onPress={() =>
                                        this.props.navigation.navigate(
                                            "copy-event",
                                            {
                                                calendar: this.props.route
                                                    .params.calendar,
                                                day: this.props.route.params
                                                    .day,
                                                event: event,
                                            }
                                        )
                                    }
                                />
                            </View>
                            <View>
                                <Text
                                    {...props}
                                >{`${date.getHours()}:${date.getMinutes()}`}</Text>
                            </View>
                        </View>
                    )}
                />
            );
        });

        return items.length ? (
            <ScrollView>
                <List.Section>{items}</List.Section>
            </ScrollView>
        ) : (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>{Strings.emptyResults}</Text>
            </View>
        );
    }

    onDeleteEvent() {
        firebase
            .firestore()
            .collection("calendars")
            .doc(this.props.route.params.calendar.id)
            .collection("events")
            .doc(this.currentId)
            .delete()
            .then((deleted) => {
                this.setState({
                    ...this.state,
                    snackbar: {
                        visible: true,
                        message: Strings.deleted,
                    },
                    showDialogDelete: false,
                });

                this.currentId = null;
            })
            .catch(({ message }) => {
                this.setState({
                    ...this.state,
                    snackbar: {
                        visible: true,
                        message: message,
                    },
                    showDialogDelete: false,
                });
            });
    }

    render() {
        const { route, navigation } = this.props;
        const { day, calendar } = route.params;

        return (
            <View
                style={{
                    backgroundColor: "#fff",
                    flex: 1,
                }}
            >
                {this.renderResults()}

                {["owner", "collaborator"].some(
                    (c) => c == this.getMyPermission()
                ) ? (
                    <View style={{ margin: 20 }}>
                        <Button
                            mode="contained"
                            onPress={() => {
                                navigation.navigate("New Event", {
                                    day: day,
                                    calendar: calendar,
                                });
                            }}
                        >
                            {Strings.evNewEvent}
                        </Button>
                    </View>
                ) : null}
                <Dialog
                    visible={this.state.showDialogDelete}
                    onDismiss={() => (this.currentId = null)}
                >
                    <Dialog.Title>{Strings.warning}</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>{Strings.isDelete}</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            onPress={() =>
                                this.setState({
                                    ...this.state,
                                    showDialogDelete: false,
                                })
                            }
                        >
                            Cancelar
                        </Button>
                        <Button onPress={() => this.onDeleteEvent()}>
                            {Strings.genYes}
                        </Button>
                    </Dialog.Actions>
                </Dialog>
                <Snackbar
                    visible={this.state.snackbar.visible}
                    onDismiss={() =>
                        this.setState({
                            ...this.state,
                            snackbar: {
                                ...this.state.snackbar,
                                visible: false,
                            },
                        })
                    }
                    action={{
                        label: "Close",
                        onPress: () => {
                            // Do something
                        },
                    }}
                >
                    {this.state.snackbar.message}
                </Snackbar>
            </View>
        );
    }
}
