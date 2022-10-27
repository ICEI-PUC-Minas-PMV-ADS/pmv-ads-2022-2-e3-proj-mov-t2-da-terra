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
  //Provider com as informações do usuário logado  
  const { user, setUser } = useContext(AuthContext)
  const isFocused = useIsFocused();

  const { produto, getProduto, deleteProduto, getAllProduto } = useContext(ProdutoContext);

  useEffect(() => {
    //getProduto(18);
    getAllProduto();

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

  // // Parar Testes ok  
  // const busca = (id) => {
  //   getProduto(id);
//}
  
  // Para testes
  const listar = () => {    
    // for (let i in produto) {
    //   console.log(i + ' = ' + produto[i]);
    // }
        
    console.log(produto);
    //console.log(result);
  }

  return (
    <Container>
      <Header title={user.nomeLoja}></Header>
      <Body>
        {/* <FlatList
          data={produto}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />      */}
        <FAB          
          small
          icon="plus"
          onPress={() => listar()}
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
