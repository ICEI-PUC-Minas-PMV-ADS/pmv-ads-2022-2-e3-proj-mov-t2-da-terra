import React, { useState, useEffect, useContext } from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

import { Button, Divider, FAB, List } from "react-native-paper";

import Body from "../Componentes/Body";
import Container from "../Componentes/Container";
import Header from "../Componentes/Header";

import { useNavigation, useIsFocused } from "@react-navigation/native";
import { getProdutos, getProdutosCompras } from "../DBService/DBProduto";

import ProdutoProvider from "../contexts/ProdutoProvider";

const ComprarProduto = ({ route }) => {

  // Alterar Rota para provider
  const { item } = route.params ? route.params : {};
  //const { produto } = useContext(ProdutoProvider);
  //console.log(produto);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [resultado, setResultado] = useState([]);
  const [quantidade, setQuantidade] = useState(1);

  console.log(item); // Item ok (via rota)

const upQntd=()=>{
setQuantidade(quantidade+1)
console.log(quantidade)

}

  useEffect(() => {
    getProdutosCompras(3).then(dados => {
      setResultado(dados);
    }).catch(error => console.log(error))
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <View>
      <View style={{ marginVertical: 20 }}>
        <Text style={styles.textNomeProduto}>{item.nome} {item.embalagem}</Text>
        <Text style={styles.textPreco}>R$ {item.preco}</Text>
      </View>
      
      <Divider style={{marginBottom: 20}} />

      {/*Imagem*/}
      <View style={styles.viewImg}>
        <Image
          style={styles.img}
          source={require("../assets/maracuja.jpg")} />
      </View>

      {/*Início Seletor Quantidade*/}
      <View style={styles.viewBotaoSeletorQtd}>
        {/* Botão Menos */}
        <TouchableOpacity
          style={styles.botaoSeletorQtd}
          onPress={() => { }}
        >
          <Text style={styles.textBotaoSeletorQtd}>-</Text>
        </TouchableOpacity>

        {/* Quantidade Dinâmica */}
        <View style={styles.viewTextDinamicoSeletorQtd}>
          <Text style={styles.textDinamicoSeletorQtd}>{quantidade}</Text>
        </View>

        {/* Botão Mais */}
        <TouchableOpacity
          onPress={() => {setQuantidade()}}
          style={styles.botaoSeletorQtd}
        >
          <Text style={styles.textBotaoSeletorQtd}>+</Text>
        </TouchableOpacity>
      </View>
      {/*Fim Seletor Quantidade*/}

      {/*Descrição e 'Mais Produtos do Usário'*/}
      <Divider />
      <View style={styles.textEntreDivider}>
        <Text style={styles.textDescricao}>{item.descricao}</Text>
      </View>
      <Divider />
      <View style={styles.textEntreDivider}>
        <Text style={styles.textMaisProdutos}>Mais produto de NOME_DA_LOJA</Text>
      </View>

      <Text>Dar um Select no banco, buscando produtos pelo o ID do usuário</Text>
    </View >
  );

  return (
    <Container>
      <Header title={'Anúncio'}
        goBack={() => navigation.goBack()} />
      <Body>
        <FlatList
          data={resultado}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </Body>
    </Container>
  );
}

const styles = StyleSheet.create({
  containerProdutos: {
    borderRadius: 10,
    padding: 10,
    margin: 5,
    backgroundColor: '#fff',
    elevation: 5,
  }, 
  // Imagem
  viewImg: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  img: {
    maxWidth: 318,
    maxHeight: 250,
    flexGrow: 1,
    flexShrink: 1,
    borderRadius: 10,
    marginRight: 10,
    alignSelf: 'center',
  },

  // Nome, embalagem, preço, descrição
  textNomeProduto: {
    textAlignVertical: 'center',
    marginLeft: 14,
    fontSize: 32,
    lineHeight: 34,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  textPreco: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 24,
    lineHeight: 26,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  textDescricao: {
    fontSize: 18,
    lineHeight: 20,
    alignSelf: 'flex-start',
  },

  // Seletor Quantidade
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
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 24,
    textAlign: 'center',
  },

  // Texto do final, 'mais produtos'
  textMaisProdutos: {
    fontSize: 16,
    lineHeight: 18,
    color: '#919191',
  },
  // Na parte da descrição e 'mais produtos'
  textEntreDivider: {
    marginHorizontal: 5,
    marginVertical: 10
  }
});

export default ComprarProduto;