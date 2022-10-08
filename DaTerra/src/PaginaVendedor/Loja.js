import React, { useContext, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image ,ScrollView} from "react-native";
import {
  TextInput,
  Portal,
  Dialog,
  Button,
  Provider,
  RadioButton,
  FAB,
} from "react-native-paper";

import Body from "../Componentes/Body";
import Botao from "../Componentes/Botao";
import Container from "../Componentes/Container";
import Input from "../Componentes/Input";
import Header from "../Componentes/Header";

import { AuthContext } from "../contexts/AuthProvider";
import { useNavigation } from "@react-navigation/native";

const Loja = () => {
  const navigation = useNavigation();
  const { usuario } = useContext(AuthContext);

  return (
    <>
      <View style={styles.apresentacao}>
        <Text style={{ fontSize: 20 }}>Sua Loja {usuario.nome}</Text>
        <Text style={{ fontSize: 20 }}>
          Veja abaixo o estoque de {usuario.nomeLoja}
        </Text>
      </View>
      <ScrollView>
      <View style={styles.containerPrincipal}>
        <View style={styles.principaisFuncionalidades}>
          <View style={styles.containerProdutos}>
          <TouchableOpacity>
          <Image
              style={styles.img}
              source={require("../assets/maracuja.jpg")}
            />
            <Text style={styles.textoProduto}>Maracujá</Text>
            <Text style={styles.textoProduto}>Estoque: 5kgs</Text>


          </TouchableOpacity>
            
            
          </View>

          <View style={styles.containerProdutos}>
            <TouchableOpacity>

            <Image
              style={styles.img}
              source={require("../assets/img-banana.jpg")}
            />
            <Text style={styles.textoProduto}>Banana</Text>
            <Text style={styles.textoProduto}>Estoque: 3kgs</Text>

            </TouchableOpacity>
            
          </View>
          <View style={styles.containerProdutos}>
          <TouchableOpacity>

          <Image
              style={styles.img}
              source={require("../assets/img-maça.jpg")}
            />
            <Text style={styles.textoProduto}>Maça</Text>
            <Text style={styles.textoProduto}>Estoque: 2kgs</Text>

            </TouchableOpacity>
          </View>
         
           
           
          <View style={styles.containerProdutos}>
            <TouchableOpacity>

            <Image
              style={styles.img}
              source={require("../assets/img-laranja.png")}
            />
            <Text style={styles.textoProduto}>Laranja</Text>
            <Text style={styles.textoProduto}>Estoque: 7kgs</Text>


            </TouchableOpacity>
          </View>
          <View style={styles.containerProdutos}>
             <TouchableOpacity>

            <Image
              style={styles.img}
              source={require("../assets/img-alface.jpg")}
            />
            <Text style={styles.textoProduto}>Alface</Text>
            <Text style={styles.textoProduto}>Estoque: 2,5kgs</Text>

             </TouchableOpacity>
          </View>
          <View style={styles.containerProdutos}>
          <TouchableOpacity>

            <Image
              style={styles.img}
              source={require("../assets/img-brocolis.jpg")}
            />
            <Text style={styles.textoProduto}>Brócolis</Text>
            <Text style={styles.textoProduto}>Estoque: 2kgs</Text>

          </TouchableOpacity>

          </View>
        </View>
      </View>

      <FAB
        style={styles.fab}
        small
        label="Cadastrar Produto"
        onPress={() => navigation.navigate("CadastrarProduto")}
      />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  apresentacao: {
    marginTop: 50,
    padding: 10,
  },
  containerPrincipal: {
    maxWidth: 350,
    height: "auto",

    margin: "auto",
    justifyContent: "center",
  },
  textoProduto: {
    padding: 5,
    lineHeight: 23,
    letterSpacing: 2.2,
    fontStyle: "italic",
    fontWeight: "bold",
  },

  principaisFuncionalidades: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },

  containerProdutos: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    Height: 197,

    borderRadius: 9,
    padding: 20,
    alignitems: "center",
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 1.4,
    marginTop: 25,
  },

  img: {
    /*Aqui é configuração do tamanho das imagens que vão dentro das caixas*/
    width: 120,
    height: 110,
    padding: 10,
    borderRadius: 6,
  },

  fab: {
    position: "absolute",
    margin: 12,
    right: 0,
    bottom: 0,
  },
});

export default Loja;
