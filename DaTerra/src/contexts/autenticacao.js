import { StyleSheet, Text, View } from "react-native";
import React, { createContext } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{ nome: "Barry allen" }}>
      {children}
    </AuthContext.Provider>
  );
};
