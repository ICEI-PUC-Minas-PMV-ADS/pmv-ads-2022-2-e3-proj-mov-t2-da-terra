import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Loja from "../PaginaVendedor/Loja";
import MeusPedidos from "../PaginaVendedor/MeusPedidos";
import BuscarProdutos from "../PaginasCliente/BuscarProduto";
import HomeVendedor from "../PaginaVendedor/HomeVendedor";
import HomeCliente from "../PaginasCliente/HomeCliente";
import MinhaConta from "../PaginasComuns/MinhaConta";
import Login from "../PaginasComuns/Login";
import CadastroUsuario from '../PaginasComuns/CadastroUsuario';
import { AuthProvider } from '../contexts/autenticacao';
const Stack = createNativeStackNavigator();

const Main = () => {
    return (
        
        <Stack.Navigator initialRouteName="HomeVendedor">
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
            
                      
        </Stack.Navigator>

    );
};

export default Main;