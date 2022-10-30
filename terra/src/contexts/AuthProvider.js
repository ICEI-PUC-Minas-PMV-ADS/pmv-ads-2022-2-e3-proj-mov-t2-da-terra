import React, { createContext, useState } from "react";
import { Alert } from "react-native";
import { getLogin } from "../DBService/DBUsuario";
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);

  const navigation = useNavigation();
  // const [usuario, setUsuario] = useState();

 

  return (
    <AuthContext.Provider value={{user,setUser}}>
      {children}
    </AuthContext.Provider>
  );
};
