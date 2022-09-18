import React from 'react'
import { TextInput } from 'react-native-paper'
import { StyleSheet } from "react-native";

const Input = (props) => {
    return (
        <TextInput
            style={styles.input}
            mode="outlined"
            {...props}
        />
    )
}


const styles = StyleSheet.create({
    input: {
        //borderWidth: 0.5,
        //borderColor: "#3d9d74",
        height: 48,
        fontSize: 15,       
        backgroundColor: "#FFF",
        color: "white",
       // fontWeight: "bold",
       // marginTop: 30,
      //  padding: 2,
        

    }
})

export default Input;

// '#6cc438'
// '#d3e4a5'
// '#3d9d74'
// '#50ac5d'
// '#9fd09d'