import React from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";

import { List, Appbar, Divider } from "react-native-paper";

import Body from "../Componentes/Body";
import Container from "../Componentes/Container";
import Header from "../Componentes/Header";

import { useNavigation, } from "@react-navigation/native";

const MeusPedidos = () => {
  const navigation = useNavigation()

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginTop: 20 }}>
        <List.Item
          title={`${item.produto}`}
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
                  style={{
                    textAlignVertical: "center",
                    fontWeight: "bold",
                    fontSize: 16,
                    marginTop: 25,
                  }}
                >
                  R${item.preco}
                </Text>
                <Text style={styles.textDataPedido}>{item.dataPedido}</Text>
              </View>

            </>
          )}

          description={
            <>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <List.Icon icon={item.aprovado ? "check" : "clock-outline"} />
                <Text style={item.aprovado ? styles.aprovado : styles.esperandoAprovacao}>{`${item.aprovado ? "Aprovado" : "Aguardando aprovação"}`}</Text>
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
          data={data}
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
    marginTop: 8,
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


