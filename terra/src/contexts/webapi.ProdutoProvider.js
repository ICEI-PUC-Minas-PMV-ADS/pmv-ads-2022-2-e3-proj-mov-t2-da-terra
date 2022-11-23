import React, { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { url } from "./webapi.url";

export const ProdutoContext = createContext({});

const ProdutoProvider = ({ children }) => {
  const [resultados, setResultados] = useState([]); // Usado para o carrinho
  const [produto, setProduto] = useState([]);
  const [produtoQuery, setProdutoQuery] = useState([]);

  const { user } = useContext(AuthContext);

  // PRODUTOR E CLIENTE
  // GET: Tela Loja (Produtor) e Busca Produto (Cliente)
  const getBuscaTodosProdutos = async () => {
    return await fetch(`${url}/produtos/todos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => {
        if (user.produtor) {
          let res = []
          for (let p in json) {
            if (json[p].produtorId == user.produtor.id) {
              // console.log([json[p]]);
              res.push(json[p]);
            }
          }
          setProduto(res);
        } else {
          setProduto(json);
        }
      })
      .catch(error => console.error(error));
  }

  // CLIENTE ------------------------------------------------------
  //GET Tela Busca: Produto por nome - OK
  const buscaProdutos = async (param = {}) => {
    return await fetch(`${url}/produtos/busca?nomeProduto=${param}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(json => setProdutoQuery(json))
      .then(json => console.log(json))
      .catch(error => console.error(error));
  }

  // GET Carrinho - OK
  const getProdutoCarrinho = async (id) => {
    return await fetch(`${url}/produtos/carrinho/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(json => console.log("json", json))
      .catch(error => console.error(error));
  }
  // FIM CLIENTE ---------------------------------------------------

  // PRODUTOR ------------------------------------------------------
  // POST: Tela Cadastro de Produto
  const postProduto = async (param) => {
    console.log(param);
    return await fetch(`${url}/produtos/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(param)
      })
      .then(response => response.json())
      .then(json => console.log(json)) // setar para produto
      .catch(error => console.error(error));
  }

  // PUT: Tela Editar em Cadastro de Produto
  const putProduto = async (param) => {
    return await fetch(`${url}/produtos/${param.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(param)
      })
      .then(response => response.json())
      .catch(error => console.error(error));
  }

  // DELETE: Tela Deletar em Cadastro de Produto
  const deleteProduto = async (id) => {
    return await fetch(`${url}/produtos/${id}`,
      {
        method: 'DELETE',
      })
      .then(response => console.log(response.status))
      .catch(error => console.error(error));
  }

  return (
    <ProdutoContext.Provider
      value={{
        produto,
        setProduto,
        getProdutoCarrinho,
        postProduto,
        putProduto,
        deleteProduto,
        buscaProdutos,
        setResultados,
        getBuscaTodosProdutos,
        produtoQuery,
        setProdutoQuery
      }}
    >
      {children}
    </ProdutoContext.Provider>
  )
}

export default ProdutoProvider;