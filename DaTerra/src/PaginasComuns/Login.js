import { Text, View, StyleSheet, TouchableOpacity, Image, } from 'react-native';
import React, { useState, useEffect } from 'react';
import Input from '../Componentes/Input';
import { TextInput } from 'react-native-paper'
import HomeVendedor from "../PaginaVendedor/HomeVendedor";
import HomeCliente from "../PaginasCliente/HomeCliente";
import { useNavigation } from "@react-navigation/native";
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
		<>
			<View style={styles.container}>
				<Text style={styles.titulo}>DaTerra</Text>
				<Image style={styles.icones} source={require('../assets/Logo-da-terra.png')} />

				<Input label={"Email"} right={<TextInput.Icon name="email-outline" />} />
				<Input label={"Senha"} right={<TextInput.Icon name="lock-outline" />} />

				<TouchableOpacity style={styles.botao}>
					<Text style={styles.textoBotao} onPress={login}>Entrar</Text>
				</TouchableOpacity>

				<Text style={{ marginTop: 10, color: "white", fontSize: 20 }}>Ou</Text>
				<TouchableOpacity
					onPress={() => navigation.navigate('CadastroUsuario')}
				>
					<Text style={{ marginTop: 10, color: "black", fontWeight: "bold", fontSize: 18, }}>Não tem uma conta?
						Cadastra-se</Text>
				</TouchableOpacity>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#C0D56A",
		justifyContent: "center",
		alignItems: "center",
	},
	titulo: {
		fontSize: 30,
		fontWeight: "bold",
		fontStyle: "italic",
		textAlign: "center",
		color: "white",
	},
	textoDestacado: {
		fontStyle: "italic",
		fontSize: 30
	},
	textoBotao: {
		textAlign: "center",
		fontSize: 20,
		color: "white"
	},
	botao: {
		height: 40,
		backgroundColor: "#768AD4",
		justifyContent: "center",
		width: 310,
		borderRadius: 7,
		marginTop: 30,
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
	},
})

