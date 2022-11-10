import React,{useContext} from 'react';
import { Text, StyleSheet } from "react-native";

import Body from "../Componentes/Body";
import Container from '../Componentes/Container';

import { AuthContext } from '../contexts/AuthProvider';

const MinhaConta = () => {

    const {user,setUser} = useContext(AuthContext)//Provider com as informações do usuário logado
    return (
        <Body>
            {/* FotoDoUsuário */}
        <Image
          style={styles.foto}
          source={require("../assets/DATERRA-COMPLETO-800X1050.png")} //inserção da foto do usuário
        />
            <Text style={styles.viewTexto}>Nome: {user.nome}</Text>

            <Text style={styles.viewTexto}>Email: {user.email}</Text>
            
  

        </Body>
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

export default MinhaConta;