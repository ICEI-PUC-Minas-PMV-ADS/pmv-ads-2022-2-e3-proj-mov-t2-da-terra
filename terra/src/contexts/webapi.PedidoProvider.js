import React, { createContext, useState } from "react";
import { url } from "./webapi.url";

export const PedidoContext = createContext({});

const PedidoProvider = ({ children }) => {
  const [pedido, setPedido] = useState();


const getPedido = async (id)=>{
  return await fetch(`${url}/pedidos/${id}`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(json => {
     return json

  })
  .catch(error => console.error(error));


}



  const postPedido = async (param) => {
    return await fetch(`${url}/pedidos/`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(param)
      })
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(e => console.error(e));
  }

  const postItemPedido = async (param) => {
    return await fetch(`${url}/pedidos/itens/`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(param)
      })
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(e => console.error(e));
  }

  const putPedido = async (param = {}) => {
    return await fetch(`${url}/pedido/${param.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(param)
      })
      .then(response => response.json())
      .then(json => console.log(pedido))
      .catch(error => console.error(error));
  }
  return (
    <PedidoContext.Provider
      value={{
        pedido,
        postPedido,
        postItemPedido,
        putPedido,
        getPedido,
        setPedido,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
}

export default PedidoProvider;