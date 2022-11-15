import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { TextInput, Snackbar } from "react-native-paper";

import { useNavigation } from "@react-navigation/native";

import Input from "../Componentes/Input";
import Container from "../Componentes/Container";
import Body from "../Componentes/Body";
import Botao from "../Componentes/Botao";

import { AuthContext } from "../contexts/AuthProvider";


export default function Login() {
  const navigation = useNavigation();
  const { postLogin, user, setUser, setTipoUsuario } = useContext(AuthContext);

  // SnackBar e falta informação
  const [missInfo, setMissInfo] = useState(false);
  const [aviso, setAviso] = useState("")
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  // Email / Senha / Ícone Senha
  const [email, setEmail] = useState("m@gmail.com");
  const [senha, setSenha] = useState("123456");
  const [escondeSenha, setEscondeSenha] = useState(true);


//----------------------INICIO TESTES------------------------
  // TESTES
  const [state, setState] = useState();

  // TESTES
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // TESTES
  useEffect(() => {   
    // console.log("----- USER useEffect -----");
     //console.log(state);
    // console.log("--------------------------");
  }, [])

  // Validação login - VERSÃO DE  TESTES
  const validarLogin = async () => {
    if (!email || !senha) {
      setMissInfo(true); // Falta Informação
      onToggleSnackBar();
    } else {    
      await postLogin({
        email: email,
        senha: senha,
      })
        // .then(() => delay(1000))
        .then(() => {
          console.log("----- USER LOGIN -----");
          console.log(user);
          console.log("----------------------");

          // Parte "ok"
          // for (let i in user) {
          //   const tipoUser = user[i].tipoUsuario;
          //   console.log(user[i].tipoUsuario)
          //   if (tipoUser != undefined) {
          //     if (tipoUser == 'cliente') {
          //       //setTipoUsuario("Cliente")
          //       navigation.navigate("HomeCliente");
          //     }
          //     else if (tipoUser == 'produtor') {
          //       //  setTipoUsuario("Produtor")
          //       navigation.navigate("HomeVendedor");
          //     } else {
          //       // Implementar quando o user ou senha forem inválidos
          //       // Tem que ler no banco
          //     }
          //   }
          // }
        })
        .catch((e) => console.log('ERROR'))
      // console.log("----- USER LOGIN -----");
      // console.log(user);
      // console.log("----------------------");
    }
  };

  //----------------------FIM TESTES---------------------------------

  // Não apagar - Primeira versão
  // const validarLogin = async () => {
  //   if (!email || !senha) {
  //     setMissInfo(true); // Falta Informação
  //     onToggleSnackBar();
  //   } else {    
  //     await postLogin({
  //       email: email,
  //       senha: senha,
  //     })
  //       .then(() => {
  //         for (let i in user) {
  //           const tipoUser = user[i].tipoUsuario;
  //           console.log(user[i].tipoUsuario)
  //           if (tipoUser != undefined) {
  //             if (tipoUser == 'cliente') {
  //               //setTipoUsuario("Cliente")
  //               navigation.navigate("HomeCliente");
  //             }
  //             else if (tipoUser == 'produtor') {
  //               //  setTipoUsuario("Produtor")
  //               navigation.navigate("HomeVendedor");
  //             } else {
  //               // Implementar quando o user ou senha forem inválidos
  //               // Tem que ler no banco
  //             }
  //           }
  //         }
  //       })
  //       .catch((e) => console.log('ERROR'));
  //   }
  // };


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
          value={email}
          onChangeText={(text) => setEmail(text)}
          activeOutlineColor={"#3d9d74"}
          error={missInfo && !email ? true : false}
          right={<TextInput.Icon icon="email-outline" />
          }
        />

        {/* Senha */}
        <Input
          label={"Senha"}
          value={senha}
          onChangeText={(text) => setSenha(text)}
          secureTextEntry={escondeSenha}
          error={missInfo && !senha ? true : false}
          activeOutlineColor={"#3d9d74"}
          right={
            <TextInput.Icon
              onPress={() =>
                escondeSenha ? setEscondeSenha(false) : setEscondeSenha(true)
              }
              icon={escondeSenha ? "eye-off" : "eye"}
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
          <Text style={styles.textoCadastro}>Não tem uma conta?</Text>
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

        {/* Aviso Dados Incompletos */}
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
            label: "Ok",
          }}
        >
          Por favor, insira o email e a senha
        </Snackbar>
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
  aviso: {
    marginTop: 10,
    marginLeft: 10,
    color: "#D32F2F",
    fontStyle: "italic",
    fontWeight: "bold",
    textAlign: 'center'
  },

});
