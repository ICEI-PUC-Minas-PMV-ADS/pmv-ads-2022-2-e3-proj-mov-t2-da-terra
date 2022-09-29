import React,{useContext} from 'react';
import {Text} from "react-native";
import Body from "../Componentes/Body";
import { AuthContext } from '../contexts/autenticacao';

const MinhaConta = () => {

    const {} = useContext(AuthContext)//Irá receber as credencias de login nesse contexto na hora de renderizar a página Minha conta com as informações 
    return (
        <Body>
            <Text>Olá aqui é a Página minha conta</Text>

        </Body>
    )


}
export default MinhaConta;