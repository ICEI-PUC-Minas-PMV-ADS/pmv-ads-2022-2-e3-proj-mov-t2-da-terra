import React, { useContext, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
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
import { cadastrarProduto } from "../DBService/DBProduto";
import { useNavigation } from "@react-navigation/native";
  
import { ProdutoContext } from "../contexts/ProdutoProvider";

const Loja = () => {

  const navigation = useNavigation();
  
  // Categoria Portal
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  // Embalagem Portal
  const [visibleEmbalagem, setVisibleEmbalagem] = useState(false);
  const showDialogEmbalagem = () => setVisibleEmbalagem(true);
  const hideDialogEmbalagem = () => setVisibleEmbalagem(false);

  const [nome, setNome] = useState();
  const [preco, setPreco] = useState();
  const [estoque, setEstoque] = useState();
  const [descricao, setDescricao] = useState();

  // Categoria: verduras, hortalicas, frutas, folhagens, bebidas, outros    
  const [categoria, setCategoria] = useState('Verduras');
  const [embalagem, setEmbalagem] = useState("KG")
  const [foto, setFoto] = useState(); // VER COMO IMPLEMENTAR

  const handleCadastro = () => {
    // Testes OK
    
    
   // Metodo quem vem do provider produto,e do provider vem de fato o método de cadastrar do BD
   if(!nome||!preco||!embalagem||!estoque||!categoria||!descricao)
   cadastrarProduto({
      nomeProduto:nome,
      preco:preco,
      tipoEmbalagem:embalagem,
      quantidadeEstoque:estoque,
      categoriaProduto:categoria,
      descricao:descricao,
      

    }
    
   ).then()
      
      
      
       
    navigation.goBack();
  }

  return (
    <Provider>
      <Container>
        <Header
          title={'Cadastro de Produto'}
          goBack={() => navigation.goBack()} // Só se houver tela empilhada        
        />
        <Body>
          <ScrollView>
            <Text style={styles.textTitulos}>Nome</Text>
            <Input
              value={nome}
              activeOutlineColor={"#3d9d74"}
              onChangeText={(text) => setNome(text)}
              left={<TextInput.Icon icon='sort-variant'
         />}
            />

            <Text style={styles.textTitulos}>Descrição</Text>
            <TextInput
              style={styles.inputDescricao}
              mode="outlined"
              multiline={true}
              numberOfLines={5}
              activeOutlineColor={"#3d9d74"}             
              onChangeText={(text) => setDescricao(text)}
              left={<TextInput.Icon icon='card-text-outline' />}
            />

            <View style={styles.viewPrecoEmbalagem}>
              <Text style={styles.textTitulos}>Estoque</Text>
              <TextInput
                style={styles.inputEspecial}
                keyboardType='decimal-pad'
                value={estoque}
                activeUnderlineColor={"#3d9d74"}

                onChangeText={(text) => setEstoque(text)}
                left={<TextInput.Icon icon='archive-outline' />}
              ></TextInput>
            </View>

            {/*Tipo de Embalagem Portal*/}
            <View style={styles.viewPrecoEmbalagem}>
              <Text style={styles.textTitulos}>Embalagem</Text>
              <TouchableOpacity onPress={showDialogEmbalagem}>
                <TextInput
                  style={styles.inputEspecial}
                  keyboardType='decimal-pad'
                  editable={false}
                  value={embalagem}
                  onChangeText={(text) => setEmbalagem(text)}
                  left={<TextInput.Icon icon='archive-outline' />}
                ></TextInput>
              </TouchableOpacity>
            </View>
            <Portal>
              <Dialog style={styles.dialog}
                visible={visibleEmbalagem}
                onDismiss={hideDialogEmbalagem}>
                <Dialog.Title>Selecione a Embalagem</Dialog.Title>
                <Dialog.Content>
                  <View style={styles.radioItem}>
                    <RadioButton
                      value="KG"
                      status={embalagem === 'KG' ? 'checked' : 'unchecked'}
                      onPress={() => setEmbalagem('KG')}
                    /><Text>KG</Text>
                  </View>
                  <View style={styles.radioItem}>
                    <RadioButton
                      value="UN"
                      status={embalagem === 'UN' ? 'checked' : 'unchecked'}
                      onPress={() => setEmbalagem('UN')}
                    /><Text >UN</Text>
                  </View>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={hideDialogEmbalagem}>OK</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
            {/* Fim Tipo de Embalagem Portal*/}

            {/*Categoria Portal*/}
            <View style={styles.viewPrecoEmbalagem}>
              <Text style={styles.textTitulos}>Categoria</Text>
              <TouchableOpacity onPress={showDialog}>
                <TextInput
                  style={styles.inputEspecial}
                  editable={false}
                  value={categoria}
                  onChangeText={(text) => setCategoria(text)}
                  left={<TextInput.Icon icon='segment' />}
                />
              </TouchableOpacity>
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
            {/*Fim Categoria Portal*/}

            <View style={styles.viewPrecoEmbalagem}>
              <Text style={styles.textTitulos}>Preço</Text>
              <TextInput
                style={styles.inputEspecial}
                keyboardType='decimal-pad'
                value={preco}
                activeUnderlineColor={"#3d9d74"}
                
                onChangeText={(text) => setPreco(text)}
                left={<TextInput.Icon icon='currency-brl' />}
              ></TextInput>
            </View>

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
          </ScrollView>
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

  // View/TextInput/Text de preço e embalagem
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

export default Loja;
