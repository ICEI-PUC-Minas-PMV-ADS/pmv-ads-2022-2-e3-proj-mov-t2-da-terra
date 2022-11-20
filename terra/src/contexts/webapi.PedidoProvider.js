import React, { createContext, useState } from "react";
import { url } from "./webapi.url";

export const PedidoContext = createContext({});

const PedidoProvider = ({ children }) => {
  const [resultados, setResultados] = useState([]);

  const postPedido = async (param) => {
    return await fetch(`${url}/pedidos/`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(param)
      })
      .then(response => response.json())
      .then(json => {
        if (json != undefined) {
          let idPedidoEnviado = 0;
          let idResultados = 0;
          
          idPedidoEnviado = Object.values(json);
          console.log('ID', idPedidoEnviado[0])

          for (let key in resultados) {
            idResultados = Object.values(resultados[key]);

            console.log("\nRESULTADOS: ", resultados[key]);
            console.log("\nID RESULTADOS: ", idResultados[3]);
         
            postItemPedido({
              pedidoId: idPedidoEnviado[0],
              produtoId: idResultados[3]  // 3, pq é a posição de idProduto
            })
          }
        }
      })
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

  return (
    <PedidoContext.Provider
      value={{  
        postPedido,
        postItemPedido,
        resultados,
        setResultados
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
}

export default PedidoProvider;