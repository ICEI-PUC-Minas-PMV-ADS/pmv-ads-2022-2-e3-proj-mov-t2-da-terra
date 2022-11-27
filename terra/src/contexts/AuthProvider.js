import React, { createContext, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { url } from "./webapi.url";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState();

  const postLogin = async (param) => {
    return await fetch(`${url}/login/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(param)
      })
      .then(response => response.json())
      .then(json => {
        if (json) {
          setUser(json)   // Para usar em outras telas
          // console.log(json)
          for (let i in json) {
            const tipoUser = json[i].tipoUsuario;

            if (tipoUser != undefined) {
              if (tipoUser == 'cliente') {
                navigation.navigate("HomeCliente");
              }
              else {    // Produtor
                navigation.navigate("HomeVendedor");
              }
            }
          return json

          }
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
      postLogin
    }}>
      {children}
    </AuthContext.Provider>
  );
};
