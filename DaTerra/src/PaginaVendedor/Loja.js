import React, { useContext, useState, useEffect } from "react";
import { 
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { FAB, List } from "react-native-paper";

import Body from "../Componentes/Body";
import Container from "../Componentes/Container";
import Header from "../Componentes/Header";

import { AuthContext } from "../contexts/AuthProvider";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { getProdutos } from "../DBService/DBProduto";

const Loja = () => {

  const navigation = useNavigation();
  const { usuario } = useContext(AuthContext);
  const [produto, setProduto] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getProdutos().then(dados => {
      // console.log(dados);
      setProduto(dados);
    }).catch(error => console.log(error))
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <View style={styles.containerProdutos}>
      <TouchableOpacity onPress={() => navigation.navigate("EditarProduto")}>
        <Image
          style={styles.img}
          source={require("../assets/maracuja.jpg")}
        />
        <List.Item
          title={`${item.nome} R$ ${item.preco}\n`}
          description={`Estoque: ${item.estoque} ${item.embalagem}`}
        />
      </TouchableOpacity >
    </View>
  );

  return (
    <Container>
      <Body>
        <Header title={usuario.nomeLoja}></Header>
        <FlatList
          data={produto}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
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
    justifyContent: "center",
    borderRadius: 10,
    padding: 25,
    margin: 4,
    backgroundColor: '#fff',
    elevation: 5,
  },
  img: {
    width: 127,
    height: 100,
    borderRadius: 10,
  },
  fab: {
    position: "absolute",
    margin: 12,
    right: 0,
    bottom: 0,
    backgroundColor: '#9fd09d'
  },
});

export default Loja;
