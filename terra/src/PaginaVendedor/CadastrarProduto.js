import React, { useContext, useEffect, useState } from "react";
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

import { useNavigation } from "@react-navigation/native";
import { ProdutoContext } from "../contexts/webapi.ProdutoProvider";

const CadastarProduto = ({ route }) => {

  const navigation = useNavigation();

  // Categoria Portal
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  // Embalagem Portal
  const [visibleEmbalagem, setVisibleEmbalagem] = useState(false);
  const showDialogEmbalagem = () => setVisibleEmbalagem(true);
  const hideDialogEmbalagem = () => setVisibleEmbalagem(false);

  const [nome, setNome] = useState("Pera");
  const [preco, setPreco] = useState(7.98);
  const [estoque, setEstoque] = useState(25);
  const [descricao, setDescricao] = useState("Top de Linha");

  // Categoria: verduras, hortalicas, frutas, folhagens, bebidas, outros    
  const [categoria, setCategoria] = useState('Verduras');
  const [embalagem, setEmbalagem] = useState("KG")
  const [foto, setFoto] = useState(); // VER COMO IMPLEMENTAR

  // Faltando informação
  const [missInfo, setMissInfo] = useState(false);

  // Verificando se tem dados na rota
  const { item } = route.params ? route.params : {};

  // Context Produto
  const { postProduto, putProduto, deleteProduto } = useContext(ProdutoContext);

  // Está estática para testes, mas vai vir da api com o ID do usuário logado para setar na tabela Produtos no DB
  const usuarioLogado = 5;

  // Para exibir dados quando clica no card do produto (editar)
  useEffect(() => {
    if (item) { // Se vier dados da rota
      setNome(item.nome);
      setPreco(item.preco.toFixed(2));
      setEstoque(item.estoque.toFixed(0));
      setDescricao(item.descricao);
      setCategoria(item.categoria);
      setEmbalagem(item.embalagem);
      // inserir foto     
    }
  }, [item]);

  // Cadastrar produto e validar campos 
  const handleCadastro = () => {
    if (!nome || !preco || !embalagem ||
      !estoque || !categoria || !descricao) {
      setMissInfo(true);  // Faltam dados
    } else {
      setMissInfo(false); // Seta FALSE, pois o usuário já preencheu o restante dos dados
      if (!item) {
        postProduto({ // TESTE OK
          nome: nome.trim(),
          preco: preco.trim(),
          embalagem: embalagem,
          estoque: estoque.trim(),
          categoria: categoria,
          descricao: descricao.trim(),
<<<<<<< HEAD
          //usuarioLogado: usuarioLogado.trim() // PARA TESTE
=======
          // usuarioLogado: usuarioLogado.trim() // PARA TESTE
>>>>>>> 03d13e4710a245bd63b655b0acf40dad2f3be9a2
        }).then();
      } else {
        putProduto({ // TESTE OK
          nome: nome.trim(),
          preco: preco.trim(),
          embalagem: embalagem,
          estoque: estoque.trim(),
          categoria: categoria,
          descricao: descricao.trim(),
          id: item.id,
        }).then();
      }
      navigation.goBack();
    }
  }

  const handleExcluir = () => { // TESTE OK
    deleteProduto(item.id).then().catch();
    navigation.goBack();
  }

  return (
    <Provider>
      <Container>
        <Header
          title={item ? 'Editar Produto' : 'Cadastrar Produto'}
          // Só se houver tela empilhada        
          goBack={() => navigation.goBack()}
        />
        <Body>
          <ScrollView>

            {/* Nome do Produto */}
            <Text style={styles.textTitulos}>Nome</Text>
            <Input
              value={nome}
              activeOutlineColor={"#3d9d74"}
              error={missInfo && !nome ? true : false}
              onChangeText={(text) => setNome(text)}
              left={<TextInput.Icon icon='sort-variant'
              />}
            />

            {/* Descrição */}
            <Text style={styles.textTitulos}>Descrição</Text>
            <TextInput
              style={styles.inputDescricao}
              mode="outlined"
              multiline={true}
              numberOfLines={5}
              activeOutlineColor={"#3d9d74"}
              error={missInfo && !descricao ? true : false}
              value={descricao}
              onChangeText={(text) => setDescricao(text)}
              left={<TextInput.Icon icon='card-text-outline' />}
            />

            {/* Estoque */}
            <View style={styles.viewPrecoEmbalagem}>
              <Text style={styles.textTitulos}>Estoque</Text>
              <TextInput
                style={styles.inputEspecial}
                keyboardType='decimal-pad'
                value={estoque}
                activeUnderlineColor={"#3d9d74"}
                error={missInfo && !estoque ? true : false}
                onChangeText={(text) => setEstoque(text)}
                left={<TextInput.Icon icon='archive-outline' />}
              />
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
                />
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

            {/* Preço */}
            <View style={styles.viewPrecoEmbalagem}>
              <Text style={styles.textTitulos}>Preço</Text>
              <TextInput
                style={styles.inputEspecial}
                keyboardType='decimal-pad'
                value={preco}
                activeUnderlineColor={"#3d9d74"}
                error={missInfo && !preco ? true : false}
                onChangeText={(text) => setPreco(text)}
                left={<TextInput.Icon icon='currency-brl' />}
              ></TextInput>
            </View>

            {/* Botão - Cadastrar/ Salvar/ Excluir */}
            <View style={styles.viewBotao}>
              <TouchableOpacity onPress={() => handleCadastro()}>
                <Botao
                  style={styles.textoBotao}
                  textoBotao={item ? 'Salvar' : 'Cadastrar'}
                  mode='contained'
                  buttonColor='#3d9d74'
                />
              </TouchableOpacity>
              <View style={{ marginTop: 10 }}>
                <TouchableOpacity onPress={() => handleExcluir()}>
                  { // Só renderiza se houver item (na rota)
                    item &&
                    <Botao
                      style={styles.textoBotao}
                      textoBotao='Excluir'
                      mode='outlined'
                      buttonColor='#D32F2F'
                      textColor='#FFF'
                    />
                  }
                </TouchableOpacity>
              </View>
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
    fontWeight: 'bold'
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

  // Preço, embalagem, estoque, categoria
  viewPrecoEmbalagem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  /* TextInput Direto: Embalagem, categoria, estoque
  preço, descrição 
  */
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

export default CadastarProduto;
