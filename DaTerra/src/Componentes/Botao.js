import React from "react";
import { StyleSheet, Text } from "react-native";

import { TouchableOpacity } from "react-native";

const Botao = ( props ) => {
  return (
    <TouchableOpacity style={styles.botao}>         
     <Text {...props}>{props.textoBotao}</Text> 
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
		height: 40,
		backgroundColor: "#768AD4",
		justifyContent: "center",
		width: 310,
		borderRadius: 7,
		marginTop: 30,
    backgroundColor: "#3d9d74"
	},
});

export default Botao;