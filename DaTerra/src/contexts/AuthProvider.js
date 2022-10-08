import React, { createContext, useState } from "react";
import { Alert } from "react-native";

import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const usuario = {
    email: "flash@gmail.com",
        senha: "hateReversFlash",
        nome: "Barry allen",
        nomeLoja:"Shop Flash", 


  }
  
  
  
  const navigation = useNavigation();
  // const [usuario, setUsuario] = useState();

  // const login = (email, senha) => {
  //   if (!email || !senha) {
  //     Alert.alert("Favor inserir seu email e senha");
  //   }
  //   else {
  //     setUsuario({
               
  //      cidade: "Central city",
  //       bairro: "Tal x",
  //       numeroCasa: "120"
  //     });
  //     // Criar a Lógica se é vendedor ou cliente com um CadastroUsuarioProvider
  //     console.log("Chamar BD"); // Chamar banco
  //     navigation.navigate('HomeVendedor');
  //   }
  // }

  return (
    <AuthContext.Provider value={{ usuario, /*login */ }}>
      {children}
    </AuthContext.Provider>
  );
};
