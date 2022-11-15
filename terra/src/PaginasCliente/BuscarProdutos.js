import React, { useContext, useState, useEffect } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  BackHandler,
  Alert,
  Text,
} from "react-native";

import {
  TextInput,
  List,
  Searchbar,
  Portal,
  Dialog,
  Button,
  RadioButton,
  Provider
} from "react-native-paper";

import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

import Body from "../Componentes/Body";
import Container from "../Componentes/Container";

import { ProdutoContext } from "../contexts/webapi.ProdutoProvider";
import { AuthContext } from "../contexts/AuthProvider";

const BuscarProdutos = () => {
  const navigation = useNavigation();

  const { BuscaProdutos, produto, getBuscaProdutoCliente, setProduto } = useContext(ProdutoContext);

  const { user } = useContext(AuthContext)
  
  const [searchQuery, setSearchQuery] = useState();
  const [resultados, setResultados] = useState([]);

  // Categoria Portal - Terminar
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [categoria, setCategoria] = useState('Verduras');

  // Retornando Ok - Não alterar (Não está renderizando "de cara")
  useEffect(() => {
    //console.log(user);
    getBuscaProdutoCliente()  // Todos Produtos
      .then(() => setResultados(produto));
  }, [])


  // Retornando OK - Não alterar
  const onChangeSearch = (query) => {
    setSearchQuery(searchQuery);

    BuscaProdutos(query)
      .then(() => setResultados(produto));
  };

  const passProdutoRota = (produto) => {
    //Vai passar produto clicado para o contexto,este,esta passando pelas
    // rotas

    setProduto([produto])
    navigation.navigate("ComprarProduto")
  }

  // Terminar Filtro
  const portalBuscaCategoria = (click = true) => {
    return (
      <>
        {/* {
          click &&
          console.log(click)

        } */}
        <View style={styles.viewPrecoEmbalagem}>
          {/* <Text style={styles.textTitulos}>Categoria</Text>
          <TouchableOpacity onPress={showDialog}>
            <TextInput
              style={styles.inputEspecial}
              editable={false}
              value={categoria}
              onChangeText={(text) => setCategoria(text)}
              left={<TextInput.Icon icon='segment' />}
            />
          </TouchableOpacity> */}
        </View>
        <View>
          <Portal>
            <Dialog style={styles.dialog}
              visible={visible}
              onDismiss={hideDialog}>
              <Dialog.Title>Selecione a Categoria</Dialog.Title>
              <Dialog.Content>
                <View style={styles.radioItem}>
                  <RadioButton
                    value="Verduras"
                    status={categoria === 'Verduras' ? 'checked' : 'unchecked'}
                    onPress={() => setCategoria('Verduras')}
                  /><Text>Verduras</Text>
                </View>
                <View style={styles.radioItem}>
                  <RadioButton
                    value="Frutas"
                    status={categoria === 'Frutas' ? 'checked' : 'unchecked'}
                    onPress={() => setCategoria('Frutas')}
                  /><Text>Frutas</Text>
                </View>
                <View style={styles.radioItem}>
                  <RadioButton
                    value="Hortaliças"
                    status={categoria === 'Hortaliças' ? 'checked' : 'unchecked'}
                    onPress={() => setCategoria('Hortaliças')}
                  /><Text >Hortaliças</Text>
                </View>
                <View style={styles.radioItem}>
                  <RadioButton
                    value="Folhagens"
                    status={categoria === 'Folhagens' ? 'checked' : 'unchecked'}
                    onPress={() => setCategoria('Folhagens')}
                  /><Text>Folhagens</Text>
                </View>
                <View style={styles.radioItem}>
                  <RadioButton
                    value="Bebidas"
                    status={categoria === 'Bebidas' ? 'checked' : 'unchecked'}
                    onPress={() => setCategoria('Bebidas')}
                  /><Text>Bebidas</Text>
                </View>
                <View style={styles.radioItem}>
                  <RadioButton
                    value="Outros"
                    status={categoria === 'Outros' ? 'checked' : 'unchecked'}
                    onPress={() => setCategoria('Outros')}
                  /><Text>Outros</Text>
                </View>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>OK</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </>
    );
  }


  const renderItem = ({ item }) => (
    <View style={styles.containerProdutos}>
      <TouchableOpacity
        onPress={() => passProdutoRota(item)}


      >
        <List.Item
          title={`${item.nome}`}
          // left={() =>
          //   <Image
          //     style={styles.img}
          //     source={require("../assets/maracuja.jpg")} />}
          right={() =>
            <Text style={{ textAlignVertical: 'center' }}>R$ {item.preco}</Text>
          }
          description={`Estoque: ${item.estoque} ${item.embalagem}`}
        />
      </TouchableOpacity >

    </View>
  );

  return (
    // <Provider>
    <Container>
      <SafeAreaView>
        <Searchbar
          placeholder="Buscar Produto"
          onChangeText={onChangeSearch}
        //value={searchQuery}
        //  icon={'filter'}
        //onIconPress={(showDialog) => { portalBuscaCategoria() }}
        />
      </SafeAreaView>
      <Body>
        <FlatList
          data={resultados}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </Body>
    </Container>
    //   </Provider>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    // estilizar
  },
  containerProdutos: {
    justifyContent: "center",
    borderRadius: 10,
    padding: 10,
    margin: 5,
    backgroundColor: '#fff',
    elevation: 5,
  },

  // Categoria Portal
  dialog: {
    backgroundColor: '#FFFAFA',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewPrecoEmbalagem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputEspecial: {
    height: 48,
    width: 160,
    fontSize: 16,
    backgroundColor: "#FFFAFA",
    margin: 3,
    marginRight: 11
  },
  textTitulos: {
    marginTop: 14,
    textAlignVertical: 'center',
    marginLeft: 14,
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default BuscarProdutos;




// useEffect(() => {
  //   if(route.name=="HomeCliente"){
  //   const backAction = () => {
  //     Alert.alert("Espere!", "Você tem certeza que deseja sair do aplicativo?", [
  //       {
  //         text: "Cancel",
  //         onPress: () => null,
  //         style: "cancel"
  //       },
  //       { text: "YES", onPress: () => BackHandler.exitApp() }
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => backHandler.remove();}
  // }, []);
