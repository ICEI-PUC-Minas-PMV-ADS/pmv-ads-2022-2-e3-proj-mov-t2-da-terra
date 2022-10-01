import { StyleSheet, Text, View } from "react-native";
import React, { createContext } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{ nome: "Barry allen",email:"flash@gmail.com",cidade:"Central city" }}>
      {children}
    </AuthContext.Provider>
  );
};
