import React, { createContext } from "react";
import { Alert } from "react-native";
import { cadastrarProduto } from "../DBService/DBProduto";
export const ProdutoContext = createContext();

const ProdutoProvider = ({ children }) => {

  


  const editarProduto = (id, nomeLoja) => {
    //Editar produto
  }

  const excluirProduto = (id) => {
    //Editar produto
  }
  return (
    <ProdutoContext.Provider value={{ cadastrarProduto, editarProduto, excluirProduto }}>
      {children}
    </ProdutoContext.Provider>
  );
}

export default ProdutoProvider;