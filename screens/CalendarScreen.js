import React, { Component } from "react";
import { render } from "react-dom";
import { View, Text, TouchableHighlight, Button } from "react-native";



import Ionicons from "react-native-vector-icons/Ionicons";

import MyCalendar from "../components/MyCalendar";

import styles from "../styles/global";

class CalendarScreen extends Component {
    months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    constructor(props) {
        super(props);
        this.state = {
            selectedDate: new Date(),
        };
    }

    setSelectedDate(date) {
        if (date.toDateString() == this.state.selectedDate.toDateString()) {
            console.log("Opening day...");
            this.props.navigation.navigate("Day's Events", {
                day: this.state.selectedDate.getTime(),
                calendar: this.props.route.params.calendar
            });
        } else {
            if(date.getMonth() == this.state.selectedDate.getMonth())
                this.setState({
                    ...this.state,
                    selectedDate: date,
                });
            else
                this.setState({
                    ...this.state,
                    selectedDate: date,
                }, this.updateCalendarMonth);
        }
    }

    updateCalendarMonth() {
        console.log(`Month is ${this.state.selectedDate.getMonth()}`);
        console.log('Requesting matrix update...');
        this.myCalendar.updateMatrix();
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "#fff",
                    alignItems: "center",
                    justifyContent: "flex-start",
                }}
            >
            {/*
                <View
                    style={{
                        width: "100%",
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        backgroundColor: "lightblue",
                    }}
                >
                    <TouchableHighlight
                        onPress={() => {
                            this.props.route.params.toggleDrawer();
                        }}
                    >
                        <Ionicons name="menu" size={24} />
                    </TouchableHighlight>
                    <Text
                        style={{
                            textAlign: "center",
                            fontSize: 16,
                            height: "100%",
                            fontWeight: "bold",
                        }}
                    >
                        {this.props.route.params.calendar.title}
                    </Text>
                    <TouchableHighlight
                        onPress={() => {
                            this.props.route.params.toggleDrawer();
                        }}
                    >
                        <Ionicons name="create" size={24} />
                    </TouchableHighlight>
                </View>
                */}

                <View
                    style={{
                        width: "100%",
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <TouchableHighlight
                        style={{ flex: 1 }}
                        onPress={() => {
                            var date = new Date(
                                this.state.selectedDate.getTime()
                            );
                            date.setMonth(date.getMonth() - 1);
                            this.setSelectedDate(date);
                        }}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                fontSize: 24,
                                fontWeight: "bold",
                            }}
                        >
                            {"< "}
                        </Text>
                    </TouchableHighlight>

                    <Text
                        style={{
                            flex: 6,
                            textAlign: "center",
                            fontSize: 24,
                            fontWeight: "bold",
                        }}
                    >
                        {this.months[this.state.selectedDate.getMonth()]} &nbsp;
                        {this.state.selectedDate.getFullYear()}
                    </Text>

                    <TouchableHighlight
                        style={{ flex: 1 }}
                        onPress={() => {
                            var date = new Date(
                                this.state.selectedDate.getTime()
                            );
                            date.setMonth(date.getMonth() + 1);
                            this.setSelectedDate(date);
                        }}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                fontSize: 24,
                                fontWeight: "bold",
                            }}
                        >
                            {" >"}
                        </Text>
                    </TouchableHighlight>
                </View>

                
                <MyCalendar
                    selectedDate={() => {return this.state.selectedDate;}}
                    setDay={(day) => {
                        var date = new Date(this.state.selectedDate.getTime());
                        date.setDate(day);
                        console.dir(date);
                        this.setSelectedDate(date);
                    }}
                    ref={(myCalendar) => {
                        this.myCalendar = myCalendar;
                    }}
                />
            </View>
        );
    }
}



export default CalendarScreen;
