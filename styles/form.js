import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    formContainer: {
      marginTop: 20,
      width: "100%",
      paddingLeft: 40,
      paddingRight: 40,
      flex: 1,
    },

    formElement: {
      width: "100%",
      marginTop: 5,
      marginBottom: 5,

    },

    formButtons: {
      width: "100%",
      padding: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly"
    },

    
    inputView: {
        width: "80%",
        backgroundColor: "lightgrey",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
    },
    inputText: {
        height: 50,
        color: "black",
    },
});

export default styles;
