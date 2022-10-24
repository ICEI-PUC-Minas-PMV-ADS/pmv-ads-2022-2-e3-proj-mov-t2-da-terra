import React, { useState, useEffect, useContext } from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,

} from "react-native";

import { Divider, Button, Appbar } from "react-native-paper";

import Body from "../Componentes/Body";
import Container from "../Componentes/Container";
import Header from "../Componentes/Header";
import Seletor from "../Componentes/Seletor";
import Carrinho from "../PaginasCliente/Carrinho";

import { useNavigation, useIsFocused } from "@react-navigation/native";
import { getProdutos, getProdutosCompras } from "../DBService/DBProduto";

import { ProdutoContext } from "../contexts/webapi.ProdutoProvider";

const ComprarProduto = ({ route }) => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // Alterar Rota para provider
  const { item } = route.params ? route.params : {};
  //const { produto } = useContext(ProdutoContext);  
    
  const [resultado, setResultado] = useState([]);

  console.log(item);

  useEffect(() => {
    getProdutosCompras(1)
      .then((dados) => {
        setResultado(dados);
      })
      .catch((error) => console.log(error));
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <View>
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.textNomeProduto}>
          {item.nome} {item.embalagem}
        </Text>
        <Text style={styles.textPreco}>R$ {item.preco.toFixed(2)}</Text>
      </View>

      {/*Imagem*/}
      <Divider style={{ marginBottom: 10 }} />
      <View style={styles.viewImg}>
        <Image style={styles.img} source={require("../assets/maracuja.jpg")} />
      </View>

      {/* Seletor quantidade mais e menos */}
      <Seletor />

      {/*Botão Comprar*/}
      <View style={styles.viewBotaoComprar}>
        <Button
          icon="cart"
          mode="contained"
          buttonColor="#FF8919"
          onPress={() => console.log('Pressed')}>
          <Text style={styles.labelBotao}>Comprar</Text>
        </Button>
      </View>

      {/*Descrição e 'Mais Produtos do Usário'*/}
      <Divider style={{ marginVertical: 5 }} />
      <View style={styles.textEntreDivider}>
        <Text style={styles.textDescricao}>{item.descricao}</Text>

        {/* <Text style={styles.textDescricao}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac efficitur urna, a ultricies metus. Fusce ut mauris feugiat tellus scelerisque elementum sed quis purus. In eu risus bibendum, eleifend mi in, consequat quam. Etiam non est quis odio ornare porta. Vivamus sagittis neque ut tellus facilisis, eu aliquam erat ornare. Nullam pulvinar cursus dapibus. Nam facilisis felis nec consequat feugiat. Mauris dignissim dignissim tortor id euismod. Sed vitae pharetra sem, vel aliquam libero. Praesent laoreet, nunc varius ultrices euismod, mi ipsum aliquet mauris, id vehicula lacus leo sed neque. Praesent tristique enim a maximus sodales. Morbi fringilla vitae ante eget semper.</Text> */}
      </View>
      <Divider style={{ marginVertical: 5 }} />
      <View style={styles.textEntreDivider}>
        <Text style={styles.textMaisProdutos}>
          Mais produto de NOME_DA_LOJA
        </Text>
      </View>

      <View style={styles.viewVerMaisProdutos}>
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
      </View>
    </View>
  );

  return (
    <Container>
      <Header title={"Anúncio"} goBack={() => navigation.goBack()}>
        <Appbar.Action
          style={{marginRight: 10}}
          icon="cart" onPress={() => navigation.navigate("Carrinho")} />
      </Header>

      <Body>
        <FlatList
          data={resultado}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
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
    maxWidth: 228,
    maxHeight: 175,
    flexGrow: 1,
    flexShrink: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginRight: 10,
    alignSelf: "center",
  },

  // Botão Adicionar ao Carrinho
  viewBotaoComprar: {
    marginVertical: 5,
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
    fontSize: 31,
    lineHeight: 34,
    // fontWeight: 'bold',
    alignSelf: "center",
    letterSpacing: 2,
  },
  textPreco: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 24,
    lineHeight: 26,
    alignSelf: "flex-start",
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

  // Na parte da descrição e 'mais produtos'
  textEntreDivider: {
    marginHorizontal: 5,
    marginVertical: 2,
  },
});

export default ComprarProduto;
