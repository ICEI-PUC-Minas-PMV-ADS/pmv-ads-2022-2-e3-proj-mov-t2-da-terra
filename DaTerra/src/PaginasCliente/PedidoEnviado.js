import React, { useContext, useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import Botao from "../Componentes/Botao";
import Container from "../Componentes/Container";

import ProdutoProvider from "../contexts/ProdutoProvider";

const PedidoEnviado = () => {

  const navigation = useNavigation();
  return (
    <Container>
      <Text style={styles.titulo}>Pedido Enviado</Text>
      <Image
        style={styles.img}
        source={require("../assets/green-checked.png")}
      />
      <Text style={styles.aviso}>
        Caso seu pedido não seja aprovado em até 24 horas, ele será cancelado
        automaticamente
      </Text>

      <View style={{ marginTop: 50 }}>
        <TouchableOpacity onPress={() => navigation.navigate("HomeCliente")}>
          <Botao
            style={styles.textoBotao}
            textColor={"#3d9d74"}
            textoBotao="Voltar para Home"
            mode="outlined"
          />
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  titulo: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 100,
    marginTop: -80,
  },
  img: {
    height: 90,
    width: 90,
    padding: 10,
    marginBottom: 12,
    alignSelf: "center",
    marginTop: -30,
  },
  aviso: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 30,
    letterSpacing: 3,
  },
  textoBotao: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PedidoEnviado;