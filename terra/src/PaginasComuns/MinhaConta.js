import React, { useState, useEffect, useContext } from "react";

import { Avatar, BottomNavigation, Button  } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight, ToastAndroid, Alert,BackHandler, } from "react-native";

import { useNavigation,useRoute } from "@react-navigation/native";

import MeusPedidos from "./../PaginasCliente/MeusPedidos";
import BuscarProdutos from "./../PaginasCliente/BuscarProdutos";
import Carrinho from "../PaginasCliente/Carrinho"

import Botao from "../Componentes/Botao";
import Body from "../Componentes/Body";
import Container from "../Componentes/Container";
import CadastroUsuario from "./CadastroUsuario";

import { AuthContext } from "../contexts/AuthProvider";

const MinhaConta = () => {
  const navigation = useNavigation();
  const [imagem, setImagem] = useState(null);
  const rota = useRoute();
  const setToastMsg = msg=> {
    ToastAndroid.showWithGravity(
      msg,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const renderScene = BottomNavigation.SceneMap({
    buscarProdutos: BuscarProdutos,
    meusPedidos: MeusPedidos,
    minhaConta: MinhaConta,
    carrinho: Carrinho
  });
    const removeImage = () => {
      setImagem(' ')
      setToastMsg('Imagem removida');
    };
    
    const uploadImage = async () => {

  
    //TESTE GABRIEL - OK PARA ABRIR SELETOR DE IMAGEM,TRATAR A IMAGEM 
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        }).then(a=>{
          return a
        }).catch(e=>console.log(e));
    
        console.log(result);
        console.log(result);
    
        if (!result.cancelled) {
          setImagem(result.uri);
        }
    };

  const [index, setIndex] = useState(0);
  const { user } = useContext(AuthContext);
  const [idUser, setIdUser] = useState();
  const [userLogado, setUserLogado] = useState();

  const [routes] = useState([
    { key: "buscarProdutos", title: "Buscar", focusedIcon: "magnify" },
    { key: "meusPedidos", title: "Meus pedidos", focusedIcon: "truck-fast" },    
    { key: "carrinho", title: "Carrinho", focusedIcon: "cart" },
    { key: "minhaConta", title: "Minha Conta", focusedIcon: "account" },
  ]);

  // useEffect(() => {
  //   for (let i in user) {
  //     //setTipoUser(user[i].tipoUsuario)
  //     const tipoUser = user[i].tipoUsuario;
  //     setTipoUserLogado(tipoUser);

  //     if (tipoUser != undefined)
  //       console.log(tipoUser);
  //   }
  //   //console.log(user);
  // }, [])

  // useEffect(() => {
  //   for (let i in user) {
  //     const tipoUser = user[i].tipoUsuario;

  //     if (tipoUser != undefined) {
  //       console.log(tipoUser);      
  //       const novoUser = Object.values(user);
  //       console.log(novoUser[0].id);
  //     }
  //   }
  //   //const novoUser = Object.values(user);
  //   //  console.log(novoUser[0].id);
  // }, [])
  useEffect(() => {
    if (rota.name==="MinhaConta") {
      const backAction = () => {
       BackHandler.exitApp()
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      return () => backHandler.remove();
  
  }

    
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.photoContainer}>       
      <TouchableOpacity 
      onPress={() => uploadImage()}
      underlayColor='rgba(0,0,0,0)'>

        <Avatar.Image
        size={250}
        source={{uri:imagem}}
        />
      </TouchableOpacity>
        </View>
      {/* <Text>aqui: {userLogado.nome}</Text> */}
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          {/* <Text style={styles.name}>{tipoUsuario == "cliente" ? user.cliente.nome : user.produtor.nome}</Text> */}
          <Text style={styles.info}>{ }</Text>
          <Text style={styles.description}>

          </Text>

        <View style={[styles.photoButtonContainer, {marginTop: 10, flexDirection: 'row'}]}>
            <Button
              onPress={() => uploadImage()}
              style={styles.smallButton}
              buttonColor={"#3d9d74"}
              mode="contained">
              <Text>
              Upload
              </Text>
              </Button>

            <Button
              onPress={() => removeImage()}
              style={[styles.smallButton]}
              buttonColor={"#3d9d74"}
              mode="contained">
              <Text>
              Remover
              </Text>
            </Button>
        </View>
          <TouchableOpacity onPress={() => navigation.navigate("CadastroUsuario")} style={styles.buttonContainer}>
            <Botao
              style={styles.textoBotao}
              buttonColor={"#3d9d74"}
              textoBotao="Editar meu Perfil"
              mode="contained"
            />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.buttonContainer}>
            <Botao
              style={styles.textoBotao}
              buttonColor={"#3d9d74"}
              textoBotao="Notificações"
              mode="contained"
            />
          </TouchableOpacity>
          <BottomNavigation
              barStyle={{ backgroundColor: '#50ac5d' }}
              navigationState={{ index, routes }}
              onIndexChange={setIndex}
              renderScene={renderScene}
             />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#3d9d74",
    height: 90,
  },
  avatar: {
    width: 110,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginTop: -60,
    alignSelf: "center",
  },
  name: {
    fontSize: 22,
    color: "#9fd09d",

  },
  body: {
    marginTop: 20,
  },
  bodyContent: {
    alignItems: "center",
  },
  name: {
    fontSize: 25,
    marginTop: -12,
    fontWeight: "600",
  },
  info: {
    fontSize: 20,
    color: "#6cc438",
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 5,
    height: 60,
    flexDirection: "row",
    marginBottom: 20,
    borderRadius: 30,
  },
  photoButtonContainer: {
    borderRadius:15 ,
    marginBottom: 15,
    marginTop: 50,
    alignItems: 'center',
  },
  photoContainer: {
    marginTop: 50,
    marginBottom: 5,
    alignItems: 'center',
  },
  textoBotao: {
    textAlign: "center",
    fontSize: 18,
  },
  smallButton: {
    width: 135,
    marginBottom: 15,
    margin: 5
  }
});
export default MinhaConta;
