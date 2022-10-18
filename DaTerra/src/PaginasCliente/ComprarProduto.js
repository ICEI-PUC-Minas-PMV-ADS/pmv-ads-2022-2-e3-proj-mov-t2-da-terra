import React, { useState, useEffect, useContext } from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

import { Button, FAB, List } from "react-native-paper";

import Body from "../Componentes/Body";
import Container from "../Componentes/Container";
import Header from "../Componentes/Header";

import { useNavigation, useIsFocused } from "@react-navigation/native";
import { getProdutos, getProdutosCompras } from "../DBService/DBProduto";

import ProdutoProvider from "../contexts/ProdutoProvider";

const ComprarProduto = ({ route }) => {

  // Alterar Rota para provider
  const { item } = route.params ? route.params : {};

  //const { produto } = useContext(ProdutoProvider);
  //console.log(produto);

  const navigation = useNavigation();

  const [resultado, setResultado] = useState([]);
  const isFocused = useIsFocused();

  console.log(item); // Item ok (via rota)


  useEffect(() => {
    getProdutosCompras(1).then(dados => {
      setResultado(dados);
    }).catch(error => console.log(error))
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <View>
      <View>
        <Text style={styles.textTitulos}>{item.nome}</Text>
        <Image
          style={styles.img}
          source={require("../assets/maracuja.jpg")} />
      </View>
      <View style={styles.viewBotaoSeletorQtd}>       
        <TouchableOpacity
          style={styles.botaoSeletorQtd}
        >
          <Text style={styles.textBotaoSeletorQtd}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botaoSeletorQtd}
        >
          <Text style={styles.textBotaoSeletorQtd}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Container>
      <Header title={'Compras'}
        goBack={() => navigation.goBack()} />
      <Body>
        <FlatList
          data={resultado}
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
    padding: 10,
    margin: 5,
    backgroundColor: '#fff',
    elevation: 5,
  },
  img: {
    width: 254,
    height: 200,
    borderRadius: 10,
    marginRight: 10,
    alignSelf: 'center',
  },
  textTitulos: {
    marginTop: 14,
    textAlignVertical: 'center',
    marginLeft: 14,
    fontSize: 32,
    lineHeight: 34,
    fontWeight: 'bold'
  },
  botaoSeletorQtd: {   
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,    
    borderRadius: 50,
    backgroundColor: '#5f9846',
  },
  viewBotaoSeletorQtd: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textBotaoSeletorQtd: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default ComprarProduto;