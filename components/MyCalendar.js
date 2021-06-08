import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styles from '../styles/global';

class MyCalendar extends Component {

    weekDays = [
        "Sun","Mon","Tue","Wed","Thu","Fri","Sat"
    ];

    nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


    constructor(props = {today}) {
        super({props})
        this.state = {
            activeDate: props.today,
            matrix: this.generateMatrix(props.today)
        };
    }

    

    generateMatrix(today) {
        var matrix = [];
        // Create header
        matrix[0] = this.weekDays;

        // Get current year and month
        var year = today.getFullYear();
        var month = today.getMonth();

        // Get day of the week of first day of month
        var firstDay = new Date(year, month, 1).getDay();
        //console.log(firstDay);

        // Get number of days in month
        var maxDays = this.nDays[month];
        if(month == 1) { // February
            if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                maxDays += 1;
            }
        }

        // Populate matrix
        var counter = 1;
        for(var row = 1; row < 7; row ++){
            matrix[row] = [];
            for(var col = 0; col < 7; col++){
                matrix[row][col] = -1;
                if(row == 1 && col >= firstDay) {
                    // Fill in rows only after the first day of the month
                    matrix[row][col] = counter++;
                } else if (row > 1 && counter <= maxDays) {
                    // Fill in rows only if the counter's not greater than
                    // the number of days in the month
                    matrix[row][col] = counter++;                }
            }
        }

        //console.log(matrix);

        return matrix;
    }

    _onPress = (item) => {
        this.setState(() => {
            if (!item.match && item != -1) {
                this.state.activeDate.setDate(item);
                return this.state;
            }
        });
    }

    render() {
        var rows = [];
        rows = this.state.matrix.map((row, rowIndex) => {
            var rowItems = row.map((item, colIndex) => {
                return (
                    <Text style = {{
                        flex: 1,
                        height: 18,
                        textAlign: 'center',
                        // Highlight header
                        backgroundColor: rowIndex == 0 ? '#ddd' : '#fff',
                        // Highlight Sundays
                        color: colIndex == 0 ? '#a00' : '#000',
                        // Highlight current date
                        fontWeight: item == this.state.activeDate.getDate() ? 'bold' : ''
                    }}
                    onPress = {(item != -1 && rowIndex>0) ? () => this._onPress(item) : null}>
                        {item != -1 ? item : ''}
                    </Text>
                );
            });
            return (
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    padding: 15,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                }}>
                    {rowItems}
                </View>
            )

        })

        return (
           <View>
               {rows}
           </View>
        )
    }
}

export default MyCalendar;