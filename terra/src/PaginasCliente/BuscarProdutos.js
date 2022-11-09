import React, { useContext, useState,useEffect, } from "react";
import { FlatList, Image, StyleSheet, View, TouchableOpacity, Text,BackHandler,Alert,} from "react-native";
import { List, Searchbar,FAB } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation,useRoute} from "@react-navigation/native";
// import { getProdutos, getSearchProduto } from "../DBService/DBProduto";
import Body from "../Componentes/Body";
import Container from "../Componentes/Container";
import { ProdutoContext } from "../contexts/webapi.ProdutoProvider";

const BuscarProdutos = () => {
  //Abaixo seria no caso aonde pegaria os dados da busca no banco
  //const {} = useContext(ProdutoProvider);
const navigation = useNavigation();
const route = useRoute();
const {BuscaProdutos,produto } = useContext(ProdutoContext);
const [searchQuery, setSearchQuery] = useState();
const [resultados, setResultados] = useState([]);
 
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

  
  useEffect(()=>{
    BuscaProdutos(searchQuery,"Verduras").then((prod)=>{   
        setResultados(prod)
        console.log(produto)  
    })
  },[searchQuery])
  
  const onChangeSearch = (query) => {
    setSearchQuery(query);  
    // for (let i = 0; i < searchQuery.length; i++) {      
    //   if (searchQuery[i].title == query) {
    //     // console.log(data[i].title);        
    //   }
    // }
  };

  const renderItem = ({ item }) => (
    <View style={styles.containerProdutos}>
      <TouchableOpacity
       onPress={() => navigation.navigate("ComprarProduto", { item })}
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
    <Container>
      <SafeAreaView>
        <Searchbar
          placeholder="Buscar Produto"
          onChangeText={onChangeSearch}
          value={searchQuery}
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
  );
};

const styles = StyleSheet.create({
  searchBar: {
    // Estilizar
  },
  containerProdutos: {
    justifyContent: "center",
    borderRadius: 10,
    padding: 10,
    margin: 5,
    backgroundColor: '#fff',
    elevation: 5,
  },
});

export default BuscarProdutos;
