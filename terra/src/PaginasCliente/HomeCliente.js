import React, { useState, useContext, useEffect } from "react";
import { BottomNavigation } from "react-native-paper";
import { StyleSheet } from "react-native";

import MeusPedidos from "./MeusPedidos";
import BuscarProdutos from "./BuscarProdutos";
import MinhaConta from "../PaginasComuns/MinhaConta";

import { ProdutoContext } from "../contexts/webapi.ProdutoProvider";

const HomeCliente = () => {
  const [index, setIndex] = useState(0);

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

  // Renderizar na tela busca
  useEffect(() => {
    //console.log(user);
    getBuscaProdutoCliente()  // Todos Produtos
      .then((res) => {
        setResultados(produto)
      });
  }, [])

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
const styles = StyleSheet.create({});

export default HomeCliente;
