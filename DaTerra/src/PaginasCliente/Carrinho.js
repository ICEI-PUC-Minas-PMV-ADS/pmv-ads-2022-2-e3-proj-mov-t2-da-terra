import React from "react";

import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { List } from "react-native-paper";

import Body from "../Componentes/Body";
import Container from "../Componentes/Container";
import Header from "../Componentes/Header";
import Seletor from "../Componentes/Seletor";

const DATA = [
  {
    nome: "Abóbora",
    preco: 16.00,
    embalagem: 'Kg',
  },
];


const Carrinho = () => {
  const renderItem = ({ item }) => (
    <View style={styles.containerProdutos}>
      <TouchableOpacity
        onPress={() => navigation.navigate("CadastrarProduto", { item })}>
        <List.Item
          title={`${item.nome} ${item.embalagem}`}
          left={() =>
            <Image
              style={styles.img}
              source={require("../assets/maracuja.jpg")} />}
          right={() =>
            <View style={{flexDirection: 'row'}}>
              <Text>
                R$ {item.preco.toFixed(2)}
              </Text>
              <Seletor style={styles.botaoSeletor} />
            </View>
          }
          description={`R$ 8,00 / ${item.embalagem}`}
        />
      </TouchableOpacity >
    </View>
  );

  return (
    <Container>
      <Header
        title={"Carrinho"}
        // Só se houver tela empilhada        
        goBack={() => navigation.goBack()}
      />
      <Body>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </Body>
    </Container>
  );
}

const styles = StyleSheet.create({
  containerProdutos: {
    borderRadius: 10,
    padding: 2,
    margin: 5,
    backgroundColor: '#fff',
    elevation: 5,
  },
  botaoSeletor: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: '#5f9846',
    elevation: 2,
    alignSelf: 'flex-end'    
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



export default Carrinho;