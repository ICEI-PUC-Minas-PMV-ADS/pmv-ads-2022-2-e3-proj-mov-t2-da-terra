import React, { createContext, useState } from "react";
import { url } from "./webapi.url";

export const ValidarCadastroContext = createContext({});

export const ValidarCadastroProvider = ({ children }) => {

  const getValidarCadastro = async (param) => {
    console.log(param);
    return await fetch(`${url}/validarcadastro/${param}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(json => [json])
      .catch(error => console.error(error));
  }

  return (
    <ValidarCadastroContext.Provider value={{
      getValidarCadastro
    }}>
      {children}
    </ValidarCadastroContext.Provider>
  );
};

export default ValidarCadastroProvider;