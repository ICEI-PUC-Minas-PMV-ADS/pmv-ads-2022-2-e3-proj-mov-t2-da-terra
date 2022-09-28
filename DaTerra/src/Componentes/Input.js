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
    height: 48,
    fontSize: 15,
    backgroundColor: "#FFF",
    color: "white",
    margin: 3,
  }
})

export default Input;

// '#6cc438'
// '#d3e4a5'
// '#3d9d74'
// '#50ac5d'
// '#9fd09d'