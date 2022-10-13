import React, { createContext, useState } from "react";
import { Alert } from "react-native";
import { cadastrarProduto } from "../DBService/DBProduto";
export const ProdutoContext = createContext();

const ProdutoProvider = ({ children }) => {

  const [produto, setProduto] = useState();

  // const cadastrarProduto = (nome, preco, embalagem, estoque, categoria, descricao) => {
  //   if (!nome || !preco || !embalagem || !estoque || !categoria || !descricao) {
  //     Alert.alert("É necessário preencher todos os dados");
  //   } else {
  //     setProduto({
  //       nome: nome,
  //       preco: preco,
  //       embalagem: embalagem,
  //       estoque: estoque,
  //       categoria: categoria,
  //       descricao: descricao
  //     });
     
  //     console.log("Chamar BD"); // Chamar banco aqui ???
  //     navigation.navigate('HomeVendedor');
  //   }
  // }

  return (
    <ProdutoContext.Provider value={{ cadastrarProduto }}>
      {children}
    </ProdutoContext.Provider>
  );
}

export default ProdutoProvider;


  // const editarProduto = (id, nomeLoja) => {
  //   //Editar produto
  // }

  // const excluirProduto = (id) => {
  //   //Editar produto
  // }