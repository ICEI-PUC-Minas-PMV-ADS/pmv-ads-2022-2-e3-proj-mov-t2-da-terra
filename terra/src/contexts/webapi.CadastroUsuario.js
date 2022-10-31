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

  const postUsuario = async (param) => {
    console.log(`${url}/usuarios/`)
    console.log(param);
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

  return (
    <UsuarioContext.Provider
      value={{
        usuario,
        getUsuario,
        postUsuario,
      }}>
      {children}
    </UsuarioContext.Provider>
  );
}

export default UsuarioProvider;