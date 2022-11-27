import React, { useState, useEffect, useContext } from "react";

import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  BackHandler
} from "react-native";

import { List, Snackbar } from "react-native-paper";
import { AuthContext } from "../contexts/AuthProvider";

import {
  deleteCarrinho,
  getCarrinho,
  deleteCarrinhoCliente,

} from "../DBService/DBCarrinho";

import Database from "../DBService/DBService";
import Body from "../Componentes/Body";
import Container from "../Componentes/Container";
import Header from "../Componentes/Header";
import Botao from "../Componentes/Botao";
import { useNavigation,useRoute } from "@react-navigation/native";

import { PedidoContext } from "../contexts/webapi.PedidoProvider";

const Carrinho = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const route = useRoute();

  // Snack
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  // Produtos do carrinho
  const [valorTotal, setPrecoTotal] = useState(0);
  const [removed, setRemoved] = useState(false);

  // Context do pedido
  const {
    postPedido,
    resultados,
    setResultados
  } = useContext(PedidoContext);

  // Tabela Pedidos  
  const enviarPedido = () => {
    postPedido({
      clienteId: resultados[0].idCliente,
      produtorId: resultados[0].idProdutor,
      precoTotalPedido: valorTotal,
      status: "Pedido Enviado",
    }).then(res => console.log(res));
    // Itens rodando no webapi.PedidosProvider

    deleteCarrinhoCliente(resultados[0].idCliente)
    .then(response=>console.log(response))
    .catch(e=>console.log(e))
    navigation.navigate("PedidoEnviado");
  };

  useEffect(() => {
    Database.getConnection();

    getCarrinho(user.cliente.id)
      .then((res) => {
        console.log(res);
        setResultados(res);
        let soma = 0
        for (let i in res) {
          soma += res[i].precoTotal;
          setPrecoTotal(soma);
        }
      })
  }, [visible],enviarPedido);
  
  useEffect(() => {
    if (route.name==="Carrinho") {
      const backAction = () => {
       navigation.goBack()
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      return () => backHandler.remove();
  
  }

    
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
          style={{textAlign:"center"}}
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
              }      Total: R$${(item.preco*item.quantidadeProduto).toFixed(2)}
              
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
              duration={1500}
              elevation={4}
              onDismiss={onDismissSnackBar}
              action={{
                label: "Ok",
              }}
            >
              Produto removido do seu carrinho
            </Snackbar>
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
