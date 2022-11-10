import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Loja from "../PaginaVendedor/Loja";
import MinhasVendas from "../PaginaVendedor/MinhasVendas";
 import BuscarProdutos from "../PaginasCliente/BuscarProdutos";
import HomeVendedor from "../PaginaVendedor/HomeVendedor";
import HomeCliente from "../PaginasCliente/HomeCliente";
import MinhaConta from "../PaginasComuns/MinhaConta";
import Login from "../PaginasComuns/Login";
import CadastroUsuario from "../PaginasComuns/CadastroUsuario";
import CadastrarProduto from "../PaginaVendedor/CadastrarProduto";
import ComprarProduto from "../PaginasCliente/ComprarProduto";
import PedidoEnviado from "../PaginasCliente/PedidoEnviado";
import MeusPedidos from "../PaginasCliente/MeusPedidos";

import { AuthProvider } from "../contexts/AuthProvider";

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <Stack.Navigator initialRouteName="CadastroProduto">
=======
    <Stack.Navigator initialRouteName="HomeCliente">
>>>>>>> 03d13e4710a245bd63b655b0acf40dad2f3be9a2
=======
    <Stack.Navigator initialRouteName="HomeCliente">
>>>>>>> 03d13e4710a245bd63b655b0acf40dad2f3be9a2
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="HomeCliente"
        component={HomeCliente}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="MeusPedidos"
        component={MeusPedidos}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="HomeVendedor"
        component={HomeVendedor}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="CadastroUsuario"
        component={CadastroUsuario}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="CadastrarProduto"
        component={CadastrarProduto}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="ComprarProduto"
        component={ComprarProduto}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="PedidoEnviado"
        component={PedidoEnviado}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};

export default Main;
