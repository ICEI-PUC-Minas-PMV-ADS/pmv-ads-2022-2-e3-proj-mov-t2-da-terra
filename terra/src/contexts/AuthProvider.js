import React, { createContext, useState } from "react";
import { url } from "./webapi.url";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const[tipoUsuario,setTipoUsuario]=useState(""); 
  const [user, setUser] = useState();
  let [idLogado, setIdLogado] = useState();

  const postLogin = async (param) => {
    //  console.log("AQUI: " + param.senha);
    return await fetch(`${url}/login/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(param)
      })
      .then(response => response.json())      
      .then(json =>  {
        setUser(json)
        if(json.cliente!=undefined){

          setIdLogado(json.cliente.id)
        }
        else if (json.produtor!=undefined){

          setIdLogado(json.produtor.id)
        }
      })
      .catch(error => console.error(error));
  }

  // const getLogout = async () => {
  //   //  console.log("AQUI: " + param.senha);
  //   return await fetch(`${url}/login/`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(json => console.log(json))
  //     .catch(error => console.error(error));
  // }

  return (
    <AuthContext.Provider value={{
      user,
      tipoUsuario,
      setTipoUsuario,
      setUser,
      setIdLogado,
      idLogado,
      postLogin
    }}>
      {children}
    </AuthContext.Provider>
  );
};
