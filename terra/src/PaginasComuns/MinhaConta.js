import React,{useContext} from 'react';
import { Text } from "react-native";

import Body from "../Componentes/Body";
import Container from '../Componentes/Container';

import { AuthContext } from '../contexts/AuthProvider';

const MinhaConta = () => {

    const {user,setUser} = useContext(AuthContext)//Provider com as informações do usuário logado
    return (
        <Body>
            <Text>TELA MINHA CONTA </Text>        
        </Body>
    );
}

export default MinhaConta;