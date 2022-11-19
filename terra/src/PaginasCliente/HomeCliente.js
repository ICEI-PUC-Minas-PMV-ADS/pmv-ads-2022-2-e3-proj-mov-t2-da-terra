import React, { useState  } from "react";
import { BottomNavigation } from "react-native-paper";
import { StyleSheet } from "react-native";

import MeusPedidos from "./MeusPedidos";
import BuscarProdutos from "./BuscarProdutos";
import MinhaConta from "../PaginasComuns/MinhaConta";
import Carrinho from "../PaginasCliente/Carrinho"
import { AuthContext } from "../contexts/AuthProvider";

const HomeCliente = () => {
  //  const {} = useContext(AuthContext);
  const [index, setIndex] = useState(0);

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
const styles = StyleSheet.create({});

export default HomeCliente;
