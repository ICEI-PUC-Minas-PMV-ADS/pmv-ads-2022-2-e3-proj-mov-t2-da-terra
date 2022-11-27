import React, { useState, useContext, useEffect } from "react";
import {
  BackHandler, Alert
} from "react-native";
import { BottomNavigation } from "react-native-paper";
import MeusPedidos from "./MeusPedidos";
import BuscarProdutos from "./BuscarProdutos";
import MinhaConta from "../PaginasComuns/MinhaConta";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";

import { AuthContext } from "../contexts/AuthProvider";
import { PedidoContext } from "../contexts/webapi.PedidoProvider";
import { ProdutoContext } from "../contexts/webapi.ProdutoProvider";

const HomeCliente = () => {
  const [index, setIndex] = useState(0);
  const { user } = useContext(AuthContext)
  const { setPedido, getPedido } = useContext(PedidoContext)
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();
  const {
    getBuscaTodosProdutos,
    produto,
    setResultados
  } = useContext(ProdutoContext);

  // useEffect(() => {
  //   if (route.name==="HomeCliente") {
  //      console.log("Oiiii")
  //     const backAction = () => {
  //      BackHandler.exitApp() 

  //       return true;
  //     };

  //     const backHandler = BackHandler.addEventListener(
  //       "hardwareBackPress",
  //       backAction
  //     );

  //     return () => backHandler.remove();

  // }


  // }, []);

  // Renderizar na tela busca
  useEffect(() => {
    getBuscaTodosProdutos()  // Todos Produtos
      .then((res) => {
        setResultados(produto)
      });
  }, [])

  useEffect(() => {
    getPedido(user.cliente.id).then((res) => {
      setResultados(res);
      console.log(res);
    });
    //setTimeout(() => console.log(resultados[0]), 1000)
  }, [isFocused]);
  const [routes] = useState([
    { key: "buscarProdutos", title: "Buscar", focusedIcon: "magnify" },
    { key: "meusPedidos", title: "Meus pedidos", focusedIcon: "truck-fast" },
    { key: "minhaConta", title: "Minha Conta", focusedIcon: "account" },

  ]);



  const renderScene = BottomNavigation.SceneMap({
    buscarProdutos: BuscarProdutos,
    meusPedidos: MeusPedidos,
    minhaConta: MinhaConta,
  });

  return (
    <BottomNavigation
      barStyle={{ backgroundColor: '#50ac5d' }}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default HomeCliente;