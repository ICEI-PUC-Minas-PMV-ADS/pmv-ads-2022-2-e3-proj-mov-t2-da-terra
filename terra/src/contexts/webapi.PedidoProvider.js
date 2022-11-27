import React, { createContext, useState } from "react";
import { url } from "./webapi.url";

export const PedidoContext = createContext({});

const PedidoProvider = ({ children }) => {
  const [resultados, setResultados] = useState([]);
  const [pedido, setPedido] = useState();


  const getPedido = async (id) => {
    return await fetch(`${url}/pedidos/cliente/${id}`,
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

  const getPedidoProdutor = async (id) => {
    return await fetch(`${url}/pedidos/produtor/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application /json'
        }
      })
      .then(response => response.json())
      .then(json => {
        // if (json) {
        //   let idClientePedido = 0;
        //   idClientePedido = Object.values(json);
        //   console.log("ID Cliente", idClientePedido[0].clienteId);

        return json;
        // }
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
      .then(json => {
        if (json != undefined) {
          let idPedidoEnviado = 0;
          let idResultados = 0;

          idPedidoEnviado = Object.values(json);
          console.log('ID PEDIDO', idPedidoEnviado[0])

          for (let key in resultados) {
            idResultados = Object.values(resultados[key]);
            // console.log("\nRESULTADOS: ", resultados[key]);
            // console.log("\nID RESULTADOS: ", idResultados[7]);
            postItemPedido({
              pedidoId: idPedidoEnviado[0],
              produtoId: idResultados[3],  // 3, pq é a posição de idProduto
              quantidadeProduto: idResultados[7] // 7, posição da qtd
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

  //Aceite no ponto de vista do vendedor, na API o método esta no      ProdutoresController - HttpGet
  const aceitePedido = async (id) => {
    //console.log(`${url}/produtores/pedido/${id}`);
    return await fetch(`${url}/produtores/pedido/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(error => console.error(error))
  }

  // Tela Minhas Vendas: Produtor
  const getItens = async (idPedido) => {
    console.log(`${url}/produtor/pedidos/itens/${idPedido}`)
    return await fetch(
      `${url}produtor/pedidos/itens/${idPedido}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(e => console.error(e))
  }

  return (
    <PedidoContext.Provider
      value={{
        postPedido,
        postItemPedido,
        putPedido,
        getPedido,
        setPedido,
        resultados,
        setResultados,
        getPedidoProdutor,
        aceitePedido,
        getItens
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
}

export default PedidoProvider;