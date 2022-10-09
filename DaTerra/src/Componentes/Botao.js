import React from "react";
import { StyleSheet, Text } from "react-native";

import { Button } from "react-native-paper";

const Botao = (props) => {
	
	return (
		<Button {...props} style={styles.botao} >
			<Text {...props}>{props.textoBotao}</Text> 
		</Button>		
	);
}

const styles = StyleSheet.create({
	botao: {
		width: 280,
		height: 40,
		alignSelf: 'center',
		borderRadius: 20,
	},
});

export default Botao;


// '#6cc438'
// '#d3e4a5'
// '#3d9d74' - verde escuro
// '#50ac5d'
// '#9fd09d' - verde claro