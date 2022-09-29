import React ,{useContext} from 'react';
import {Text} from "react-native";
import Body from "../Componentes/Body";
import { AuthContext } from '../contexts/autenticacao';

const MeusPedidos = () => {
const {} = useContext(AuthContext)
    return (
        <Body>
            <Text>Olá página pedidos</Text>

        </Body>
    )


}
export default MeusPedidos;