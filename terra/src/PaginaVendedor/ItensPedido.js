import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Text,
  BackHandler,
} from "react-native";

import { FAB, List } from "react-native-paper";

import Body from "../Componentes/Body";
import Container from "../Componentes/Container";
import Header from "../Componentes/Header";

import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { AuthContext } from "../contexts/AuthProvider";
import { PedidoContext } from "../contexts/webapi.PedidoProvider";

const ItensPedido = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // Provider com as informações do usuário logado
  const { itensPedido, getItensPedido} =
    useContext(PedidoContext);
  //Pegando dados do contexto

  const [produtos, setProdutos] = useState();

  useEffect(() => {
    getItensPedido(itensPedido.id).then((res) => {
      setProdutos(res);
    });
  }, []);

  useEffect(() => {
    if (route.name === "ItensPedido") {
      console.log(route.name);
      const backAction = () => {
        navigation.goBack();
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }
  }, []);
  const renderItem = ({ item }) => (
    <View style={styles.containerProdutos}>
      <List.Item
        title={`${item.nome}`}
        left={() => (
          <Image
            style={styles.img}
            source={require("../assets/maracuja.jpg")}
          />
        )}
        right={() => (
          <Text style={{ textAlignVertical: "center" }}>
            R$ {item.preco.toFixed(2)}
          </Text>
        )}
        description={`Estoque: ${item.estoque} ${item.embalagem}`}
      />
    </View>
  );

  return (
    <Container>
      <Header title={"Produtos do Pedido Nº"+itensPedido.id}/>
      <Body>
        <FlatList
          data={produtos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  containerProdutos: {
    borderRadius: 10,
    padding: 10,
    margin: 5,
    backgroundColor: "#fff",
    elevation: 5,
  },

  // Foto produto
  img: {
    width: 120,
    height: 91,
    borderRadius: 10,
    marginRight: 10,
  },

  // Botão '+' de cadastrar produto
  fab: {
    position: "absolute",
    margin: 12,
    right: 0,
    bottom: 0,
    backgroundColor: "#FF8919",
  },
});

export default ItensPedido;
