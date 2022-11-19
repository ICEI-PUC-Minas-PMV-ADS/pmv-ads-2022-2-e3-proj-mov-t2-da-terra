import React, { useState, useEffect, useContext } from "react";

import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { List, Button, Snackbar, TextInput } from "react-native-paper";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AuthContext } from "../contexts/AuthProvider";
import { ProdutoContext } from "../contexts/webapi.ProdutoProvider";
import {
  deleteCarrinho,
  getCarrinho,
  insertCarrinho,
} from "../DBService/DBCarrinho";
import Database from "../DBService/DBService";
import Body from "../Componentes/Body";
import Container from "../Componentes/Container";
import Header from "../Componentes/Header";
import Botao from "../Componentes/Botao";

const Carrinho = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const { produto, getAllProduto, getProdutoCarrinho, produtoCarrinhoApi } = useContext(ProdutoContext);
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);
  //Produtos do carrinho
  const [cartProdutos, setCartProdutos] = useState([]);
  const [valorTotal, setPrecoTotal] = useState(0);

  const [resultados, setResultados] = useState([]);

  const precoTotal = () => {
    let soma = 0;
    if (cartProdutos != undefined) {
      for (let item of cartProdutos) {
        soma += item.preco;
      }
      setPrecoTotal(soma.toFixed(2));
    }
  };

  // TESTE CARLOS TOTAL
  // const Total = () => {
  //   let soma = 0;
  //   for (let i in resultados) {
  //     soma += resultados[i].preco;
  //     console.log(resultados[i].preco);
  //   }
  //   setPrecoTotal(soma);
  //   console.log("soma: ", soma)
  // }

  // TESTES CARLOS
  useEffect(() => {
    Database.getConnection();

    getCarrinho(user.cliente.id)
      .then((res) => {
        console.log(res);
        setResultados(res);
      })   
    .then(() => {
      let soma = 0;
      for (let i in resultados) {
        soma += resultados[i].preco;
        console.log(resultados[i].preco);
      }
      setPrecoTotal(soma);
      console.log("soma: ", soma)
    })
  }, []);




  // TESTES GABRIEL
  // useEffect(() => {
  //   // deleteCarrinho(2)
  //   //Abre conexão com banco sqlite do app
  //   Database.getConnection();
  //   //Vai iterar sobre o resultados da get do carrinho e buscar o produto ,mas essa merd não vai
  //   //de primeira
  //   getCarrinho(user.cliente.id)
  //     .then((res) => {
  //       //Pega o id de cada produto de cada item do carrinho e busca na api
  //       let b = [];

  //       for (let i of res) {
  //         getProduto(i.idProduto)
  //           .then((produto) => {
  //             b.push(produto);
  //             // console.log(b)
  //           })
  //           .catch((e) => console.log(e));
  //       }
  //       setCartProdutos(b); // Pega os ID
  //       // console.log(cartProdutos)      

  //     })
  //     .catch((e) => console.log(e));
  //   console.log(cartProdutos); // os ID

  //   // for (let i in produtoCarrinho) {
  //   //   console.log("aqui", i + " = " + Object.values(produtoCarrinho));
  //   // }

  //   precoTotal();
  // }, []);

  // const add = () => {
  //   insertCarrinho({
  //     idCliente: 1,
  //     idProdutor: 1,
  //     idProduto: 5,
  //     quantidadeProduto: 1,
  //     precoTotal: 7.98,
  //   })
  //     .then()
  //     .catch((e) => console.log(e));
  // };
  const deleteItemCarrinho = (idProduto) => {

    onToggleSnackBar();

    deleteCarrinho(idProduto)
    //   .then((resposta) => console.log(resposta))
    //   .catch((e) => console.log(e));
  };

  const renderItem = ({ item }) => (
    <View style={styles.containerProdutos}>
      <TouchableOpacity
      // onPress={() => navigation.navigate("CadastrarProduto", { item })}
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
              <>
                <View style={styles.viewRemover}>
                  <Text>
                    <TouchableOpacity onPress={() => deleteItemCarrinho(item.id)}>
                      <Text style={styles.removerCarrinho}>Remover</Text>
                    </TouchableOpacity>
                  </Text>
                </View>
              </>
            )}
            description={`R$ ${item.preco != undefined ? item.preco : 0} / ${item.embalagem != undefined ? item.embalagem : ""
              }
            `}
          />
        </View>
        {/* <Text style={styles.removerCarrinho}>asdasda</Text> */}
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
          data={resultados}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />

        <View style={styles.containerResultado}>
          <Text style={styles.textoResultado}>
            {resultados != undefined ? resultados.length : 0} Itens
          </Text>

          <Text
            style={styles.textoResultado}
          >Total: R$ {valorTotal ? valorTotal.toFixed(2) : 0}
          </Text>

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
          <TouchableOpacity onPress={() => { }}>
            <Snackbar
              visible={visible}
              duration={2000}
              elevation={4}
              onDismiss={onDismissSnackBar}
              action={{
                label: "Ok",
              }}
            >
              Produto removido do seu carrinho
            </Snackbar>

            {/* {visible==false &&(

            
            <View style={{ marginTop: 20 }}>
              <Botao
                style={styles.textoBotao}
                textoBotao="Adicionar produto ao carrinho"
                mode="contained"
                buttonColor="#3d9d74"
              />
            </View>
            )} */}
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
  removerCarrinho: {
    marginRight: 180,
    fontSize: 17,
    letterSpacing: 1.7
  },
  viewRemover: {
    flexDirection: "row",
    marginTop: 70,
    marginRight: 50,
    width: 200
  }
});

export default Carrinho;
