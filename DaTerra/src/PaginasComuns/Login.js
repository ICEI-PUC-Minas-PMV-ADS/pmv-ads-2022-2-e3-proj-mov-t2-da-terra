import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { TextInput } from "react-native-paper";

import { useNavigation } from "@react-navigation/native";

import Input from "../Componentes/Input";
import Container from "../Componentes/Container";
import Body from "../Componentes/Body";
import Botao from "../Componentes/Botao";

import HomeVendedor from "../PaginaVendedor/HomeVendedor";
import HomeCliente from "../PaginasCliente/HomeCliente";
import { getUsuario } from "../DBService/DBUsuario";
import { getLogin } from "../DBService/DBUsuario";

import { AuthContext } from "../contexts/AuthProvider";

export default function Login() {
  const navigation = useNavigation();
  const { user, setUser } = useContext(AuthContext);
  const [escondeSenha, setEscondeSenha] = useState(true);
  const [aviso, setAviso] = useState("");
  const [missInfo, setMissInfo] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const validarLogin = () => {
    if (email == "" || senha == "") {
      setMissInfo(true); //Faz com que mostre um aviso que tem informação incorreta/faltando
      setAviso("Por favor insira o email e a sua senha")
    }
    else {
      getLogin(email, senha).then((usuario) => {
        // console.log(usuario[0]);

        setUser(usuario[0]);
        console.log("aquii")
        console.log(typeof (usuario[0]));
        setUser(usuario[0])
        console.log(usuario[0]);


        if (typeof (usuario[0]) == "undefined") {
          setMissInfo(true); //Faz com que mostre um aviso que tem informação incorreta/faltando
          setAviso("Email ou senha incorretos")
        } else {
          if (usuario[0].tipoUsuario == "produtor" && usuario[0].tipoUsuario != "undefined")
            navigation.navigate("HomeVendedor");
          else if (usuario[0].tipoUsuario == "cliente" && usuario[0].tipoUsuario != "undefined")
            navigation.navigate("HomeCliente");
        }
      });
    }
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
          onChangeText={(text) => setEmail(text)}
          activeOutlineColor={"#3d9d74"}
          right={<TextInput.Icon icon="email-outline" />}
        />
        <Input
          label={"Senha"}
          onChangeText={(text) => setSenha(text)}
          secureTextEntry={escondeSenha}
          activeOutlineColor={"#3d9d74"}
          right={
            <TextInput.Icon
              onPress={() =>
                escondeSenha ? setEscondeSenha(false) : setEscondeSenha(true)
              }
              icon="eye"
            />
          }
        />
        {missInfo && (
          <Text style={styles.aviso}>{aviso}</Text>
        )}
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
          <Text style={styles.textoCadastro}>Não tem um conta?</Text>
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
    marginTop: 20,
    marginBottom: 25,
  },
  viewTexto: {
    width: 350,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -11,
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
  aviso: {
    marginTop: 10,
    marginLeft: 10,
    color: "#B00020",
    fontStyle: "italic",
    fontWeight: "bold",
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
