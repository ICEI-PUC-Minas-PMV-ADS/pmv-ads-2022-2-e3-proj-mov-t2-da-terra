import React, { createContext, useState } from "react";
import { url } from "./webapi.url";

export const PedidoContext = createContext({});

const PedidoProvider = ({ children }) => {
  const [pedido, setPedido] = useState();

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

  return (
    <PedidoContext.Provider
      value={{
        pedido,
        postPedido,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
}

export default PedidoProvider;