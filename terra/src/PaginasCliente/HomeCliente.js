
import React, { useState, useContext, useEffect } from "react";
import {
  BackHandler,Alert
} from "react-native";
import { BottomNavigation } from "react-native-paper";
import { StyleSheet } from "react-native";

import MeusPedidos from "./MeusPedidos";
import BuscarProdutos from "./BuscarProdutos";
import MinhaConta from "../PaginasComuns/MinhaConta";
import { useNavigation,useRoute } from "@react-navigation/native";

import { AuthContext } from "../contexts/AuthProvider";
import { PedidoContext } from "../contexts/webapi.PedidoProvider";

import { ProdutoContext } from "../contexts/webapi.ProdutoProvider";

const HomeCliente = () => {
  const [index, setIndex] = useState(0);
  const { user } = useContext(AuthContext)
  const { setPedido, getPedido } = useContext(PedidoContext)
  const navigation = useNavigation();
  const route = useRoute();
  const {
    // getBuscaTodosProdutos,
    // produto,
    // setResultados
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

  useEffect(() => {
    getPedido(user.cliente.id).then(res => {

      setPedido([res])


    }).catch(e => console.log(e))


  }, [])
  // Renderizar na tela busca
  useEffect(() => {
    //console.log(user);
    getBuscaProdutoCliente()  // Todos Produtos
      .then((res) => {
        setResultados(produto)
      });
  }, [])

  const [routes] = useState([
    { key: "buscarProdutos", title: "Buscar", focusedIcon: "magnify" },
    { key: "meusPedidos", title: "Meus pedidos", focusedIcon: "truck-fast" },
    { key: "minhaConta", title: "Minha Conta", focusedIcon: "account" },

  ]);

  const {
    produto,
    getBuscaProdutoCliente,
    setResultados
  } = useContext(ProdutoContext);



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
