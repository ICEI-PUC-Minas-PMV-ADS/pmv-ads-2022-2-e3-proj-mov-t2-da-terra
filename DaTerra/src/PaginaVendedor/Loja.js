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
import { getProdutos } from "../DBService/DBProduto";
import { getUsuario } from "../DBService/DBUsuario";

const Loja = () => {

  const navigation = useNavigation();
  //Provider com as informações do usuário logado  
  const { user, setUser } = useContext(AuthContext)
  const [produto, setProduto] = useState([]);
  const isFocused = useIsFocused();
  //const[loja,setLoja]=useState([])

  // ALTERADO PARA TESTES - falta setar
  useEffect(() => {
    getProdutos().then(dados => {
      // console.log(dados);
      // setLoja[produtos[0]]
      setProduto(dados);
    }).catch(error => console.log(error))

    // ERRO DE PROMISSE
    // getUsuario(3).then((usuario)=>{
    //   setUser(usuario[0])//Aqui seta para o user o array encontrado de acordo com o id passado,
    //  console.log(user.email)//teste da variável user OK
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
            <Text style={{ textAlignVertical: 'center' }}>R$ {item.preco}</Text>
          }
          description={`Estoque: ${item.estoque} ${item.embalagem}`}
        />
      </TouchableOpacity >
    </View>
  );

  return (
    <Container>
      <Body>
        <Header title={user.nomeLoja}></Header>
        <FlatList
          data={produto}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          // numColumns={2}
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
    backgroundColor: '#9fd09d'
  },
});

export default Loja;
