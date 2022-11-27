import React, { useContext, useEffect, useState } from "react";

import { View, Text, FlatList, StyleSheet, Image } from "react-native";

import { PedidoContext } from "../contexts/webapi.PedidoProvider";
import { List, Appbar, Divider } from "react-native-paper";
import Body from "../Componentes/Body";
import Container from "../Componentes/Container";
import Header from "../Componentes/Header";
import { AuthContext } from "../contexts/AuthProvider";

import { useNavigation,useIsFocused } from "@react-navigation/native";

const MeusPedidos = () => {
  const navigation = useNavigation();
  const { pedido, putPedido, getPedido, setPedido } = useContext(PedidoContext);
  const { user } = useContext(AuthContext);
  const isFocused=useIsFocused()
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    getPedido(user.cliente.id).then((res) => {
      setResultados(res);
      console.log(res);
    });
    console.log(isFocused)
    //setTimeout(() => console.log(resultados[0]), 1000)
  }, []);
  useEffect(() => {
    getPedido(user.cliente.id).then((res) => {
      setResultados(res);
      console.log(res);
    });
    //setTimeout(() => console.log(resultados[0]), 1000)
  }, [isFocused]);
  const renderItem = ({ item }) => {
    return (
      <View style={{ marginTop: 20 }}>
        <List.Item
          title={`Pedido #${item.id}`}
          titleStyle={{
            fontSize: 20,
            fontWeight: "bold",
            lineHeight: 22,
            marginBottom: 8,
          }}
          right={() => (
            <>
              <View style={{ flexDirection: "column", marginTop: 40 }}>
                <Text style={styles.textPrecoTotal}>
                  R${item.precoTotalPedido.toFixed(2)}
                </Text>
                <Text style={styles.textDataPedido}>{item.dataPedido}</Text>
              </View>
            </>
          )}
          description={
            <>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <List.Icon icon={item.aprovado ? "check" : "clock-outline"} />
                <Text
                  style={
                    item.status == "Pedido Enviado"
                      ? styles.esperandoAprovacao
                      : styles.aprovado
                  }
                >{`${item.status == "Pedido Enviado"
                    ? "Aguardando aprovação"
                    : "Aprovado"
                  }`}</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <List.Icon icon="store" />
                <Text style={{ fontSize: 16 }}>{item.loja}</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <List.Icon icon="calendar-check-outline" />
                <Text style={{ fontSize: 16 }}>{item.dataPedido}</Text>
              </View>
            </>
          }
        />
        {item.status == "Pedido Aceito" && (
          <>
            <View style={styles.viewClienteAviso}>
              <List.Icon icon="truck-check" />
              <Text style={styles.avisoCliente}>
                Pedido Enviado
              </Text>
            </View>
          </>
        )}

        <Divider style={{ borderWidth: 0.35, marginBottom: 5 }} />
      </View>
    );
  };

  return (
    <Container>
      <Header title={"Meus pedidos"}>
        <Appbar.Action
          style={{ marginRight: 10 }}
          icon="cart"
          onPress={() => navigation.navigate("Carrinho")}
        />
      </Header>
      <Body>
        {/* ESTÁ DANDO ERRO QUANDO ESTÁ VAZIO */}
        {resultados.length == 0 && (
          <View style={styles.viewPedidosVazio}>
            <Image
              style={styles.imgPedidos}
              source={require("../assets/Pedido_vazio.png")}
            />
            <Text style={styles.textAvisoPedidosVazio}>
              Parece que você não tem nenhum pedido no momento
            </Text>
            <Text style={styles.textAvisoPedidosVazio}>
              Quando você comprar algum produto,ele aparecerá bem aqui
            </Text>
          </View>
        )}
        <FlatList
          data={resultados}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  /* FlatList */
  textDataPedido: {
    fontWeight: "bold",
    marginTop: 15,
    fontSize: 16,
  },
  viewPedidosVazio: {
    alignSelf: "center",
    marginTop: 110,
  },
  textAvisoPedidosVazio: {
    fontSize: 20,
    textAlign: "center",
    letterSpacing: 0.9,
    paddingLeft: 4,
    paddingRight: 4,
  },

  imgPedidos: {
    width: 120,
    height: 120,
    alignSelf: "center",
  },
  textPrecoTotal: {
    textAlignVertical: "center",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 35,
    marginLeft: 55,
  },
  aprovado: {
    fontSize: 16,
    fontWeight: "bold",
    borderRadius: 10,
    backgroundColor: "#6cc438",
    padding: 7,
  },
  viewClienteAviso: {
    justifyContent: "center",
    alignSelf: "flex-end",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  avisoCliente: {
    padding: 6,
    marginBottom: 3,
    fontSize: 16,
    letterSpacing: 1,
    borderRadius: 16,
    backgroundColor: "#FF6B1A",
    fontWeight: "bold",
    height: 40,
    maxWidth: 200,
    textAlignVertical: 'center',
  },
  esperandoAprovacao: {
    fontSize: 16,
    fontWeight: "bold",
    borderRadius: 12,
    backgroundColor: "#EDD251",
    padding: 7,
  },
});

export default MeusPedidos;
