import { StyleSheet, Text, View } from 'react-native'
import React, { createContext } from 'react'


export const AuthContext = createContext({});


 export const AuthProvider = ({children}) => {
  return (
    <AuthContext.Provider value={""}>//Aqui no value em teoria vou passar as credencias do usuário logado

    {children}

    </AuthContext.Provider>
  )
}

