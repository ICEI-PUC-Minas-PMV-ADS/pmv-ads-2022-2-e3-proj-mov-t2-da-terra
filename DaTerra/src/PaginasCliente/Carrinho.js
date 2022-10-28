import React, { useState, useEffect } from "react";

import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import Body from "../Componentes/Body";
import Container from "../Componentes/Container";
import Header from "../Componentes/Header";
import Botao from "../Componentes/Botao";

const DATA = [
  {
    id: 1,
    nome: "Laranja Capeta",
    preco: 6.0,
    embalagem: "Kg",
  },
  {
    id: 2,
    nome: "Pera",
    preco: 12.0,
    embalagem: "Kg",
  },
  {
    id: 3,
    nome: "Abacate RUIM",
    preco: 12.0,
    embalagem: "Unidade",
  },
  {
    id: 4,
    nome: "Manga de fios",
    preco: 12.0,
    embalagem: "Unidade",
  },
  {
    id: 5,
    nome: "Abobora moranga",
    preco: 7.0,
    embalagem: "Kg",
  },
  {
    id: 6,
    nome: "Jáca",
    preco: 13.0,
    embalagem: "Kg",
  },
];

const Carrinho = () => {
  const navigation = useNavigation();
  const [valorTotal, setPrecoTotal] = useState();
  
  const precoTotal = () => {
    let soma = 0;
    
    for(let item of DATA){
      soma+=item.preco;
    }
     setPrecoTotal(soma.toFixed(2));
  };

  useEffect(() => {
    precoTotal();

  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.containerProdutos}>
      <TouchableOpacity
        onPress={() => navigation.navigate("CadastrarProduto", { item })}
      >
        <View style={{ width: 500 }}>
          <List.Item
            title={`${item.nome} (${item.embalagem})`}
            
            left={() => (
              <Image
                style={styles.img}
                source={require("../assets/maracuja.jpg")}
              />
            )}
            right={() => (
              <View style={{ flexDirection: "row" }}>
                <Text>R$ {item.preco.toFixed(2)}</Text>
              </View>
            )}
            description={`R$ ${item.preco}  / ${item.embalagem}
            `}
            
          />
          
        </View>
      </TouchableOpacity>
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
          keyExtractor={(item) => item.id}
        />
        <View style={styles.containerResultado}>
          <Text style={styles.textoResultado}>{DATA.length} Itens</Text>
          <Text style={styles.textoResultado}>Total: R$ {valorTotal}</Text>
        </View>
        <View style={styles.viewBotao}>
          <TouchableOpacity
            onPress={() => navigation.navigate("PedidoEnviado")}
          >
            <Botao
              style={styles.textoBotao}
              textoBotao="Enviar Pedido"
              mode="contained"
              buttonColor='#3d9d74'
            />
          </TouchableOpacity>
        </View>
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  containerProdutos: {
    borderRadius: 10,
    padding: 2,
    margin: 5,
    backgroundColor: "#fff",
    elevation: 5,
  },
  viewBotao: {
    marginBottom:20
  },
  botaoSeletor: {
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: "#5f9846",
    elevation: 2,
    alignSelf: "flex-end",
  },
  containerResultado: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: 310,
    marginBottom: 10,
    marginLeft: 20,
  },
  textoBotao: {
    textAlign: "center",
    fontSize: 16,
  },

  textoResultado: {
    fontSize: 18,
    fontWeight:"bold",
  },
  img: {
    width: 105,
    height: 90,
    borderRadius: 10,
    marginRight: 10,
  },
 
  fab: {
    position: "absolute",
    margin: 12,
    right: 0,
    bottom: 0,
    backgroundColor: "#FF8919",
  },
});

export default Carrinho;
