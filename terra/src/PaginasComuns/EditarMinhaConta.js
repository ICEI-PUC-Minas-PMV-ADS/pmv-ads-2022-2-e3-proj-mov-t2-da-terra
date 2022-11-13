import React, { useState, useEffect, useContext } from "react";

import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AuthContext } from "../contexts/AuthProvider";

import Body from "../Componentes/Body";
import Container from "../Componentes/Container";
import Header from "../Componentes/Header";
import Botao from "../Componentes/Botao";


export default function EditarMinhaConta() {
const navigation = useNavigation();
  
  
  
  
  
    return (
    <View>
      <Header
        title={"Editar Meus dados"}
        // Só se houver tela empilhada
        goBack={() => navigation.goBack()}




      />
    </View>
  )
}

const styles = StyleSheet.create({
















})