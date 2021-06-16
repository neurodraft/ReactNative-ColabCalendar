import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from "../styles/global";
import formStyles from "../styles/form";

class EditCalendarScreen extends Component {

    constructor(props) {

        super(props);

        const { calendar } = this.props.route.params;

        console.log(calendar)
    }

    render(){

        return (            
            <View style={styles.container}>
                <Text>Edit calendar</Text>
            </View>
        )
    }
}

export default EditCalendarScreen