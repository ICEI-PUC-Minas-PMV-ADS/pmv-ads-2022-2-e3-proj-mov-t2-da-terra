import React, { useState, useEffect, useContext } from "react";

import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

import Botao from "../Componentes/Botao";
import Body from "../Componentes/Body";
import Container from "../Componentes/Container";
import CadastroUsuario from "./CadastroUsuario";

import { AuthContext } from "../contexts/AuthProvider";

const MinhaConta = () => {
  const navigation = useNavigation();

  const { user } = useContext(AuthContext);
  const [idUser, setIdUser] = useState();
  const [userLogado, setUserLogado] = useState();

  useEffect(() => {
    for (let i in user) {
      //setTipoUser(user[i].tipoUsuario)
      const tipoUser = user[i].tipoUsuario;
     // setTipoUserLogado(tipoUser);

      if (tipoUser != undefined)
        console.log(tipoUser);
    }
    //console.log(user);
  }, [])

  useEffect(() => {
    for (let i in user) {
      const tipoUser = user[i].tipoUsuario;

      if (tipoUser != undefined) {
        console.log(tipoUser);      
        const novoUser = Object.values(user);
        console.log(novoUser[0].id);
      }
    }
    //const novoUser = Object.values(user);
    //  console.log(novoUser[0].id);
  }, [])


  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Image
        style={styles.avatar}
        source={{ uri: "https://bootdey.com/img/Content/avatar/avatar6.png" }}
      />
      {/* <Text>aqui: {userLogado.nome}</Text> */}
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          {/* <Text style={styles.name}>{tipoUsuario == "cliente" ? user.cliente.nome : user.produtor.nome}</Text> */}
          <Text style={styles.info}>{ }</Text>
          <Text style={styles.description}>

          </Text>

          <TouchableOpacity onPress={() => navigation.navigate("CadastroUsuario")} style={styles.buttonContainer}>
            <Botao
              style={styles.textoBotao}
              buttonColor={"#3d9d74"}
              textoBotao="Editar meu Perfil"
              mode="contained"
            />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.buttonContainer}>
            <Botao
              style={styles.textoBotao}
              buttonColor={"#3d9d74"}
              textoBotao="Notificações"
              mode="contained"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#3d9d74",
    height: 90,
  },
  avatar: {
    width: 110,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginTop: -60,
    alignSelf: "center",
  },
  name: {
    fontSize: 22,
    color: "#9fd09d",

  },
  body: {
    marginTop: 20,
  },
  bodyContent: {
    alignItems: "center",
  },
  name: {
    fontSize: 25,
    marginTop: -12,
    fontWeight: "600",
  },
  info: {
    fontSize: 20,
    color: "#6cc438",
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 5,
    height: 60,
    flexDirection: "row",
    marginBottom: 20,
    borderRadius: 30,
  },
  textoBotao: {
    textAlign: "center",
    fontSize: 18,
  },
});
export default MinhaConta;
