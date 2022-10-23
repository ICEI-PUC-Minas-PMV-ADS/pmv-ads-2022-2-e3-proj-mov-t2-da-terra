import React, { useState, useEffect, useContext } from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

import { List, Button, Appbar, Divider } from "react-native-paper";

import Body from "../Componentes/Body";
import Container from "../Componentes/Container";
import Header from "../Componentes/Header";
import Seletor from "../Componentes/Seletor";

import { useNavigation, useIsFocused } from "@react-navigation/native";
import { getProdutos, getProdutosCompras } from "../DBService/DBProduto";

import ProdutoProvider, { ProdutoContext } from "../contexts/ProdutoProvider";

data = [
  {
    id: 1,
    loja: "Shop Deutsch Brothers",
    produto: "Banana",
    aprovado: false,
    dataPedido: "20/02/2023",
    preco: "20.40",
  },
  {
    id: 2,
    loja: "Fruits Paradise",
    produto: "Maça",

    aprovado: true,
    dataPedido: "12/05/2022",
    preco: "55.60",
  },
  {
    id: 3,
    loja: "Loja do tião",
    produto: "Brócolis",

    aprovado: false,
    dataPedido: "25/07/2021",
    preco: "202.20",
  },
  {
    id: 4,
    loja: "Loja do Calvo",
    produto: "Alface",
    aprovado: true,
    dataPedido: "10/07/2020",
    preco: "102.01",
  },
  {
    id: 5,
    loja: "Loja dos irmãos Deustch",
    produto: "pera",
    aprovado: false,
    dataPedido: "02/03/2019",
    preco: "67.40",
  },
];

const MeusPedidos = () => {
  // const {user} = useContext(AuthContext)
  const renderItem = ({ item }) => {
    return (
      <View style={{ marginTop: 20 }}>
        <List.Item
          title={`${item.produto}`}
          titleStyle={{
            fontSize: 20,
            fontWeight: "bold",
            lineHeight: 22,
            marginBottom: 8,
          }}
          right={() => (
            <>
        <View style={{flexDirection:"column",marginTop:40,}}>
            <Text
              style={{
                textAlignVertical: "center",
                fontWeight: "bold",
                fontSize: 16,
                marginTop:25,
              }}
            >
              R${item.preco}
            </Text>
            <Text style={styles.textDataPedido}>{item.dataPedido}</Text>
            </View>
          
            </>
          )}
          
          description={
            <>
            
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <List.Icon icon={item.aprovado?"check":"clock-outline"} />
                <Text style={item.aprovado?styles.aprovado:styles.esperandoAprovação}>{`${item.aprovado?"Aprovado":"Aguardando aprovação"}`}</Text>
                </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <List.Icon icon="store" />
                <Text style={{ fontSize: 16 }}>{item.loja}</Text>
              </View>
              
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <List.Icon icon="calendar-check-outline" />
                <Text style={{ fontSize: 16 }}>{item.dataPedido}</Text>
              </View>
            </>
          }
        />
      </View>
    );
 
  };

  return (
    <Container>
      <Body>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </Body>
      
    </Container>
  );
};
export default MeusPedidos;
const styles = StyleSheet.create({
    /* FlatList */
    textDataPedido:{
    fontWeight:"bold",
    marginTop:8,

    } ,
    
    
    
    aprovado: {
        fontSize: 16,
    fontWeight:"bold",
      borderRadius:10,
      backgroundColor:"#6cc438",
      padding:5,
          
      
      
     },
     esperandoAprovação: {
        fontSize: 16,
        fontWeight:"bold",
        borderRadius:12,
        backgroundColor:"#EDD251",
        padding:5,

        
      
       },    
     
   
     
   });
   

   
   