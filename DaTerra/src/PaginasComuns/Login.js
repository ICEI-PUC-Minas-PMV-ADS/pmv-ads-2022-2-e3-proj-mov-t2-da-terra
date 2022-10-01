import React, { useState, useEffect, Dimensions } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { TextInput } from "react-native-paper";

import { useNavigation } from "@react-navigation/native";

import Input from "../Componentes/Input";
import Container from "../Componentes/Container";
import Body from "../Componentes/Body";
import Botao from "../Componentes/Botao";
import HomeVendedor from "../PaginaVendedor/HomeVendedor";
import HomeCliente from "../PaginasCliente/HomeCliente";

export default function Login() {
  const navigation = useNavigation();
  const [escondeSenha, setEscondeSenha] = useState(true)

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("Digite sua senha");

  const validarLogin = () => {
    //Aqui vai a parte para realizar o login
    //Faz a validação se for vendedor
    console.log("VALIDAR LOGIN");
    navigation.navigate("HomeCliente");
  };

  return (
    <Container>
      <Body>
        <Image
          style={styles.logo}
          source={require("../assets/DATERRA-COMPLETO-800X1050.png")}
        />
        <Input
          label={"Email"}
          right={<TextInput.Icon icon="email-outline" />}
        />
        <Input
          label={"Senha"}
          style={{ marginTop: 8 }}
          secureTextEntry={escondeSenha}
          right={<TextInput.Icon onPress={() =>
            escondeSenha ? setEscondeSenha(false) :
              setEscondeSenha(true)} icon="eye" />} />

        <View style={styles.viewBotao}>
          <TouchableOpacity onPress={() => validarLogin()}>
            <Botao
              style={styles.textoBotao}
              buttonColor={"#3d9d74"}
              textoBotao="Entrar"
              mode="contained"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.viewTexto}>
          <Text style={styles.textoCadastro}>Não é cadastrado?</Text>
        </View>

        <View style={styles.viewBotao}>
          <TouchableOpacity
            onPress={() => navigation.navigate("CadastroUsuario")}
          >
            <Botao
              style={styles.textoBotao}
              textColor={"#3d9d74"}
              textoBotao="Cadastre-se"
              mode="outlined"
            />
          </TouchableOpacity>
        </View>
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
  viewBotao: {
    marginTop: 35,
    marginBottom: 25,
  },
  viewTexto: {
    width: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  textoBotao: {
    textAlign: "center",
    fontSize: 18,
  },
  textoCadastro: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  containerEsqsenha: {
    width: 300,
    marginTop: 20,
  },
  textoEsqsenha: {
    color: "#72E6FF",
  },
  logo: {
    height: 190,
    width: 145,
    padding: 10,
    marginBottom: 30,
    alignSelf: "center",
  },
});

// '#6cc438'
// '#d3e4a5'
// '#3d9d74'
// '#50ac5d'
// '#9fd09d' - verde claro
