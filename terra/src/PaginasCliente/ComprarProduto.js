import React, { useState, useEffect, useContext } from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  BackHandler

} from "react-native";

import { Divider, Button, Appbar, Snackbar } from "react-native-paper";

import Body from "../Componentes/Body";
import Container from "../Componentes/Container";
import Header from "../Componentes/Header";
import Seletor from "../Componentes/Seletor";
import { insertCarrinho } from "../DBService/DBCarrinho";
import { ProdutoContext } from "../contexts/webapi.ProdutoProvider";
import Database from "../DBService/DBService";
import { AuthContext } from "../contexts/AuthProvider";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";


const ComprarProduto = () => {
  const route = useRoute();

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);
  const [avisoSnack, setAvisoSnack] = useState();
  // Alterar Rota para provider
  // const { item } = route.params ? route.params : {};
  const { produto,getBuscaTodosProdutos } = useContext(ProdutoContext);
  const { user } = useContext(AuthContext)
  const [resultado, setResultado] = useState([]);

  const [quantidade, setQuantidade] = useState(1);
  let contador = quantidade;
  let precoTotal = quantidade * produto[0].preco
  
  useEffect(() => {
    if (route.name === "ComprarProduto") {
      const backAction = () => {
        navigation.goBack()
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();

    }


  }, []);


  useEffect(() => {
    getBuscaTodosProdutos().then();
  }, [isFocused])

  const upQtd = () => {
    if (contador < produto[0].estoque) {
      setQuantidade(contador += 1);
    }
    else if (quantidade + 1 > produto[0].estoque) {
      setAvisoSnack(" Você não poder pedir mais do que o estoque do Vendedor")
      onToggleSnackBar()
      contador--
    }
  };

  const downQtd = () => {
    if (contador == 1) {
      onToggleSnackBar()
      setAvisoSnack(`Peça pelo menos 1 ${produto[0].embalagem} do Produto`)
      setQuantidade(contador = 1);
    }
    else {
      setQuantidade(contador -= 1);
    }
  };

  useEffect(() => {
    //console.log(produto.estoque)
    Database.getConnection();
  }, []);

  // Dessa forma está criando um carrinho para cada produto inserido
  const addProdutoCarrinho = () => {
    // onToggleSnackBar();
    insertCarrinho(
      {
        idCliente: user.cliente.id,
        idProdutor: produto[0].produtorId,
        idProduto: produto[0].id,
        nome: produto[0].nome,
        embalagem: produto[0].embalagem,
        preco: produto[0].preco,
        quantidadeProduto: quantidade,
        precoTotal: precoTotal
      }
    ).then().catch()
    onToggleSnackBar()
    setAvisoSnack("Produto adicionado ao seu carrinho")
  }

  const renderItem = ({ item }) => (
    <View>
      <View style={{ marginVertical: 5 }}>
        <Text style={styles.textNomeProduto}>
          {item.nome} ({item.embalagem})
        </Text>
        <Text
          style={styles.textPreco}>
          R$ {item.preco.toFixed(2)} - Total R$ {precoTotal.toFixed(2)}
        </Text>
      </View>

      {/*Imagem*/}
      <Divider style={{ marginBottom: 10 }} />
      <View style={styles.viewImg}>
        <Image style={styles.img} source={require("../assets/maracuja.jpg")} />
      </View>

      {/* Seletor quantidade mais e menos */}
      <>
        < View style={styles.viewBotaoSeletorQtd} >
          {/* Botão Menos */}
          < TouchableOpacity
            style={styles.botaoSeletorQtd}
            onPress={() => downQtd()}
          >
            <Text style={styles.textBotaoSeletorQtd}> - </Text>
          </TouchableOpacity >

          {/* Quantidade Dinâmica */}
          < View style={styles.viewTextDinamicoSeletorQtd} >
            <Text style={styles.textDinamicoSeletorQtd}>{contador}</Text>
          </View >

          {/* Botão Mais */}
          <TouchableOpacity
            style={styles.botaoSeletorQtd}
            onPress={() => upQtd()}
          >
            <Text style={styles.textBotaoSeletorQtd}>+</Text>
          </TouchableOpacity >
        </View >
      </>

      {/*Botão Comprar*/}
      <View style={styles.viewBotaoComprar}>
        <Button
          icon="cart"
          mode="contained"
          buttonColor="#FF8919"
          onPress={addProdutoCarrinho}>
          <Text style={styles.labelBotao}>Comprar</Text>
        </Button>
      </View>

    <View style={styles.viewEstoque}>
      <Text style={styles.textoEstoque}>Quantidade disponível: {item.estoque}{item.embalagem}</Text>
      
    </View>
      {/*Descrição e 'Mais Produtos do Usuário'*/}
      <Divider style={{ marginVertical: 2 }} />
      <View style={styles.textEntreDivider}>
        <Text style={styles.textDescricao}>Descrição do produto: {item.descricao}</Text>

      </View>
      {/* <Divider style={{ marginVertical: 5 }} />
      <View style={styles.textEntreDivider}>
        <Text style={styles.textMaisProdutos}>
          Mais produto de NOME_DA_LOJA
        </Text>
      </View> */}

      {/* <View style={styles.viewVerMaisProdutos}>
        <View style={styles.cards}>
          <TouchableOpacity>
            <Image
              style={styles.imgPlus}
              source={require("../assets/img-banana.jpg")}
            />
            <Text style={styles.textoCard}>{item.nome} {item.embalagem}</Text>
            <Text style={styles.textoCard}>
              R$ {item.preco.toFixed(2)}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cards}>
          <TouchableOpacity>
            <Image
              style={styles.imgPlus}
              source={require("../assets/img-laranja.jpg")}
            />
            <Text style={styles.textoCard}>{item.nome} {item.embalagem}</Text>
            <Text style={styles.textoCard}>
              R$ {item.preco.toFixed(2)}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cards}>
          <TouchableOpacity>
            <Image
              style={styles.imgPlus}
              source={require("../assets/img-brocolis.jpg")}
            />
            <Text style={styles.textoCard}>{item.nome} {item.embalagem}</Text>
            <Text style={styles.textoCard}>
              R$ {item.preco.toFixed(2)}
            </Text>
          </TouchableOpacity>
        </View>
      </View> */}
    </View>
  );

  return (
    <Container>
      <Header title={"Anúncio"} goBack={() => navigation.goBack()}>
        <Appbar.Action
          style={{ marginRight: 10 }}
          icon="cart" onPress={() => navigation.navigate("Carrinho")} />
      </Header>

      <Body>
        <FlatList
          data={produto}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <Snackbar
          visible={visible}
          duration={1500}
          elevation={4}
          onDismiss={onDismissSnackBar}
          action={{
            label: "Ok",
          }}
        >

          {avisoSnack}
        </Snackbar>
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  containerProdutos: {
    borderRadius: 10,
    padding: 10,
    margin: 5,
    backgroundColor: "#fff",
    elevation: 5,
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
    maxWidth: 218,
    maxHeight: 155,
    flexGrow: 1,
    flexShrink: 1,
    borderRadius: 12,
    marginRight: 10,
    alignSelf: "center",
  },

  // Botão Adicionar ao Carrinho
  viewBotaoComprar: {
    marginVertical: 2,
    alignSelf: 'center',
  },
  labelBotao: {
    textAlign: "center",
    fontSize: 20,
    lineHeight: 22,
    fontWeight: 'bold',
    color: '#FFF',
  },

  // Nome, embalagem, preço, descrição
  textNomeProduto: {
    textAlignVertical: "center",
    marginLeft: 14,
    fontSize: 28,
    lineHeight: 34,
    // fontWeight: 'bold',
    alignSelf: "center",
    letterSpacing: 2,
  },
  textPreco: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 18,
    lineHeight: 26,
    alignSelf: "flex-start",
    fontStyle: "italic"
  },
  textDescricao: {
    fontSize: 18,
    lineHeight: 20,
    alignSelf: "flex-start",
  },

  // Seletor Quantidade
  viewBotaoSeletorQtd: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  botaoSeletorQtd: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#5f9846",
    elevation: 2,
  },
  textBotaoSeletorQtd: {
    color: "#FFF",
    fontSize: 30,
    fontWeight: "bold",
  },
  viewTextDinamicoSeletorQtd: {
    padding: 10,
    flexGrow: 1,
    flexShrink: 1,
    maxWidth: 80,
  },
  textDinamicoSeletorQtd: {
    fontSize: 22,
    fontWeight: "bold",
    lineHeight: 24,
    textAlign: "center",
  },

  // Texto do final, 'mais produtos'
  textMaisProdutos: {
    fontSize: 16,
    lineHeight: 17,
    color: "#919191",
  },
  viewEstoque:{
    marginTop:10,
  },
  textoEstoque:{
    marginLeft:6,
    fontSize:18,
    fontWeight:"bold"
  },
  // Na parte da descrição e 'mais produtos'
  textEntreDivider: {
    marginHorizontal: 5,
    marginVertical: 20,
  },
  viewBotaoSeletorQtd: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  botaoSeletorQtd: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#5f9846',
    elevation: 2,
  },
  textBotaoSeletorQtd: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
  viewTextDinamicoSeletorQtd: {
    padding: 10,
    flexGrow: 1,
    flexShrink: 1,
    maxWidth: 80
  },
  textDinamicoSeletorQtd: {
    fontSize: 23,
    fontWeight: 'bold',
    lineHeight: 24,
    textAlign: 'center',
  },
});

export default ComprarProduto;
