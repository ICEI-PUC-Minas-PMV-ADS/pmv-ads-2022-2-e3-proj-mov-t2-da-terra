import React,{useContext} from 'react';
import {Text} from "react-native";
import Body from "../Componentes/Body";
import { AuthContext } from '../contexts/autenticacao';
const Loja = () => {
const {} = useContext(AuthContext);
    return (
<Body>
    <Text>Olá aqui é a loja</Text>

</Body>
    )


}
export default Loja;