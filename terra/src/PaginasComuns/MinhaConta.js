import React, { useContext } from 'react';
import { Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button } from 'react-native-paper';

import Body from "../Componentes/Body";
import Container from '../Componentes/Container';
import Botao from '../Componentes/Botao';

import { AuthContext } from '../contexts/AuthProvider';

const MinhaConta = () => {

  const { user, setUser } = useContext(AuthContext)//Provider com as informações do usuário logado
  return (
    <Container>
      <Body>
        {/* FotoDoUsuário */}
        <Image
          style={styles.foto}
          source={require("../assets/DATERRA-COMPLETO-800X1050.png")} //inserção da foto do usuário
        />
        <Text style={styles.viewTexto}>Nome:</Text>
        <Text style={styles.viewTexto}>Email: </Text>
        
        {/* Somente para teste */}
        {/* <TouchableOpacity onPress={() => {}}>
          <Botao                          
            mode='contained'
            buttonColor='#3d9d74'
          />
        </TouchableOpacity> */}
      </Body>
    </Container>
  );
}

const styles = StyleSheet.create({
  containerProdutos: {
    borderRadius: 10,
    padding: 10,
    margin: 5,
    backgroundColor: "#fff",
    elevation: 5,
  },
  foto: {
    height: 190,
    width: 145,
    padding: 10,
    marginBottom: 30,
    alignSelf: "center",
  },
  viewTexto: {
    width: 350,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -11,
  },
  // Imagem
  viewImg: {
    flexDirection: "row",
    justifyContent: "center",
  },
  textoCard: {
    marginVertical: 3,
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 0.75,
  },
  viewVerMaisProdutos: {
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  imgPlus: {
    width: 101,
    height: 83,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  img: {
    maxWidth: 228,
    maxHeight: 175,
    flexGrow: 1,
    flexShrink: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginRight: 10,
    alignSelf: "center",
  }
});
