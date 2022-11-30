import React, { useState, useEffect, useContext } from "react";
import * as ImagePicker from 'expo-image-picker';

import { Avatar, BottomNavigation, Button } from 'react-native-paper';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  BackHandler
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";

import MeusPedidos from "./../PaginasCliente/MeusPedidos";
import BuscarProdutos from "./../PaginasCliente/BuscarProdutos";
import Carrinho from "../PaginasCliente/Carrinho"
import Botao from "../Componentes/Botao";
import Header from "../Componentes/Header";

import { AuthContext } from "../contexts/AuthProvider";
import { UsuarioContext } from "../contexts/webapi.CadastroUsuario";

const MinhaConta = () => {
  const navigation = useNavigation();
  const { user, setUser } = useContext(AuthContext);
  const { deleteProdutor, deleteCliente } = useContext(UsuarioContext)
  const [imagem, setImagem] = useState(null);
  const rota = useRoute();
  const [index, setIndex] = useState(0);

  const setToastMsg = msg => {
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

  const [routes] = useState([
    { key: "buscarProdutos", title: "Buscar", focusedIcon: "magnify" },
    { key: "meusPedidos", title: "Meus pedidos", focusedIcon: "truck-fast" },
    { key: "carrinho", title: "Carrinho", focusedIcon: "cart" },
    { key: "minhaConta", title: "Minha Conta", focusedIcon: "account" },
  ]);

  const removeImage = () => {
    setImagem(' ')
    setToastMsg('Imagem removida');
  };

  const uploadImage = async () => {
    //TESTE GABRIEL - OK PARA ABRIR SELETOR DE IMAGEM, TRATAR A IMAGEM 
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    }).then(a => {
      return a
    }).catch(e => console.log(e));

    console.log(result);
    console.log(result);

    if (!result.cancelled) {
      setImagem(result.uri);
    }
  };

  

  const excluirConta = () => {
    const userX = Object.values(user);
    console.log(userX[0].id);
    if (userX[0].tipoUsuario == 'produtor') {
      deleteProdutor(userX[0].id).then();
      setUser(undefined);
      navigation.navigate("Login");
    } else {
      deleteCliente(userX[0].id).then();
      setUser(undefined);
      navigation.navigate("Login");
    }
  }

  return (
    <View style={styles.container}>
      <Header title={"Minha Conta"} />
      <View style={styles.photoContainer}>
        <TouchableOpacity
          onPress={() => uploadImage()}
          underlayColor='rgba(0,0,0,0)'>
          <Avatar.Image
            size={250}
            source={{ uri: imagem }}
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

          <View style={[styles.photoButtonContainer, { marginTop: -30, flexDirection: 'row' }]}>
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
            <Button
              style={styles.buttonExcluir}
              mode='outlined'
              onPress={() => excluirConta()}
              textColor='#D32F2F'
            ><Text style={{
              textAlign: "center",
              fontSize: 16,
              textAlignVertical: 'center',
              lineHeight: 18,
            }}>Excluir Conta</Text></Button>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.buttonContainer}>
            <Botao
              style={styles.textoBotao}
              buttonColor={"#3d9d74"}
              textoBotao="Notificações"
              mode="contained"
            />
          </TouchableOpacity> */}
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
    height: 70,
  },
  avatar: {
    width: 110,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginTop: -40,
    alignSelf: "center",
  },
  name: {
    fontSize: 22,
    color: "#9fd09d",
  },
  body: {
    marginTop: 10,
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
    marginTop: 5,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 5,
    height: 50,
    flexDirection: "row",
    marginBottom: 20,
    borderRadius: 30,
  },
  buttonExcluir: {
    width: 180,
    height: 40,
    alignSelf: 'center',
    borderRadius: 20,
  },
  photoButtonContainer: {
    borderRadius: 15,
    marginBottom: 15,
    marginTop: 50,
    alignItems: 'center',
  },
  photoContainer: {
    marginTop: 40,
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
