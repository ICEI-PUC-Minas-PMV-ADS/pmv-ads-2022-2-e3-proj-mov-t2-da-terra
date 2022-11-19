import React, { useContext, useState, useEffect } from "react";
import QRCode from 'react-native-qrcode-svg'
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../contexts/AuthProvider";

import Botao from "../Componentes/Botao";
import Container from "../Componentes/Container";

const PedidoEnviado = () => {
  let logo = require('../assets/logos_alternativas/logo.png');
  const { user } = useContext(AuthContext);

  const date = new Date().toLocaleDateString('pt-BR', {timeZone: 'UTC'});

  const tempo = new Date()
  const horas = tempo.getHours()
  const minutos = tempo.getMinutes()
  const segundos = tempo.getSeconds()
  const navigation = useNavigation();
  return (
    <Container>
      <Text style={styles.titulo}>Pedido Enviado</Text>
      <Image
        style={styles.img}
        source={require("../assets/green-checked.png")}
      />
      <View style={styles.qrcode} >
        <QRCode
        size={240}
        logo={logo}
        logoSize={70}
        value={"dzfsd"}/>
      </View>

      <Text style={styles.aviso}>
          Você tem ate as {horas+1}:{minutos}:{segundos<10?"0"+segundos:segundos} do {date} para realizar o pagemento,caso exceda o tempo,o pedido será cancelado
      </Text>

      <View style={{ marginTop: 10 }}>
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
    marginBottom: 40,
    marginTop: -30,
  },
  img: {
    height: 70,
    width: 70,
    padding: 10,
    marginBottom: 12,
    alignSelf: "center",
    marginTop: -30,
  },
  qrcode:{
    alignSelf:"center",


  },
  aviso: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 30,
    letterSpacing: 3,
    padding:10
  },
  textoBotao: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PedidoEnviado;