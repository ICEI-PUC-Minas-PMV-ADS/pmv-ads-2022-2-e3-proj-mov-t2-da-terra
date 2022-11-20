import React, { useState, useEffect, useContext } from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

import { List, Button, Appbar, Divider } from "react-native-paper";
import {PedidoContext} from "../contexts/webapi.PedidoProvider"
import Body from "../Componentes/Body";
import Container from "../Componentes/Container";
import Header from "../Componentes/Header";
import Seletor from "../Componentes/Seletor";

import { useNavigation, useIsFocused } from "@react-navigation/native";

// data = [
//   {
//     id: 1,
//     loja: "Shop Deutsch Brothers",
//     produto: "Banana",
//     aprovado: false,
//     dataPedido: "20/02/2023",
//     preco: "20.40",
//   },
//   {
//     id: 2,
//     loja: "Fruits Paradise",
//     produto: "Maça",

//     aprovado: true,
//     dataPedido: "12/05/2022",
//     preco: "55.60",
//   },
//   {
//     id: 3,
//     loja: "Loja do tião",
//     produto: "Brócolis",

//     aprovado: false,
//     dataPedido: "25/07/2021",
//     preco: "202.20",
//   },
//   {
//     id: 4,
//     loja: "Loja do Calvo",
//     produto: "Alface",
//     aprovado: true,
//     dataPedido: "10/07/2020",
//     preco: "102.01",
//   },
//   {
//     id: 5,
//     loja: "Loja dos irmãos Deustch",
//     produto: "pera",
//     aprovado: false,
//     dataPedido: "02/03/2019",
//     preco: "67.40",
//   },
// ];

const MeusPedidos = () => {
  const navigation = useNavigation()
  const{pedido,putPedido,getPedido}= useContext(PedidoContext)



  const renderItem = ({ item }) => {
    return (
      <View style={{ marginTop: 20 }}>
        <List.Item
           title={`${item.nome}`}
          titleStyle={{
            fontSize: 20,
            fontWeight: "bold",
            lineHeight: 22,
            marginBottom: 8,
          }}
          right={() => (
            <>
              <View style={{ flexDirection: "column", marginTop: 40, }}>
                <Text
                  style={styles.textPrecoTotal}
                >
                  R${item.precoTotalPedido.toFixed(2)}
                </Text>
                <Text style={styles.textDataPedido}>{item.dataPedido}</Text>
              </View>

            </>
          )}

          description={
            <>
              <View style={{ flexDirection: "row", alignItems: "center"}}>
                <List.Icon icon={item.aprovado ? "check" : "clock-outline"} />
                <Text style={item.status=="Pedido Enviado" ? styles.esperandoAprovacao : styles.aprovado}>{`${item.status=="Pedido Enviado" ? "Aguardando aprovação" : "Aprovado"}`}</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center"}}>
                <List.Icon icon="store" />
                <Text style={{ fontSize: 16 }}>{item.loja}</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <List.Icon icon="calendar-check-outline" />
                <Text style={{ fontSize: 16 }}>{item.dataPedido}</Text>
              </View>

            </>
          }
        />
        <Divider />
      </View>
    );
  };

  return (
    <Container>
      <Header title={"Meus pedidos"} >
        <Appbar.Action
          style={{ marginRight: 10 }}
          icon="cart" onPress={() => navigation.navigate("Carrinho")} />

      </Header>
      <Body>
        <FlatList
          data={pedido}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </Body>
    </Container>
  );
};


const styles = StyleSheet.create({
  /* FlatList */
  textDataPedido: {
    fontWeight: "bold",
    marginTop: 15,
    fontSize: 16,

  },
  textPrecoTotal:{
    textAlignVertical: "center",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 35,
    marginLeft:55
  },
  aprovado: {
    fontSize: 16,
    fontWeight: "bold",
    borderRadius: 10,
    backgroundColor: "#6cc438",
    padding: 7,
  },
  esperandoAprovacao: {
    fontSize: 16,
    fontWeight: "bold",
    borderRadius: 12,
    backgroundColor: "#EDD251",
    padding: 7,
  },
});

export default MeusPedidos;


