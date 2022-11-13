import React, { useState, useEffect, useContext } from "react";
import Botao from "../Componentes/Botao";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import Body from "../Componentes/Body";
import Container from "../Componentes/Container";
import { AuthContext } from "../contexts/AuthProvider";
const MinhaConta = () => {
  const { user } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Image
        style={styles.avatar}
        source={{ uri: "https://bootdey.com/img/Content/avatar/avatar6.png" }}
      />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>{user.cliente.nome}</Text>
          <Text style={styles.info}>UX Designer / Mobile developer</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum
            electram expetendis, omittam deseruisse consequuntur ius an,
          </Text>

          <TouchableOpacity style={styles.buttonContainer}>
            <Botao
              style={styles.textoBotao}
              buttonColor={"#3d9d74"}
              textoBotao="Privacidade"
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
          <TouchableOpacity style={styles.buttonContainer}>
            <Botao
              style={styles.textoBotao}
              buttonColor={"#3d9d74"}
              textoBotao="Pagamento"
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
    height: 80,
  },
  avatar: {
    width: 130,
    height: 120,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginTop: -60,
    alignSelf: "center",
  },
  name: {
    fontSize: 22,
    color: "#9fd09d",
    fontWeight: "600",
  },
  body: {
    marginTop: 20,
  },
  bodyContent: {
    alignItems: "center",
  },
  name: {
    fontSize: 25,
   
    fontWeight: "600",
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 20,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 30,
  },
  textoBotao: {
    textAlign: "center",
    fontSize: 18,
  },
});
export default MinhaConta;
