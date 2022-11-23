

import React, { useState, useContext, useEffect } from 'react' 



import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";


import { PedidoContext } from "../contexts/webapi.PedidoProvider"
import { List, Appbar, Divider } from "react-native-paper";
import Body from "../Componentes/Body";
import Container from "../Componentes/Container";
import Header from "../Componentes/Header";

import { useNavigation, } from "@react-navigation/native";

const MeusPedidos = () => {
  const navigation = useNavigation()

const {pedido,putPedido} = useContext(PedidoContext)



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
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <List.Icon icon={item.aprovado ? "check" : "clock-outline"} />
                <Text style={item.status == "Pedido Enviado" ? styles.esperandoAprovacao : styles.aprovado}>{`${item.status == "Pedido Enviado" ? "Aguardando aprovação" : "Aprovado"}`}</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
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
  textPrecoTotal: {
    textAlignVertical: "center",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 35,
    marginLeft: 55
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


