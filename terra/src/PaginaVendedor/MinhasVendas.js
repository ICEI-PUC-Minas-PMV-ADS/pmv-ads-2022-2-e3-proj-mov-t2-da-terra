import React, { useContext, useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
} from "react-native";
import { Button, List, Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import Body from "../Componentes/Body";
import Container from "../Componentes/Container";
import Header from "../Componentes/Header";

import { PedidoContext } from "../contexts/webapi.PedidoProvider";
import { AuthContext } from "../contexts/AuthProvider";
import { UsuarioContext } from "../contexts/webapi.CadastroUsuario";

const MinhasVendas = () => {
  const navigation = useNavigation();
  const [resultados, setResultados] = useState([]); // Pedidos
  const [nomeCliente,setNomeCliente] = useState(); // Exibir nome tela
  const [itemResultado, setItemResultado] = useState([]);
  //Um "Contador" para poder ser o "arrayWatch" do useEffect do getPedidos
  //Para sempre que o vendedor aceitar, dar outro getPedidos e atualizar automaticamente a tela
  const [hasChange, setHasChange] = useState(0);
  const {
    getPedidoProdutor,
    aceitePedido,
    recusaPedido,
    getItensPedido,
    itensPedido,
    setItensPedido,
  } = useContext(PedidoContext);
  const { user } = useContext(AuthContext);
  const { getCliente } = useContext(UsuarioContext);

  // Id do pedido (é um GET)
  const aceitarPedido = (id) => {
    aceitePedido(id)
      .then((response) => console.log(response))
      .catch((e) => console.log(e));
    setHasChange(hasChange + 1);
  };

  const recusarPedido = (id) => {
    recusaPedido(id)
      .then((response) => console.log(response))
      .catch((e) => console.log(e));
    setHasChange(hasChange + 1);
  };
  const passPedidoRota = (pedido) => {
    setItensPedido(pedido);
    navigation.navigate("ItensPedido")
  };

  // EM TESTES
  useEffect(() => {
    let produtos = [];
    let idPedido = [];
    let id = 0;
    getPedidoProdutor(user.produtor.id).then((res) => {
      id = Object.values(res);
      idPedido.push(Object.values(res)); // EM TESTES
      // idPedido.push(Object.values(res));
      //console.log(id[0].clienteId)
      //    console.log(idPedido);
      setResultados(res);

      if (id != null) {
        getCliente(id[0].clienteId).then((res) => {
          let resNomeCliente = Object.values(res);
          setNomeCliente(resNomeCliente[1]);
          // console.log(res)
          resultados.push(resNomeCliente)
          // console.log(nomeCliente)
        });
      }
      if (idPedido) {
        let cont = 0;
        for (let i in idPedido[0]) {
          // console.log(`idPedido[0][${cont}] `, idPedido[0][cont]);
          let x = Object.values(idPedido[0][cont]);
          //  console.log("x[0]: ", x[0]); // id pedido
          cont++;
          //console.log("x[0]: ", x[0]);
          getItensPedido(x[0]).then((res) => {
            // console.log("RES: ", res.ItemResultado); // RES Está correta. Renderizando errado. Renderiza sempre os itens do último pedido
            // produtos.push(res.ItemProduto)
            console.log(res[0].id);
            produtos.push(res[0]);
          
          });
        }
        console.log("oiiii");
        console.log(resultados)
        // console.log(produtos[0])
      }
    });
    console.log(resultados)
  }, [hasChange]);

  const renderItem = ({ item}) => {
    return (
      <View>
        {/* Número do Pedido / Preço / Usuário */}
        <List.Item
          title={`Pedido Nº ${item.id}`}
          titleStyle={{
            fontSize: 20,
            fontWeight: "bold",
            lineHeight: 22,
            marginBottom: 8,
          }}
          right={() => (
            <Text
              style={{
                textAlignVertical: "center",
                fontWeight: "bold",
                marginRight: 10,
                fontSize: 18,
              }}
            >
               Total :R$ {item.precoTotalPedido.toFixed(2)}
            </Text>
          )}
          description={
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <List.Icon icon="account" />
              <Text style={{ fontSize: 16 }}>{nomeCliente}</Text>
            </View>
          }
        />
        {/* Itens */}
        <TouchableOpacity
        onPress={()=>passPedidoRota(item)}
        >
          <View style={{ flexDirection: "row", marginLeft: 15 }}>
            <List.Icon styles={{ marginBottom: -20 }} icon="basket" />
            <Text
              style={{
                height: 70,
                marginTop: -10,
                textAlignVertical: "center",
                fontSize: 20,
              }}
            >
              Itens
            </Text>
          </View>
        </TouchableOpacity>

        {/* Botão Recusar / Aceitar */}

        <View style={styles.viewBotao}>
          {item.status == "Pedido Enviado" && (
            <>
              <Button
                style={styles.botao}
                mode="contained"
                buttonColor={"#D32F2F"}
                onPress={() => recusarPedido(item.id)}
              >
                <Text style={styles.textoBotao}>Recusar</Text>
              </Button>
              <Button
                style={styles.botao}
                mode="contained"
                buttonColor={"#3d9d74"}
                onPress={() => aceitarPedido(item.id)}
              >
                <Text style={styles.textoBotao}>Aceitar</Text>
              </Button>
            </>
          )}
          {item.status == "Pedido Aceito" && (
            <>
              <List.Icon icon={"clock-outline"} />

              <View style={styles.viewAvisoVendedor}>
                <Text style={styles.avisoVendedor}>
                  O Cliente está aguardando o envio do Pedido{" "}
                </Text>
              </View>
            </>
          )}
          {item.status == "Pedido Recusado" && (
            <>
              <List.Icon icon={"account-remove"} />

              <View style={styles.viewAvisoVendedor}>
                <Text style={styles.avisoVendedorRecusado}>
                  Você recusou o pedido de Nº{item.id}
                </Text>
              </View>
            </>
          )}
        </View>
        <Divider style={{ borderWidth: 0.35, marginBottom: 5 }} />
      </View>
    );
  };

  return (
    <Container>
      <Header title={"Minhas Vendas"} />
      <Body>
        <View style={styles.viewFlatList}>
          <FlatList
            data={resultados}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  /* FlatList */
  viewFlatList: {
    flexDirection: "row",
    // padding: 5,
  },

  // Botões
  viewBotao: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  botao: {
    width: 140,
    marginTop: 8,
    marginBottom: 18,
  },
  textoBotao: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  viewAvisoVendedor: {
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
    marginLeft: -40,
  },
  avisoVendedor: {
    padding: 7,
    marginBottom: 26,
    fontSize: 16,
    letterSpacing: 0.5,
    borderRadius: 12,
    backgroundColor: "#EDD251",
    fontWeight: "bold",
    height: 60,
    width: 250,
    textAlignVertical: "center",
    textAlign: "center",
  },
  avisoVendedorRecusado: {
    padding: 7,
    marginBottom: 26,
    fontSize: 18,
    letterSpacing: 0.5,
    borderRadius: 12,
    backgroundColor: "#D32F2F",
    fontWeight: "bold",
    height: 60,
    width: 250,
    color: "white",
    textAlignVertical: "center",
    textAlign: "center",
  },

  // Menu Superior - Segmented
  viewBotaoSegmented: {
    flexDirection: "row",
    justifyContent: "center",
  },
  botaoSegmented: {
    flexGrow: 1,
    flexShrink: 1,
    backGroundColor: "#ccc",
    borderRadius: -50,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderColor: "#ccc",
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  textoBotaoSegmented: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
  },
});

export default MinhasVendas;
