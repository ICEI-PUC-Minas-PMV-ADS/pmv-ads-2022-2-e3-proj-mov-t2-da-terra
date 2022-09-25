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
		width: 280,
		height: 40,
		justifyContent: "center",
		alignSelf: 'center',		
		borderRadius: 20,
		marginTop: 30,
		backgroundColor: "#3d9d74",
		fontWeight: 'bold',
		},
		
});

export default Botao;