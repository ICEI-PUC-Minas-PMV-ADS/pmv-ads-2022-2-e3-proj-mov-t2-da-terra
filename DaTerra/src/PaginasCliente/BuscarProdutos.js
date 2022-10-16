import React, { useContext, useState } from "react";
import { FlatList, Image, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { List, Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import Body from "../Componentes/Body";
import Container from "../Componentes/Container";

import ProdutoProvider from "../contexts/ProdutoProvider";

const data = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "alface",
    tipo: "Item de salada",
    unidade: "(Kg)",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "tomate",
    tipo: "Item de salada",
    unidade: "(Kg)",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "maca",
    tipo: "Fruta",
    unidade: "(Kg)",
  },
];

const BuscarProdutos = () => {
  //Abaixo seria no caso aonde pegaria os dados da busca no banco
  //const {} = useContext(ProdutoProvider);

  // Estudar search bar
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = (query) => {
    setSearchQuery(query);  
    for (let i = 0; i < data.length; i++) {      
      if (data[i].title == query) {
        console.log(data[i].title);        
      }
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.containerProdutos}>
      <TouchableOpacity
      // onPress={() => navigation.navigate("CadastrarProduto", { item })}
      >
        <List.Item
          title={`${item.nome}`}
          // left={() =>
          //   <Image
          //     style={styles.img}
          //     source={require("../assets/maracuja.jpg")} />}
          right={() =>
            <Text style={{ textAlignVertical: 'center' }}>R$ {item.preco}</Text>
          }
          description={`Estoque: ${item.estoque} ${item.embalagem}`}
        />
      </TouchableOpacity >
    </View>
  );

  return (
    <Container>
      <SafeAreaView>
        <Searchbar
          placeholder="Buscar Produto"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </SafeAreaView>
      <Body>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    // Estilizar
  },
  containerProdutos: {
    justifyContent: "center",
    borderRadius: 10,
    padding: 10,
    margin: 5,
    backgroundColor: '#fff',
    elevation: 5,
  },
});

export default BuscarProdutos;
