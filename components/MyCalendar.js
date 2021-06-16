import React, { Component} from "react";
import { View, Text } from "react-native";
import styles from "../styles/global";
import firebase from "../firebase";

class MyCalendar extends Component {
    weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


    constructor(props) {

        super(props);
        
        this.state = {
            matrix: this.generateMatrix(props.selectedDate())
        }
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
        const maxDays = new Date(year, month, 0).getDate()

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
            matrix: this.generateMatrix(this.props.selectedDate())
        })
        console.log('Matrix updated.');

    }

    render() {
        var rows = [];
        rows = this.state.matrix.map((row, rowIndex) => {
            var rowItems = row.map((item, colIndex) => {
                return (
                    <Text
                        style={{
                            flex: 1,
                            height: 18,
                            textAlign: "center",
                            // Highlight header
                            backgroundColor: rowIndex == 0 ? "#ddd" : "#fff",
                            // Highlight Sundays
                            color: colIndex == 0 ? "#a00" : "#000",
                            // Highlight current date
                            fontWeight:
                                item == this.props.selectedDate().getDate()
                                    ? "bold"
                                    : "normal",
                        }}
                        onPress={
                            item != -1 && rowIndex > 0
                                ? () => this._onPress(item)
                                : null
                        }
                        key={colIndex}
                    >
                        {item != -1 ? item : ""}
                    </Text>
                );
            });
            return (
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        padding: 15,
                        justifyContent: "space-around",
                        alignItems: "center",
                    }}
                    key={rowIndex}
                >
                    {rowItems}
                </View>
            );
        });

        return <View style={{ height: "90%", width: "100%" }}>{rows}</View>;
    }
}

export default MyCalendar;
