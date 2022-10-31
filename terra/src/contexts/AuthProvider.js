import React, { createContext, useState } from "react";
import { url } from "./webapi.url";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState([]);
  const [idLogado, setIdLogado] = useState();

  const postLogin = async (param) => {
    //console.log(`${url}/login/`);
    return await fetch(`${url}/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(param)
    })
      .then(response => response.json())
      //.then(json => console.log(json))
      .then(json => setIdLogado(json))  // Retorna ID       
      .catch(error => console.error(error));
  }
  
return (
  <AuthContext.Provider value={{
    usuario,
    idLogado,
    postLogin
  }}>
    {children}
  </AuthContext.Provider>
);
};
