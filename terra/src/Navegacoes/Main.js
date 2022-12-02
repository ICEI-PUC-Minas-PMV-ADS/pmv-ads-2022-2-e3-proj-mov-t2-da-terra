import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeVendedor from "../PaginaVendedor/HomeVendedor";
import HomeCliente from "../PaginasCliente/HomeCliente";
import MinhaConta from "../PaginasComuns/MinhaConta";
import Login from "../PaginasComuns/Login";
import CadastroUsuario from "../PaginasComuns/CadastroUsuario";
import CadastrarProduto from "../PaginaVendedor/CadastrarProduto";
import ComprarProduto from "../PaginasCliente/ComprarProduto";
import PedidoEnviado from "../PaginasCliente/PedidoEnviado";
import MeusPedidos from "../PaginasCliente/MeusPedidos";
import Carrinho from "../PaginasCliente/Carrinho"
import ItensPedido from "../PaginaVendedor/ItensPedido";
const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
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
      <Stack.Screen
        name="Carrinho"
        goBack={() => navigation.goBack()}
        component={Carrinho}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="MinhaConta"
        component={MinhaConta}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="ItensPedido"
        component={ItensPedido}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};

export default Main;
