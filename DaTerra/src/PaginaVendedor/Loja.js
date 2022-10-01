import React, { useContext, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import {
  TextInput,
  Portal,
  Dialog,
  Button,
  Provider,
  RadioButton
} from "react-native-paper";

import Body from "../Componentes/Body";
import Botao from "../Componentes/Botao";
import Container from "../Componentes/Container";
import Input from "../Componentes/Input";
import Header from "../Componentes/Header";

import { ProdutoContext } from "../contexts/ProdutoProvider";

const Loja = () => {
  const { cadastrarProduto } = useContext(ProdutoContext);

  // Categoria - Portal
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [nome, setNome] = useState();
  const [preco, setPreco] = useState();
  const [estoque, setEstoque] = useState();
  const [descricao, setDescricao] = useState();

  // Categoria: verduras, hortalicas, frutas, folhagens, bebidas, outros    
  const [categoria, setCategoria] = useState('Verduras');
  const [foto, setFoto] = useState(); // VER COMO IMPLEMENTAR

  const handleCadastro = () => {
    // Testes OK
    console.log('nome: ' + nome)
    console.log('preco: ' + preco)
    console.log('estoque: ' + estoque)
    console.log('decricao: ' + descricao)
    console.log('categoria: ' + categoria)

    // Context 
    cadastrarProduto(nome, preco, estoque, descricao, categoria);
  }

  return (
    <Provider>
      <Container>
        <Header title={'Cadastro de Produto'} />
        <Body>
          {/* <Text style={styles.titulo}>Cadastro de Produto</Text> */}
          <View style={styles.container}>
            <Input
              label='Nome'
              value={nome}
              onChangeText={(text) => setNome(text)}
              left={<TextInput.Icon icon='sort-variant' />}
            />
            <Input
              label='Preço'
              keyboardType='decimal-pad'
              value={preco}
              onChangeText={(text) => setPreco(text)}
              left={<TextInput.Icon icon='currency-brl' />}
            />
            <Input
              label='Quantidade em Estoque'
              keyboardType='decimal-pad'
              value={estoque}
              onChangeText={(text) => setEstoque(text)}
              left={<TextInput.Icon icon='archive-outline' />}
            />

            {/*Categoria - Portal*/}
            <TouchableOpacity onPress={showDialog}>
              <Input
                label='Categoria'
                editable={false}
                value={categoria}
                onChangeText={(text) => setCategoria(text)}
                left={<TextInput.Icon icon='segment' />}
              />
            </TouchableOpacity>
            <View>
              <Portal>
                <Dialog style={styles.dialog} visible={visible} onDismiss={hideDialog}>
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
                      /><Text>Hortaliças</Text>
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
            {/*Fim Categoria - Portal*/}

            <TextInput
              label='Descrição'
              mode="outlined"
              multiline={true}
              numberOfLines={5}
              style={styles.inputDescricao}
              onChangeText={(text) => setDescricao(text)}
              left={<TextInput.Icon icon='card-text-outline' />}
            />
            <View style={styles.viewBotao}>
              <TouchableOpacity onPress={() => handleCadastro()}>
                <Botao
                  style={styles.textoBotao}
                  textoBotao='Cadastrar'
                  mode='contained'
                  buttonColor='#3d9d74'
                />
              </TouchableOpacity>
            </View>
          </View>
        </Body>
      </Container>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 3,
  },
  titulo: {
    alignSelf: 'center',
    fontSize: 24,
    lineHeight: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textoBotao: {
    textAlign: "center",
    fontSize: 18,
  },
  viewBotao: {
    marginTop: 30,
    marginBottom: 25,
  },
  inputDescricao: {
    fontSize: 15,
    backgroundColor: "#FFFAFA",
    color: "white",
    margin: 3,
    textAlignVertical: 'top'
  },
  dialog: {
    backgroundColor: '#FFFAFA',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Loja;
