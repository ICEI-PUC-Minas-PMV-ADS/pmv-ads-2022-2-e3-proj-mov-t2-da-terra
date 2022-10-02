import React, { useContext, useState } from "react";
import { FlatList, Image, StyleSheet } from "react-native";
import { List, Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import Body from "../Componentes/Body";
import Container from "../Componentes/Container";

import ProdutoProvider from "../contexts/ProdutoProvider";

const BuscarProdutos = () => {
  //Abaixo seria no caso aonde pegaria os dados da busca no banco
  //const {} = useContext(ProdutoProvider);
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "Alface",
      tipo: "Item de salada",
      unidade: "(Kg)",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Abobrinha",
      tipo: "Item de salada",
      unidade: "(Kg)",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Maracujá",
      tipo: "Fruta",
      unidade: "(Kg)",
    },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);

  const renderItem = ({ item }) => (
    <List.Item
      style={styles.lista}
      title={item.title}
      description={item.tipo + " " + item.unidade}
      right={(props) => (
        <List.Icon
          {...props}
          color={item.tipo == "Item de salada" ? "green" : "orange"}
          icon={
            item.tipo == "Fruta"
              ? require("../assets/frutas-icon.png")
              : require("../assets/salada-icon.png")
          }
        />
      )}
    />
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
          style={styles.lista}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    // Estilizar
  },
  lista: {   
    padding: 20,
  },
});

export default BuscarProdutos;
