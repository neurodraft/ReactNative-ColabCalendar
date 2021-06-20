import React, { Component } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import styles from "../styles/global";
import firebase from "../firebase";
import Ionicons from "react-native-vector-icons/Ionicons";

class MyCalendar extends Component {
    weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    unsubscribeListener;

    constructor(props) {
        super(props);

        this.state = {
            matrix: this.generateMatrix(props.selectedDate()),
            events: [],
        };
    }

    componentDidMount(){
        this.unsubscribeListener = firebase
            .firestore()
            .collection("calendars")
            .doc(this.props.calendar.id)
            .collection("events")
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    this.setState({
                        ...this.state.matrix,
                        events: [...this.state.events, doc.data()],
                    });
                });
            });
    }

    componentWillUnmount(){
        if(!!this.unsubscribeListener){
            this.unsubscribeListener();
        }
    }

    areThereEvents(day) {
        var checking = new Date(this.props.selectedDate().getTime());
        checking.setDate(day);
        for (var i = 0; i < this.state.events.length; i++) {
            var event = this.state.events[i];
            var date = event["date"].toDate();
            if (
                checking.getFullYear() === date.getFullYear() &&
                checking.getMonth() === date.getMonth() &&
                checking.getDate() === date.getDate()
            ) {
                return true;
            }
        }

        return false;
    }

    generateMatrix(today) {
        var matrix = [];
        // Create header
        matrix[0] = this.weekDays;

        // Get current year and month
        var year = today.getFullYear();
        var month = today.getMonth();

        // Get day of the week of first day of month
        const date = new Date(year, month);

        var firstDay = date.getDay();

        // Get number of days in month
        const maxDays = new Date(year, month+1, 0).getDate();

        // Populate matrix
        var counter = 1;
        for (var row = 1; row < 7; row++) {
            matrix[row] = [];
            for (var col = 0; col < 7; col++) {
                matrix[row][col] = -1;
                if (row == 1 && col >= firstDay) {
                    // Fill in rows only after the first day of the month
                    matrix[row][col] = counter++;
                } else if (row > 1 && counter <= maxDays) {
                    // Fill in rows only if the counter's not greater than
                    // the number of days in the month
                    matrix[row][col] = counter++;
                }
            }
        }

        //console.log(matrix);

        return matrix;
    }

    _onPress = (item) => {
        if (!item.match && item != -1) {
            this.props.setDay(item);
        }
    };

    updateMatrix() {
        console.log(`Month is ${this.props.selectedDate().getMonth()}`);

        this.setState({
            ...this.state,
            matrix: this.generateMatrix(this.props.selectedDate()),
        });
        console.log("Matrix updated.");
    }

    render() {
        var rows = [];
        rows = this.state.matrix.map((row, rowIndex) => {
            var rowItems = row.map((item, colIndex) => {
                return (
                    <TouchableHighlight
                        style={{
                            flex: 1,
                            borderColor: "tomato",
                            borderWidth:
                                item == this.props.selectedDate().getDate()
                                    ? 1
                                    : 0,
                            justifyContent: "center",
                            alignItems: "center",
                            // Highlight header
                            backgroundColor: rowIndex == 0 ? "#ddd" : "#fff",
                        }}
                        onPress={
                            item != -1 && rowIndex > 0
                                ? () => this._onPress(item)
                                : null
                        }
                        key={colIndex}
                    >
                        <View style={{ alignItems: "center" }}>
                            <Text
                                style={{
                                    textAlign: "center",
                                    // Highlight Sundays
                                    color: colIndex == 0 ? "#a00" : "#000",
                                    // Highlight current date
                                    fontWeight:
                                        item ==
                                        this.props.selectedDate().getDate()
                                            ? "bold"
                                            : "normal",
                                }}
                            >
                                {item != -1 ? item : ""}
                            </Text>
                            {item != 1 && this.areThereEvents(item) && (
                                <Ionicons
                                    color="tomato"
                                    name="ellipse"
                                    size={8}
                                />
                            )}
                        </View>
                    </TouchableHighlight>
                );
            });
            return (
                <View
                    style={{
                        height: rowIndex == 0 ? 40 : 80,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "stretch",
                    }}
                    key={rowIndex}
                >
                    {rowItems}
                </View>
            );
        });

        return (
            <View
                style={{
                    height: "90%",
                    width: "90%",
                }}
            >
                {rows}
            </View>
        );
    }
}

export default MyCalendar;
