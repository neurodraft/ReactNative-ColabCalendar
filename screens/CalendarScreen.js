import React, { Component } from "react";
import { render } from "react-dom";
import { View, Text, TouchableHighlight, Button } from "react-native";



import Ionicons from "react-native-vector-icons/Ionicons";

import MyCalendar from "../components/MyCalendar";
import strings from "../constants/strings";

import styles from "../styles/global";

class CalendarScreen extends Component {
    months = strings.months;

    constructor(props) {
        super(props);
        console.log('aqui')
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
                    calendar={this.props.route.params.calendar}
                    ref={(myCalendar) => {
                        this.myCalendar = myCalendar;
                    }}
                />
            </View>
        );
    }
}



export default CalendarScreen;
