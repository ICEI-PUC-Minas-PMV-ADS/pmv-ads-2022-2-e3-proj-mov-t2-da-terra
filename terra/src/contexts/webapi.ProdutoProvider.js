import React, { createContext, useState } from "react";
import { url } from "./webapi.url";

export const ProdutoContext = createContext({});

const ProdutoProvider = ({ children }) => {

  const [produto, setProduto] = useState();

  // GET - OK
  const getProduto = async (id) => {
    console.log(`${url}/produtos/${id}`)
    return await fetch(`${url}/produtos/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => setProduto(json))
      .catch(error => console.error(error));
  }

  // POST - OK
  const postProduto = async (param = {}) => {
    console.log(`${url}/produtos/`);
    return await fetch(`${url}/produtos/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(param)
    })
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(error => console.error(error));
  }

  // PUT - Falta testar, dependende do get  
  const putProduto = async (param = {}) => {
    return await fetch(`${url}/produtos/${param.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(param)
    })
      .then(response => response.json())
      .then(json => setProduto(json))
      .catch(error => console.error(error));
  }

  // DELETE - OK 
  const deleteProduto = async (id) => {
    return await fetch(`${url}/produtos/${id}`, {
      method: 'DELETE',
    })
      .then(response => console.log(response.status))
      .catch(error => console.error(error));
  }

  const getAllProduto = async () => {
    console.log(`${url}/produtos/`)
    return await fetch(`${url}/produtos/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => setProduto(json))
      .catch(error => console.error(error));
  }


  return (
    <ProdutoContext.Provider
      value={{
        produto,
        getProduto,
        postProduto,
        putProduto,
        deleteProduto,
        getAllProduto
      }}
    >
      {children}
    </ProdutoContext.Provider>
  )
}

export default ProdutoProvider;