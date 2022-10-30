import React, { createContext, useState } from "react";
import { Alert } from "react-native";
import { getLogin } from "../DBService/DBUsuario";
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);

  const navigation = useNavigation();
  // const [usuario, setUsuario] = useState();

  const postUsuario = async (param = {}) => {
    console.log(`${url}/usuarios/`);
    return await fetch(`${url}/usuarios/`, {
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
    <AuthContext.Provider value={{user,setUser,postUsuario}}>
      {children}
    </AuthContext.Provider>
  );
};
