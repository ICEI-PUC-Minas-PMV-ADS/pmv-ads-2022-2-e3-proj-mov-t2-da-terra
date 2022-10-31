import React, { createContext, useState } from "react";
import { url } from "./webapi.url";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState([]); 

  const getLogin = async (param) => {    
    console.log(`${url}/login/`);
    return await fetch(`${url}/login/`, {
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
    <AuthContext.Provider value={{
      usuario,
      getLogin
    }}>
      {children}
    </AuthContext.Provider>
  );
};
