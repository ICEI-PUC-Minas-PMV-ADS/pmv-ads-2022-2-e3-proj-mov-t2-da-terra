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
import { PedidoContext } from "../contexts/webapi.PedidoProvider";

const Carrinho = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const { produto, getAllProduto, getProdutoCarrinho, produtoCarrinhoApi } =
    useContext(ProdutoContext);
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  // Produtos do carrinho
  const [valorTotal, setPrecoTotal] = useState(0);
  const [removed, setRemoved] = useState(false);
  const [resultados, setResultados] = useState([]);

  // Pedido
  const { postPedido } = useContext(PedidoContext);

  const enviarPedido = () => {
    for (let i in resultados) {
      postPedido({
        clienteId: resultados[i].idCliente,
        produtorId: resultados[i].idProdutor,
        produtoId: resultados[i].idProduto,
        precoTotalPedido: valorTotal,
        status: "Pedido Enviado",
      }).then(res => console.log(res));

    }
    //navigation.navigate("PedidoEnviado");
    //VAI TER COISA AQUI DEPOIS
  };


  // useEffect(() => {
  //   Database.getConnection();

  //   getCarrinho(user.cliente.id)
  //     .then((res) => {
  //       console.log(res);
  //       setResultados(res);
  //     })
  //     .then(() => {
  //       let soma = 0;
  //       for (let i in resultados) {
  //         soma += resultados[i].preco;
  //         console.log(resultados[i].preco);
  //       }

  //       setPrecoTotal(soma);

  //       console.log("soma: ", soma);
  //     });
  // }, []);

  useEffect(() => {
    Database.getConnection();

    getCarrinho(user.cliente.id)
      .then((res) => {
        console.log(res);
        setResultados(res);
        let soma = 0
        for (let i in res) {
          soma += res[i].preco;
          setPrecoTotal(soma);
        }
      })   
  }, []);

  const deleteItemCarrinho = (idProduto) => {
    onToggleSnackBar();

    deleteCarrinho(idProduto)
      .then((resposta) => {
        setRemoved(true);
      })
      .catch((e) => console.log(e));
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
                    <TouchableOpacity
                      onPress={() => deleteItemCarrinho(item.id)}
                    >
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
        {resultados.length == 0 && (
          <View style={styles.viewCarrinhoVazio}>
            <Image
              style={styles.imgCarrinho}
              source={require("../assets/Carrinho_vazio.png")}
            />
            <Text style={styles.textAvisoCarrinhoVazio}>
              Ops...Carrinho Vazio
            </Text>
            <Text style={styles.textAvisoCarrinhoVazio}>
              Adicione alguns produtos para aparecer aqui
            </Text>
          </View>
        )}
        <FlatList
          data={resultados}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        {resultados.length != 0 && (
          <View style={styles.containerResultado}>
            <Text style={styles.textoResultado}>
              {resultados != undefined ? resultados.length : 0} Itens
            </Text>

            <Text style={styles.textoResultado}>
              Total: R$ {valorTotal ? valorTotal.toFixed(2) : 0}
            </Text>
          </View>
        )}
        <View style={styles.viewBotao}>
          {resultados.length > 0 && (
            <TouchableOpacity onPress={() => enviarPedido()}>
              <Botao
                style={styles.textoBotao}
                textoBotao="Enviar Pedido"
                mode="contained"
                buttonColor="#3d9d74"
              />
            </TouchableOpacity>
          )}
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
  imgCarrinho: {
    width: 90,
    height: 90,
    alignSelf: "center"
  },
  viewCarrinhoVazio: {
    alignSelf: "center",
    marginTop: 180,

  },
  textAvisoCarrinhoVazio: {
    fontSize: 22,
    textAlign: "center",
    letterSpacing: 1.7,
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
    fontSize: 16,
    letterSpacing: 1.7,
  },
  viewRemover: {
    flexDirection: "row",
    marginTop: 70,
    marginRight: 50,
    width: 200,
  },
});

export default Carrinho;
