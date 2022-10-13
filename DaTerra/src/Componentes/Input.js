import React from 'react'
import { TextInput } from 'react-native-paper'
import { StyleSheet } from "react-native";

const Input = (props) => {

 // const styleCompose = StyleSheet.compose(styles.input, props.style)

  return (
    <TextInput
     // style={[styles.input && props.style]}
      style={styles.input}
      //  style={styleCompose}
      mode="outlined"
      {...props}
      
    />
  )
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    fontSize: 16,
    backgroundColor: "#FFFAFA",
    //color: "white",
    margin: 3,    
  }
})

export default Input;

// '#6cc438'
// '#d3e4a5'
// '#3d9d74'
// '#50ac5d'
// '#9fd09d'