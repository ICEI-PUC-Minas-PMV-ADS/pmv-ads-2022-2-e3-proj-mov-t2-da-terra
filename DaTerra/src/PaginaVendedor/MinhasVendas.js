import React, { useContext, useState } from 'react';

import { StyleSheet, Text, FlatList, View,TouchableOpacity } from "react-native";
import { Button, Card, Title, Paragraph, List, Divider } from 'react-native-paper';

import Body from "../Componentes/Body";
import Container from '../Componentes/Container';
import Header from '../Componentes/Header';
import Botao from '../Componentes/Botao';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Pedido #1',
    usuario: 'Carlos',
    produtos: 
      {
      prod1: 'abobora',
      valor1: '4,98',
      prod2: 'tomate',
      valor2: '14,98',
      prod3: 'abacate',
      valor3: '9,98',
      },
      valor: "29,94"
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Pedido #2',
    usuario: 'Joana',
    produtos: {      
      prod1: 'cenoura',
      valor1: '4,98',
      prod2: 'beterraba',
      valor2: '14,98',
      prod3: 'maçã',
      valor3: '9,98',
      },    
      valor: "29,94"
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Pedido #3',
    usuario: 'Maria',
    produtos: 
      {
      prod1: 'espinafre',
      valor1: '4,98',
      prod2: 'pêra',
      valor2: '14,98',
      prod3: 'melão',
      valor3: '9,98',
      },
    valor: "29,94"
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d74',
    title: 'Pedido #4',
    usuario: 'João',
    produtos: 
      {
      prod1: 'espinafre',
      valor1: '4,98',
      prod2: 'pêra',
      valor2: '14,98',
      prod3: 'melão',
      valor3: '9,98',
      },
    valor: "29,94"
  },
];

const MinhasVendas = () => {
  const renderItem = ({ item }) => (    
   <View>     
        <List.Item
          title={`${item.title}`}
        titleStyle={{
          fontSize: 20,
          fontWeight: 'bold',
          lineHeight: 22,
          marginBottom: 8
        }}        
          right={() =>
            <Text
              style={{ textAlignVertical: 'center'}}>
              R$ {item.valor}
            </Text>
          }                     
          description={
            <View style={{flexDirection:'row', alignItems: 'center'}}>
              <List.Icon icon="account"/>
              <Text>{item.usuario}</Text>
            </View>
          }                    
      />  
     
      <List.Accordion
        title="Itens"
        left={() => <List.Icon icon="fruit-cherries" />}>
        <View>
          <List.Item title={item.produtos.prod1 + `     R$ ${item.produtos.valor1}`} />           
          <List.Item title={item.produtos.prod2 + `     R$ ${item.produtos.valor1}`} />           
          <List.Item title={item.produtos.prod3 + `     R$ ${item.produtos.valor1}`} /> 
        </View>
      </List.Accordion>
      <View style={styles.viewBotao}>    
      <Button
       style={styles.botao}   
          mode="contained"
          buttonColor={'#D32F2F'}
          onPress={() => console.log('Pressed')}>          
          <Text style={styles.textoBotao}>Recusar</Text>
      </Button> 
        <Button
       style={styles.botao}   
          mode="contained"
          buttonColor={'#3d9d74'}
          onPress={() => console.log('Pressed')}>          
          <Text style={styles.textoBotao}>Aceitar</Text>
      </Button>       
    
      </View>
      <Divider style={{ borderWidth: 0.2, marginBottom: 5 }} />
    </View>    
  );

  return (
    <Container>
      <Header
        title={'Meus Pedidos'}
      />
      <Body>    
        <Text style={styles.textTitulos}>Solicitações</Text>
        <View style={styles.viewFlatList}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
          </View>       
       
        </Body>
    </Container>
  );
}

const styles = StyleSheet.create({
  viewFlatList: {
    flexDirection: 'row', 
    padding: 5,
  },
  textTitulos: {    
    marginTop: 25,
    textAlignVertical: 'center',
    marginLeft: 14,
    fontSize: 22,
    lineHeight: 24,
    fontWeight: 'bold'
  },
  viewBotao: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  botao: {
    width: 140,
    marginTop: 8,
    marginBottom: 12,
  },
  textoBotao: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: 'bold',    
  },
});

export default MinhasVendas;


  // <View>
    //   <List.Section
    //     title={"Data xxxxxx"}
    //     titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
    //   >
    //     <List.Accordion
    //       title="Pedidos"
    //       left={props => <List.Icon {...props} icon="folder" />}>
    //      <List.Item title="Pedido XX     R$ 0,00" /> 
    //     </List.Accordion>
    //   </List.Section>
    //   <Divider style={{ borderWidth: 0.2 }} />
    // </View>
    
    