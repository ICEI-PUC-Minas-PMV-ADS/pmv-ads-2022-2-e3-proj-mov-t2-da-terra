import React,{useContext} from 'react';
import { Text } from "react-native";

import Body from "../Componentes/Body";
import Container from '../Componentes/Container';

import { AuthContext } from '../contexts/AuthProvider';

const MinhaConta = () => {

    const {user,setUser} = useContext(AuthContext)//Provider com as informações do usuário logado
    return (
        <Body>
            <Text>Nome: {user.nome}</Text>

            <Text>Email: {user.email}</Text>
            

  
        </Body>
    );
}

export default MinhaConta;