import React, { useContext, useState, useEffect } from "react";
import QRCode from 'react-native-qrcode-svg'
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  BackHandler
} from "react-native";

import { AuthContext } from "../contexts/AuthProvider";

import Botao from "../Componentes/Botao";
import Container from "../Componentes/Container";
import { useNavigation,useRoute } from "@react-navigation/native";

const PedidoEnviado = () => {
  let logo = require('../assets/logos_alternativas/logo.png');
  const { user } = useContext(AuthContext);
  const route = useRoute();

  const date = new Date().toLocaleDateString('pt-BR', {timeZone: 'UTC'});

  const tempo = new Date()
  const horas = tempo.getHours()
  const minutos = tempo.getMinutes()
  const segundos = tempo.getSeconds()
  const navigation = useNavigation();






  useEffect(() => {
    if (route.name==="PedidoEnviado") {
      const backAction = () => {
       navigation.goBack()
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      return () => backHandler.remove();
  
  }

    
  }, []);

  return (
    <Container>
      <Text style={styles.titulo}>Pedido Enviado</Text>
      <Image
        style={styles.img}
        source={require("../assets/green-checked.png")}
      />
      <View style={styles.qrcode} >
        {/* Ou deixar o repositório ou colocar o value como o cpf do vendedor,simulando um pix */}
        <QRCode
        size={240}
        logo={logo}
        logoSize={70}
        value="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2022-2-e3-proj-mov-t2-da-terra"/>
      </View>

      <Text style={styles.aviso}>
          Você tem ate as {horas+1}:{minutos<10?"0"+minutos:minutos}:{segundos<10?"0"+segundos:segundos} do {date} para realizar o pagamento,caso exceda o tempo,o pedido será cancelado
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
    letterSpacing: 1.8,
    padding:10
  },
  textoBotao: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PedidoEnviado;