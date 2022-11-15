import React, { useState, useEffect, useContext } from "react";

import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { List } from "react-native-paper";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AuthContext } from "../contexts/AuthProvider";
import { ProdutoContext } from "../contexts/webapi.ProdutoProvider";
import { getCarrinho, insertCarrinho } from "../DBService/DBCarrinho";

import Body from "../Componentes/Body";
import Container from "../Componentes/Container";
import Header from "../Componentes/Header";
import Botao from "../Componentes/Botao";

const Carrinho = () => {
  const navigation = useNavigation();
  const { idLogado, user } = useContext(AuthContext);
  const { produto, getAllProduto } = useContext(ProdutoContext);
  const [valorTotal, setPrecoTotal] = useState(0);


  const precoTotal = () => {
    let soma = 0;
    if (produto != undefined) {
      for (let item of produto) {
        soma += item.preco;
      }

      setPrecoTotal(soma.toFixed(2));


    }


  }
  useEffect(() => {
    getCarrinho(idLogado)
    console.log(valorTotal);
    precoTotal()


    // console.log(user.cliente.nome)
  }, []);
  const add = () => {
    insertCarrinho(
      {
        idCliente: 1,
        idProdutor: 1,
        idProduto: 5,
        quantidadeProduto: 1,
        precoTotal: 7.98


      }


    ).then()
      .catch(e => console.log(e))


  }



  const renderItem = ({ item }) => (
    <View style={styles.containerProdutos}>
      <TouchableOpacity
        onPress={() => navigation.navigate("CadastrarProduto", { item })}
      >
        <View style={{ width: 500 }}>
          <List.Item
            title={`${item.nome != undefined ? item.nome : ""} (${item.embalagem ? item.embalagem : ""
              })`}
            left={() => (
              <Image
                style={styles.img}
                source={require("../assets/maracuja.jpg")}
              />
            )}
            right={() => (
              <View style={{ flexDirection: "row" }}>
                <Text>
                  R$ {item.preco != undefined ? item.preco.toFixed(2) : 0}
                </Text>
              </View>
            )}
            description={`R$ ${item.preco != undefined ? item.preco : 0}  / ${item.embalagem != undefined ? item.embalagem : ""
              }
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
          data={produto}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <View style={styles.containerResultado}>
          <Text style={styles.textoResultado}>
            {produto != undefined ? produto.length : 0} Itens
          </Text>
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
              buttonColor="#3d9d74"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={add}
          >
            <Botao
              style={styles.textoBotao}
              textoBotao="ADD CARRINHO"
              mode="contained"
              buttonColor="#3d9d74"
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
    marginBottom: 20,
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
    fontWeight: "bold",
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
