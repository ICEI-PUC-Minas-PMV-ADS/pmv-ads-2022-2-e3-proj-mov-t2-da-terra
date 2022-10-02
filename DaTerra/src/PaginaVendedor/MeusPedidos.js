//Meus pedidos do vendedor se refere aos pedidos pendentes dele para entrega aos clientes,ou já entregues

import React,{useContext} from 'react';
import {Text} from "react-native";
import Body from "../Componentes/Body";
import { AuthContext } from '../contexts/AuthProvider';
const MeusPedidos = () => {
const {} = useContext(AuthContext);
    return (
        <Body>
            <Text>Olá aqui é pagina de meus pedidos</Text>

        </Body>
)


}
export default MeusPedidos;