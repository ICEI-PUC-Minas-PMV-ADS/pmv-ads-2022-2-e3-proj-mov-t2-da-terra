import React, { createContext, useState } from "react";
import { url } from "./webapi.url";

export const ValidarCadastroContext = createContext({});

export const ValidarCadastroProvider = ({ children }) => {
  const [idCadastrado, setIdCadastrado] = useState([]);

  const postValidarCadastro = async (email) => {
   console.log(`${url}/validarcadastro/${email}`);
    return await fetch(`${url}/validarcadastro/${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      //body: JSON.stringify(param)
    })
      .then(response => response.json())
      .then(json => console.log("JSON", json))
      .then(json => setIdCadastrado(json))
      .catch(error => console.error(error));
  }

  return (
    <ValidarCadastroContext.Provider value={{
      idCadastrado,
      postValidarCadastro
    }}>
      {children}
    </ValidarCadastroContext.Provider>
  );
};

export default ValidarCadastroProvider;