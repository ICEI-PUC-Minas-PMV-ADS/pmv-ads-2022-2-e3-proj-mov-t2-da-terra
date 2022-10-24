import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Text,
} from "react-native";

import { FAB, List } from "react-native-paper";

import Body from "../Componentes/Body";
import Container from "../Componentes/Container";
import Header from "../Componentes/Header";

import { AuthContext } from "../contexts/AuthProvider";

import { useNavigation, useIsFocused } from "@react-navigation/native";
import { getUsuario } from "../DBService/DBUsuario";
import { ProdutoContext } from "../contexts/webapi.ProdutoProvider";

const Loja = () => {

  const navigation = useNavigation();
  const { produto, getProduto } = useContext(ProdutoContext);
  const { user, setUser } = useContext(AuthContext); // User Logado
  const isFocused = useIsFocused();

  // ALTERADO PARA TESTES - falta setar
  useEffect(() => {
    getProduto(6);

    // Teste
    //console.log(typeof (produto));  // Objeto
    // Percorrendo objeto produto
     Object.keys(produto).forEach((item) => {
       console.log(item + " = " + produto[item]);
     });


  }, [isFocused]);

  const renderItem = ({ item }) => (
    <View style={styles.containerProdutos}>
      <TouchableOpacity
        onPress={() => navigation.navigate("CadastrarProduto", { item })}>
        <List.Item
          title={`${item.nome}`}
          left={() =>
            <Image
              style={styles.img}
              source={require("../assets/maracuja.jpg")} />}
          right={() =>
            <Text style={{ textAlignVertical: 'center' }}>R$ {item.preco.toFixed(2)}</Text>
          }
          description={`Estoque: ${item.estoque} ${item.embalagem}`}
        />
      </TouchableOpacity >
    </View>
  );

  return (
    <Container>
      <Header title={user.nomeLoja}></Header>
      <Body>
        {/* <Text>{produto.nomeProduto}</Text> */}
        <FlatList
          data={produto}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <FAB
          style={styles.fab}
          small
          icon="plus"
          onPress={() => navigation.navigate("CadastrarProduto")}
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
    backgroundColor: '#fff',
    elevation: 5,
  },
  img: {
    width: 127,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  fab: {
    position: "absolute",
    margin: 12,
    right: 0,
    bottom: 0,
    backgroundColor: '#FF8919'
  },
});

export default Loja;
