import React, { useContext, useEffect } from "react";
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

import { useNavigation, useIsFocused } from "@react-navigation/native";

import { AuthContext } from "../contexts/AuthProvider";
import { ProdutoContext } from "../contexts/webapi.ProdutoProvider";

const Loja = () => {
  const navigation = useNavigation();

  // Provider com as informações do usuário logado  
  const { user, setUser } = useContext(AuthContext)
  const isFocused = useIsFocused();

  // Pegando dados do contexto
  const { produto, getAllProdutoProdutor,getBuscaProdutoCliente } = useContext(ProdutoContext);

  useEffect(() => {
    // Pega todos os itens no banco
    // tem que ajsuta para pegar somente os itens do user x
    getAllProdutoProdutor();
  }, [isFocused])


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
      <Header />
      <Body>
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
    backgroundColor: '#FF8919'
  },
});

export default Loja;
