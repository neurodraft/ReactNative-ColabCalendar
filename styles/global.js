import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fullPageContainer: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      padding: 40,
    },
    inputView:{
        width:"80%",
        backgroundColor:"lightgrey",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
      },
      inputText:{
        height:50,
        color:"black"
      }
});

export default styles;

