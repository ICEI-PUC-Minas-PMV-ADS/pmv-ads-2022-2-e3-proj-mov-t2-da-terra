import React from 'react'
import { TextInput } from 'react-native-paper'
import { StyleSheet } from "react-native";

const Input = (props) => {
    return (
        <TextInput style={styles.input} {...props} />
    )
}


const styles = StyleSheet.create({
    input: {
        borderWidth: 1.1,
        width: 300,
        fontSize: 15,
        backgroundColor: "#FFF",
        color: "white",
        fontWeight: "bold",
        height: 45,
        borderColor: "black",
        marginTop: 30,
        padding: 1.3,
    }
})

export default Input;