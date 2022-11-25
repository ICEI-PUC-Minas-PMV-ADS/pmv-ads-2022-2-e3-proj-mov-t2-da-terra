import React, { useContext, useState, useEffect } from 'react';

import { StyleSheet, Text, FlatList, View } from "react-native";
import { Button, List, Divider } from 'react-native-paper';

import Body from "../Componentes/Body";
import Container from '../Componentes/Container';
import Header from '../Componentes/Header';

import { PedidoContext } from '../contexts/webapi.PedidoProvider';
import { AuthContext } from "../contexts/AuthProvider";
import { UsuarioContext } from '../contexts/webapi.CadastroUsuario';

const MinhasVendas = () => {

  const [value, setValue] = useState(0);
  const [resultados, setResultados] = useState([]); // Pedidos
  //const [nomeCliente, setNomeCliente] = useState([]);

  const { getPedidoProdutor } = useContext(PedidoContext);
  const { user } = useContext(AuthContext);
  const { getCliente } = useContext(UsuarioContext);
  
  // Funcionando - EM TESTES
  useEffect(() => {
    let id = 0
    getPedidoProdutor(user.produtor.id)
      .then(res => {
        id = Object.values(res);
        //console.log(id[0].clienteId)
        setResultados(res)

        if (id != null) {
          let nomeCliente = ''
          getCliente(id[0].clienteId)
            .then(res => {
              nomeCliente = Object.values(res);
              //console.log(nomeCliente.nome)
              //setNomeCliente(nome[0].nome)
            });
        }
      })
  }, [])

  const renderItem = ({ item }) => {
    if (value == 0) {
      return (
        <View>
          {/* Número do Pedido / Preço / Usuário */}
          <List.Item
            title={`# ${item.id}`}
            titleStyle={{
              fontSize: 20,
              fontWeight: 'bold',
              lineHeight: 22,
              marginBottom: 8
            }}
            right={() =>
              <Text
                style={{ textAlignVertical: 'center', fontWeight: 'bold', marginRight: 10, fontSize: 18 }}>
                R$ {item.precoTotalPedido}
              </Text>
            }
            description={
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <List.Icon icon="account" />
                <Text style={{ fontSize: 16 }}>{item.clienteId}</Text>
              </View>
            }
          />
          {/* Itens */}
          <List.Accordion
            style={{ height: 70, marginTop: -25, textAlignVertical: 'center' }}
            title="Itens"
            titleStyle={{ fontSize: 16 }}
            left={() => <List.Icon icon="fruit-cherries" />}>
            <View>
              {/* <List.Item title={item.produtos.prod1 + `     R$ ${item.produtos.valor1}`} />
              <List.Item title={item.produtos.prod2 + `     R$ ${item.produtos.valor1}`} />
              <List.Item title={item.produtos.prod3 + `     R$ ${item.produtos.valor1}`} /> */}
            </View>
          </List.Accordion>

          {/* Botão Recusar / Aceitar */}
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
          <Divider style={{ borderWidth: 0.35, marginBottom: 5 }} />
        </View>
      );
    } else if (value == 1) {
      return (
        <Text>EM ANDAMENTO</Text>
      );
    } else {
      return (
        <Text>FINALIZADOS</Text>
      );
    }
  }

  return (
    <Container>
      <Header
        title={'Minhas Vendas'}
      />
      {/* Menu Superior - Segmented */}
      <View style={styles.viewBotaoSegmented}>
        <Button
          style={styles.botaoSegmented}
          mode='elevated'
          onPress={() => { setValue(0) }}
          buttonColor={value == 0 ? '#c8e5cc' : '#fff'}
        >
          <Text style={styles.textoBotaoSegmented}>Solicitado</Text>
        </Button>

        <Button
          style={styles.botaoSegmented}
          mode='elevated'
          onPress={() => { setValue(1) }}
          buttonColor={value == 1 ? '#c8e5cc' : '#fff'}
        >
          <Text style={styles.textoBotaoSegmented}>Andamento</Text>
        </Button>

        <Button
          style={styles.botaoSegmented}
          mode='elevated'
          onPress={() => { setValue(2) }}
          buttonColor={value == 2 ? '#c8e5cc' : '#fff'}
        >
          <Text style={styles.textoBotaoSegmented}>Finalizado</Text>
        </Button>
      </View>
      <Body>

        <View style={styles.viewFlatList}>
          <FlatList
            data={resultados}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>

      </Body>
    </Container>
  )
}

const styles = StyleSheet.create({
  /* FlatList */
  viewFlatList: {
    flexDirection: 'row',
    // padding: 5,
  },

  // Botões
  viewBotao: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  botao: {
    width: 140,
    marginTop: 8,
    marginBottom: 18,
  },
  textoBotao: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Menu Superior - Segmented
  viewBotaoSegmented: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  botaoSegmented: {
    flexGrow: 1,
    flexShrink: 1,
    backGroundColor: '#ccc',
    borderRadius: -50,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderColor: '#ccc',
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25
  },
  textoBotaoSegmented: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default MinhasVendas;

