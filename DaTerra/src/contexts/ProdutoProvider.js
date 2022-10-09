import React, { createContext } from "react";
import { Alert } from "react-native";

export const ProdutoContext = createContext();

const ProdutoProvider = ({ children }) => {  

  const cadastrarProduto = (nome, preco, estoque, descricao, categoria) => {
    if (!nome || !preco || !estoque || !descricao || !categoria) {
      Alert.alert("Você precisa preencher todos os dados");
    } else {
      Alert.alert(nome); // BANCO DE DADOS
    }
  }

  
  const editarProduto = (id,nomeLoja) => {
    //Editar produto
  }
  return (
    <ProdutoContext.Provider value={{cadastrarProduto}}>
      {children}
    </ProdutoContext.Provider>
  );
}

export default ProdutoProvider;