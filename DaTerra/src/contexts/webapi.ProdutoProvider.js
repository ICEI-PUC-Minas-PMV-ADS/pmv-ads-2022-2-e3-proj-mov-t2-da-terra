import React, { createContext, useState } from "react";

import { BASE_URL } from "../WebApiServices/urls";
import API from "../WebApiServices/webapi.services";

export const ProdutoContext = createContext({});

const ProdutoProvider = ({ children }) => {

  const [produto, setProduto] = useState();

  // GET
  const getProduto = async (id) => {
   // console.log(id); // teste
    //console.log(`${BASE_URL}${id}`) // teste
    try {
      return await API.get(`${BASE_URL}${id}`)
        .then(
          response => {
            console.log(response.status);
            console.log(response.data);
            // const produto = []
            // produto[0] = response.data
             setProduto(response.data);

            return response.data;
          },
          error => {
            console.log("error " + error)
            return null;
          }
        );
    } catch (error) {
      console.error("catch " + error);
      return null;
    }
  }

  // POST
  const postProduto = async (param) => {
    try {
      return await API.post(`${BASE_URL}`, param)
        .then(
          response => {
            console.log(response.status);
            console.log(response.data);
            return response.data;
          },
          error => {
            console.log("error " + error)
            return null;
          }
        );
    } catch (error) {
      console.error("catch " + error);
      return null;
    }
  }

  // PUT
  const putProduto = async (param) => {
    try {
      return await API.put(`${BASE_URL}`, param)
        .then(
          response => {
            console.log(response.status);
            console.log(response.data);
            return response.data;
          },
          error => {
            console.log("error " + error)
            return null;
          }
        );
    } catch (error) {
      console.error("catch " + error);
      return null;
    }
  }

  // DELETE
  const deleteProduto = async (id) => {
    try {
      return await API.delete(`${BASE_URL}${id}`)
        .then(
          response => {
            console.log(response.status);
          },
          error => {
            console.log("error " + error)
            return null;
          }
        );
    } catch (error) {
      console.error("catch " + error);
      return null;
    }
  }

  return (
    < ProdutoContext.Provider
      value={
        {
          produto,
          getProduto,
          postProduto,
          putProduto,
          deleteProduto,
        }
      }>
      {children}
    </ ProdutoContext.Provider>
  );
}

export default ProdutoProvider;


// Validação
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
//     navigation.navigate('HomeVendedor');
//   }
// }