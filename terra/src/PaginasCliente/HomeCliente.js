
import React, { useState, useContext, useEffect } from "react";

import { BottomNavigation } from "react-native-paper";
import MeusPedidos from "./MeusPedidos";
import BuscarProdutos from "./BuscarProdutos";
import MinhaConta from "../PaginasComuns/MinhaConta";

import { AuthContext } from "../contexts/AuthProvider";
import { PedidoContext } from "../contexts/webapi.PedidoProvider";
import { ProdutoContext } from "../contexts/webapi.ProdutoProvider";

const HomeCliente = () => {
  const [index, setIndex] = useState(0);
  const { user } = useContext(AuthContext)
  const { setPedido, getPedido } = useContext(PedidoContext)
  const {
    getBuscaTodosProdutos,
    produto,
    setResultados
  } = useContext(ProdutoContext);

  // useEffect(() => {
  //   getPedido(user.cliente.id).then(res => {
  //     setPedido(res)
  //     console.log(res)
     
  //   })
  // }, [])
  

  // Renderizar na tela busca
  useEffect(() => {
    getBuscaTodosProdutos()  // Todos Produtos
      .then((res) => {
        setResultados(produto)
      });
  }, [])

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
