import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, } from 'react-native';
import { TextInput } from 'react-native-paper'

import { useNavigation } from "@react-navigation/native";

import Input from '../Componentes/Input';
import Container from '../Componentes/Container';
import Body from '../Componentes/Body';
import Botao from '../Componentes/Botao';
import HomeVendedor from "../PaginaVendedor/HomeVendedor";
import HomeCliente from "../PaginasCliente/HomeCliente";

export default function Login() {
	const navigation = useNavigation();

	const [email, setEmail] = useState("")
	const [senha, setSenha] = useState("Digite sua senha")

	const login = () => {
		//Aqui vai a parte para realizar o login
		//Faz a validação se for vendedor
		navigation.navigate("HomeCliente")
		// ou se for cliente
		// navigation.navigate("HomeCliente")
	}

	return (
		<Container>
			<Body>
				{/* <Text style={styles.titulo}>DaTerra</Text> */}
				<Image
					style={styles.icones}
					source={require('../assets/Logo-da-terra.png')}
				/>
				<Input
					label={"Email"}
					right={<TextInput.Icon name="email-outline" />} />
				<Input
					label={"Senha"}
					right={<TextInput.Icon name="lock-outline" />} />

				<Botao
					style={styles.textoBotao}
					textoBotao='Entrar'
					mode='contained'
				/>

				<Text style={styles.textoCadastro}>
					Não tem uma conta?
				</Text>

				<TouchableOpacity
					onPress={() => navigation.navigate('CadastroUsuario')}>
					<Botao
						style={styles.textoBotao}
						textoBotao='Cadastrar'
						mode='contained'
					/>
				</TouchableOpacity>
			</Body>
		</Container>
	);
}

const styles = StyleSheet.create({
	titulo: {
		fontSize: 30,
		fontWeight: "bold",
		fontStyle: "italic",
		textAlign: "center",
		color: "white",
	},
	textoBotao: {
		textAlign: "center",
		fontSize: 20,
		color: "white"
	},
	textoCadastro: {
		marginTop: 45,
		color: "black",
		fontWeight: "bold",
		fontSize: 18,
		textAlign: 'center'
	},
	containerEsqsenha: {
		width: 300,
		marginTop: 20,
	},
	textoEsqsenha: {
		color: '#72E6FF'
	},
	icones: {
		height: 125,
		width: 125,
		resizeMode: 'stretch',
		alignItems: 'center',
		padding: 10,
		marginBottom: 30,
		alignSelf: 'center'
	},
})

