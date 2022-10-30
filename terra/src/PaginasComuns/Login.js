import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { TextInput } from "react-native-paper";

import { useNavigation } from "@react-navigation/native";

import Input from "../Componentes/Input";
import Container from "../Componentes/Container";
import Body from "../Componentes/Body";
import Botao from "../Componentes/Botao";

import { getUsuario } from "../DBService/DBUsuario";
import { getLogin } from "../DBService/DBUsuario";

import { AuthContext } from "../contexts/AuthProvider";

import { login } from "../JsonServer/webapi.usuarios";
export default function Login() {
  const navigation = useNavigation();
  const { user, setUser } = useContext(AuthContext);

  // Aviso de erro para dados incompletos ou incorretos
  const [aviso, setAviso] = useState("");
  const [missInfo, setMissInfo] = useState(false);

  // Email / Senha / Ícone Senha
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [escondeSenha, setEscondeSenha] = useState(true);

  const validarLogin = () => {
    if (!email || !senha) {
      setMissInfo(true); // Falta Informação 
      setAviso("Por favor, insira o email e a senha")
    }
    else { // FAZER A VALIDAÇÃO SE É CLIENTE OU PRODUTOR      
      login({
        email: email.trim(),
        password: senha.trim()
      }).then(res => {
        if (typeof (res) != "null" && res.user.tipoUsuario == "cliente") {
          navigation.navigate("HomeCliente");
        }
        else if (typeof (res) != "null" && res.user.tipoUsuario == "produtor") {
          navigation.navigate("HomeVendedor");
        }
        else {
          //Significa que ou o usuario digitou os dados erros ou esse meliante não existe
          setMissInfo(true)
          setAviso("Email ou senha incorretos")
        }
      });
    }
  };

  return (
    <Container>
      <Body>
        {/* Logo */}
        <Image
          style={styles.logo}
          source={require("../assets/DATERRA-COMPLETO-800X1050.png")}
        />

        {/* Email */}
        <Input
          label={"Email"}
          onChangeText={(text) => setEmail(text)}
          activeOutlineColor={"#3d9d74"}
          error={missInfo && !email ? true : false}
          right={<TextInput.Icon icon="email-outline" />}
        />

        {/* Senha */}
        <Input
          label={"Senha"}
          onChangeText={(text) => setSenha(text)}
          secureTextEntry={escondeSenha}
          error={missInfo && !senha ? true : false}
          activeOutlineColor={"#3d9d74"}
          right={
            <TextInput.Icon
              onPress={() =>
                escondeSenha ? setEscondeSenha(false) : setEscondeSenha(true)
              }
              icon={escondeSenha ? 'eye-off' : 'eye'}
            />
          }
        />
        {missInfo && (
          <Text style={styles.aviso}>{aviso}</Text>
        )}

        {/* Botão Entrar */}
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

        {/* Mensagem  'Não tem uma conta?'*/}
        <View style={styles.viewTexto}>
          <Text style={styles.textoCadastro}>Não tem um conta?</Text>
        </View>

        {/* Botão Cadastra-se */}
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
  // Logo
  logo: {
    height: 190,
    width: 145,
    padding: 10,
    marginBottom: 30,
    alignSelf: "center",
  },

  // Botão 
  viewBotao: {
    marginTop: 20,
    marginBottom: 25,
  },
  textoBotao: {
    textAlign: "center",
    fontSize: 18,
  },

  // Text 'Não tem uma conta?'
  viewTexto: {
    width: 350,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -11,
  },
  textoCadastro: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },

  // View Esqueceu a Senha (Falta Implementar)
  containerEsqsenha: {
    width: 300,
    marginTop: 20,
  },
  textoEsqsenha: {
    color: "#72E6FF",
  },

  // Aviso de dados incompletos
  aviso: {
    marginTop: 10,
    marginLeft: 10,
    color: "#D32F2F",
    fontStyle: "italic",
    fontWeight: "bold",
    textAlign: 'center'
  },
});