import React, { useState, useContext, createContext } from "react";
import { url } from "./webapi.url";

export const UsuarioContext = createContext({});

const UsuarioProvider = ({ children }) => {

  const [usuario, setUsuario] = useState();

  // CRUD - Produtor e Cliente  
  // GET (Produtor)
  const getProdutor = async (id) => {
    return await fetch(`${url}/produtores/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => response.json())
      //.then(json => setUsuario(json))
      .then(json => console.log(json))
      .catch(error => console.error(error));
  }

  // GET (Cliente)
  const getCliente = async (id) => {
    //console.log(`${url}/clientes/${id}`)  
    return await fetch(`${url}/clientes/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => response.json())
      //.then(json => setUsuario(json))
      .then(json => {
        // console.log(json)
        return json
      })
      .catch(error => console.error(error));
  }

  // POST (Cliente e Produtor)
  const postUsuario = async (param) => {
    return await fetch(
      param.tipoUsuario == 'produtor'
        ? `${url}/produtores/`
        : `${url}/clientes/`,
      {
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

  // PUT (Cliente e Produtor)
  const putUsuario = async (param) => {
    console.log(`${url}/produtores/${param.id}`);
    console.log(`${url}/clientes/${param.id}`);
    // console.log(`${param.id}`);
    // console.log(`${param.nome}`);
    // console.log(`${param.cpf}`);    
    // console.log(`${param.dataNascimento}`);
     console.log(`${param.tipoUsuario}`);
    // console.log(`Só produtor: ${param.nomeLoja}`);
    // console.log(`${param.email}`);
    // console.log(`${param.senha}`);
    // console.log(`${param.telefone}`);
    // console.log(`${param.cep}`);
    // console.log(`${param.rua}`);
    // console.log(`${param.numeroCasa}`);
    // console.log(`${param.bairro}`);
    // console.log(`${param.complemento}`);
    // console.log(`${param.cidade}`);
    // console.log(`${param.uf}`);
    return await fetch(
      param.tipoUsuario == 'produtor'
        ? `${url}/produtores/${param.id}`
        : `${url}/clientes/${param.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(param)
      })
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(error => console.error(error));
  }
  

  // DELETE (Produtor)
  const deleteProdutor = async (id) => {
    console.log(id)
    return await fetch(`${url}/produtores/${id}`,
      {
        method: 'DELETE',
      })
      .then(response => console.log(response.status))
      .catch(error => console.error(error));
  }

  // DELETE (Ciente)
  const deleteCliente = async (id) => {
    console.log(id)
    return await fetch(`${url}/clientes/${id}`,
      {
        method: 'DELETE',
      })
      .then(response => console.log(response.status))
      .catch(error => console.error(error));
  }

  return (
    <UsuarioContext.Provider
      value={{
        usuario,
        getProdutor,
        getCliente,
        postUsuario,
        putUsuario,
        deleteCliente,
        deleteProdutor,
      }}>
      {children}
    </UsuarioContext.Provider>
  );
}

export default UsuarioProvider;