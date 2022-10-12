import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  FlatList
} from "react-native";
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
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { getProdutosUsuario } from "../DBService/DBProduto";
const Loja = () => {
  const navigation = useNavigation();
  const { produtos, setProdutos } = useState([]);
  const { usuario } = useContext(AuthContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    getProdutosUsuario().then((produtos)=>{
      setProdutos(produtos);

    })


  }, [isFocused]);

  return (
    <>
    
       
      <View style={styles.apresentacao}>
        <Text style={{ fontSize: 25 }}>Loja de {usuario.nome}</Text>
        <Text style={{ fontSize: 20 }}>{usuario.nomeLoja}</Text>
      </View>
      <ScrollView>
        <View style={styles.containerPrincipal}>
          <View style={styles.principaisFuncionalidades}>
            <View style={styles.containerProdutos}>
              <TouchableOpacity
                onPress={() => navigation.navigate("EditarProduto")}
              >
                <Image
                  style={styles.img}
                  source={require("../assets/maracuja.jpg")}
                />
                <Text style={styles.textoProduto}>Maracujá</Text>
                <Text style={styles.textoProduto}>Fruta</Text>
                <Text style={styles.textoEstoque}>5kg</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.containerProdutos}>
              <TouchableOpacity
                onPress={() => navigation.navigate("EditarProduto")}
              >
                <Image
                  style={styles.img}
                  source={require("../assets/img-banana.jpg")}
                />
                <Text style={styles.textoProduto}>Banana</Text>
                <Text style={styles.textoCategoria}>Fruta</Text>

                <Text style={styles.textoEstoque}>3kg</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerProdutos}>
              <TouchableOpacity
                onPress={() => navigation.navigate("EditarProduto")}
              >
                <Image
                  style={styles.img}
                  source={require("../assets/img-maça.jpg")}
                />
                <Text style={styles.textoProduto}>Maça</Text>
                <Text style={styles.textoCategoria}>Fruta</Text>

                <Text style={styles.textoEstoque}>2kg</Text>
              </TouchableOpacity>
            </View>

                     
          <View style={styles.containerProdutos}>
            <TouchableOpacity onPress={()=> navigation.navigate("EditarProduto")}>

            <Image
              style={styles.img}
              source={require("../assets/img-laranja.jpg")}
            />
            <Text style={styles.textoProduto}>Laranja</Text>
            <Text style={styles.textoCategoria}>Fruta</Text>

            <Text style={styles.textoEstoque}>7kg</Text>


            </TouchableOpacity>
          </View>
          <View style={styles.containerProdutos}>
             <TouchableOpacity onPress={()=> navigation.navigate("EditarProduto")}>

            <Image
              style={styles.img}
              source={require("../assets/img-alface.jpg")}
            />
            <Text style={styles.textoProduto}>Alface</Text>
            <Text style={styles.textoCategoria}>Hortaliça</Text>

            <Text style={styles.textoEstoque}>2,5kg</Text>

             </TouchableOpacity>
          </View>
          <View style={styles.containerProdutos}>
          <TouchableOpacity onPress={()=> navigation.navigate("EditarProduto")}>

            <Image
              style={styles.img}
              source={require("../assets/img-brocolis.jpg")}
            />
            <Text style={styles.textoProduto}>Brócolis</Text>
            <Text style={styles.textoCategoria}>Vegetal</Text>

            <Text style={styles.textoEstoque}>2kg</Text>

          </TouchableOpacity>

          </View>
          </View>
        </View>

        
      </ScrollView>
      <FAB
          style={styles.fab}
          small
          icon ="plus"
          onPress={() => navigation.navigate("CadastrarProduto")}
        /> 
    </>
  );
};

const styles = StyleSheet.create({
  apresentacao: {
    marginTop: 40,
    padding: 10,
    alignItems: "center",
  },
  containerPrincipal: {
    maxWidth: 350,
    height: "auto",

    margin: "auto",
    justifyContent: "center",
  },
  textoProduto: {
    padding: 3,
    letterSpacing: 2.2,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  textoEstoque: {
    padding: 2,
    letterSpacing: 2.2,
    fontStyle: "italic",
    fontWeight: "bold",
    marginLeft: 85,
  },
  textoCategoria: {
    padding: 3,
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
    borderRadius: 9,
    padding: 15,
    alignitems: "center",
    fontWeight: "bold",
    fontSize: 1.4,
    marginTop: 15,
  },

  img: {
    /*Aqui é configuração do tamanho das imagens que vão dentro das caixas*/
    width: 127,
    height: 100,
    padding: 10,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
    borderWidth: 0.8,
  },

  fab: {
    position: "absolute",
    margin: 12,
    right: 0,
    bottom: 0,
    
  },
});

export default Loja;
