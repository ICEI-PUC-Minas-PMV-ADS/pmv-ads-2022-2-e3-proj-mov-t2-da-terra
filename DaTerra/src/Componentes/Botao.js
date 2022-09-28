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