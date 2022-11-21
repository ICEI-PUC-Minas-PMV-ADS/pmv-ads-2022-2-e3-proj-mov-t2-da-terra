import React, { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { url } from "./webapi.url";

export const ProdutoContext = createContext({});

const ProdutoProvider = ({ children }) => {
  const [resultados, setResultados] = useState([]);
  const [produto, setProduto] = useState([]);
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
              console.log([json[p]]);
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
  const BuscaProdutos = async (param = {}) => {
    return await fetch(`${url}/produtos/busca?nomeProduto=${param}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(json => setProduto(json))
      //.then(json => setResultadoBuscaProduto(json)) // teste
      .then(json => console.log(json))
      .catch(error => console.error(error));
  }

  // GET Carrinho - OK
  const getProdutoCarrinho = async (id) => {
    console.log(`${url}/produtos/carrinho/${id}`);
    return await fetch(`${url}/produtos/carrinho/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(json => onsole.log("json", json))
      .catch(error => console.error(error));
  }
  // FIM CLIENTE ---------------------------------------------------

  // PRODUTOR ------------------------------------------------------
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

  // PUT Tela cadastro de produto - OK
  const putProduto = async (param = {}) => {
    return await fetch(`${url}/produtos/${param.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(param)
      })
      .then(response => response.json())
      .then(json => setProduto(json))
      .catch(error => console.error(error));
  }

  // DELETE Tela cadastro de produto - OK 
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
        BuscaProdutos,
        setResultados,
        getBuscaTodosProdutos
      }}
    >
      {children}
    </ProdutoContext.Provider>
  )
}

export default ProdutoProvider;