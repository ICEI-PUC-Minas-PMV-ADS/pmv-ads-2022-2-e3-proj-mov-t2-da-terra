import { StyleSheet, Text, View } from 'react-native'
import React,{useContext} from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import { ProdutoContext } from '../contexts/ProdutoProvider'

import Body from "../Componentes/Body";
import Botao from "../Componentes/Botao";
import Container from "../Componentes/Container";
import Input from "../Componentes/Input";
import Header from "../Componentes/Header";
const EditarProduto = () => {
  
  const{usuario} = useContext(AuthContext);
  const {editarProduto,deletarProduto}=useContext(ProdutoContext);
  
    return (
    <Body >
      <Text>Página para editar produto</Text>
    </Body>
  )
}

export default EditarProduto

const styles = StyleSheet.create({





    
})