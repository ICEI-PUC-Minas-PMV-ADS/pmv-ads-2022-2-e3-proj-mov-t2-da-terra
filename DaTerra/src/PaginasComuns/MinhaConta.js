import React,{useContext} from 'react';
import {Text} from "react-native";
import Body from "../Componentes/Body";
import Container from '../Componentes/Container';
import { AuthContext } from '../contexts/AuthProvider';

const MinhaConta = () => {

    const {nome,email,cidade,bairro,numeroCasa} = useContext(AuthContext)//Irá receber as credencias de login nesse contexto na hora de renderizar a página Minha conta com as informações 
    return (
        <Body>
            <Text>Olá {nome}</Text>
            <Text>Email: {email}</Text>
            <Text>Seu endereço:Você mora na cidade: {cidade}, no bairro: {bairro}, e o numero da sua casa é :{numeroCasa}</Text>




        </Body>
    )


}
export default MinhaConta;