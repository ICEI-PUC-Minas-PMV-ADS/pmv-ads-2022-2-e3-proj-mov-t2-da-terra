import React, { Context, useContext } from "react";
import { Text, FlatList, Image, StyleSheet } from "react-native";
import Body from "../Componentes/Body";
import Container from "../Componentes/Container";
import Input from "../Componentes/Input";
import { TextInput, List } from "react-native-paper";
import ProdutoProvider from "../contexts/ProdutoProvider";
const BuscarProdutos = () => {
  //Abaixo seria no caso aonde pegaria os dados da busca no banco
  const {} = useContext(ProdutoProvider);
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
      <Input
        label={"Buscar produtos"}
        style={{ width: 320, marginTop: 10 }}
        right={<TextInput.Icon name="magnify" />}
      />

      <FlatList
        style={styles.listas}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </Container>
  );
};
const styles = StyleSheet.create({
  lista: {
    padding: 20,
  },
});

export default BuscarProdutos;
