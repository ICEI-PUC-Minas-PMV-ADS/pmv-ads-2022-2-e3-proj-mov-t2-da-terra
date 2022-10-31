import React, { useState, useContext, createContext } from "react";
import { url } from "./webapi.url";

export const UsuarioContext = createContext({});

const UsuarioProvider = ({ children }) => {

  const [usuario, setUsuario] = useState();

  // GET - OK
  const getUsuario = async (id) => {
    return await fetch(`${url}/usuarios/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => response.json())
      .then(json => setUsuario(json))
      .catch(error => console.error(error));
  }

  // POST - OK
  const postUsuario = async (param) => {
    return await fetch(`${url}/usuarios/`,
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

  // PUT
  const putUsuario = async (param) => {
    console.log(`${url}/usuarios/${param.id}`);
    return await fetch(`${url}/usuarios/${param.id}`,
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

  const deleteUsuario = async (id) => {
    console.log(id)
    return await fetch(`${url}/usuarios/${id}`,
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
        getUsuario,
        postUsuario,
        putUsuario,
        deleteUsuario,
      }}>
      {children}
    </UsuarioContext.Provider>
  );
}

export default UsuarioProvider;