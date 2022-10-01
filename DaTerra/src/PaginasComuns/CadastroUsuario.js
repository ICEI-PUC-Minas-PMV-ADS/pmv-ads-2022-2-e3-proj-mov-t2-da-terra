import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button, Text, ScrollView, TouchableOpacity, Image, Dimensions } from "react-native";

import { fetch } from "react-native/Libraries/Network/fetch";
import { RadioButton, Appbar, TextInput } from "react-native-paper";

import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import Body from "../Componentes/Body";
import Botao from "../Componentes/Botao";

import DataBase from "../DBService/DBService";
import Input from "../Componentes/Input";
import Container from "../Componentes/Container";
import Header from "../Componentes/Header";
//import { inserirPessoa } from "../DBService/DBQuery";


const larguraTela = Dimensions.get('screen').width

const CadastroUsuario = ({ navigation, route }) => {
  const [escondeSenha, setEscondeSenha] = useState(true)
  const [escondeConfirmarSenha, setEscondeConfirmarSenha] = useState(true)

  // Configurar DATE
  const [data, setData] = useState(moment(new Date()).format('DD/MM/YYYY'));
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const [nome, setNome] = useState();
  const [cpf, setCpf] = useState();
  const [telefone, setTelefone] = useState();
  const [rua, setRua] = useState();
  const [bairro, setBairro] = useState();
  const [numeroCasa, setNumeroCasa] = useState();
  const [cep, setCep] = useState();
  const [cidade, setCidade] = useState();
  const [uf, setUf] = useState();
  const [complemento, setComplemento] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState('cliente');  // Cliente Default
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [confirmarSenha, setConfirmarSenha] = useState(); // Tempo de execução
  const [dataCadastro, setDataCadastro] = useState();   // Somento DB

  const handleSalvar = () => (
    // Aqui vai chamar o banco para salvar o
    console.log("Salvar")
  )

  useEffect(() => {
    DataBase.getConnection();
  }, []);

  const cadastrarUsuario = async () => {
    const pessoa = {
      nome: nome,
      dataNascimento: dataNascimento,
      cpf: cpf,
      telefone: telefone,
      rua: rua,
      bairro: bairro,
      numeroCasa: numeroCasa,
      cep: cep,
      cidade: cidade,
      uf: uf,
      complemento: complemento,
      tipoUsuario: tipoUsuario,
      email: email,
      senha: senha,
      dataCadastro: dataCadastro,
    };
    alert("Cadastro: " + pessoa.senha);  // TESTE OBJETO OK
    await inserirPessoa(pessoa).then().catch();

    //navigation.navigate('Lista');
  }
  useEffect(() => {
    buscarEndereco()
  },
    [cep])

  const buscarEndereco = () => {
    const Cep = (e => {
      if (String(cep).length == 8) {
        const meuCep = String(cep);

        const value = meuCep.replace(/[^0-9]+/, meuCep);
        const url = `https://viacep.com.br/ws/${value}/json/`;

        fetch(url)
          .then(response => response.json())
          .then(json => {

            if (json.logradouro) {
              setBairro(json.bairro)
              setCidade(json.localidade)
              setRua((json.logradouro))
            }
          });
      }
    });
    Cep();
  }

  return (
    <Container>
      <Header
        title={'Cadastro'}
        goBack={() => navigation.goBack()} // Só se houver tela empilhada        
      >
        <Appbar.Action icon='check' onPress={() => handleSalvar()} />
      </Header>
      <Body>
        <ScrollView>
          <Image
            style={styles.logo}
            source={require('../assets/DATERRA-COMPLETO-800X1050.png')}
          />
          <View style={styles.radioContainer}>
            <View style={styles.radioItem}>
              <RadioButton
                value="cliente"
                status={tipoUsuario === 'cliente' ? 'checked' : 'unchecked'}
                onPress={() => setTipoUsuario('Cliente')}
              />
              <Text>Cliente</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton
                value="produtor"
                status={tipoUsuario === 'produtor' ? 'checked' : 'unchecked'}
                onPress={() => setTipoUsuario('Produtor')}
              />
              <Text>Produtor</Text>
            </View>
          </View>

          <Input label="Nome" onChangeText={setNome} />

          <View style={
            {
              // flexDirection: 'row',
              // alignSelf: 'stretch',
              // flexGrow: 1,              
              // backgroundColor: "#000"
            }
          }>
            <Input
              //style={{ flexBasis: 10, flexGrow: 1}}
              label="CPF"
              onChangeText={setCpf}
              keyboardType='decimal-pad'
            />

            { // Início Configuração DATE
              show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={'date'}
                  is24Hour={true}
                  display='default'
                  onTouchCancel={() => setShow(false)} // Para fechar
                  onChange={(event, date) => {
                    setShow(false);
                    setData(moment(date).format('DD/MM/YYYY'));
                  }}
                />
              )}
            <TouchableOpacity onPress={() => setShow(true)}>
              <Input
                label='Data Nascimento'
                value={data}
                left={<TextInput.Icon icon='calendar' />}
                editable={false}
              />
            </TouchableOpacity>
            {/* Fim configuração DATE*/}
          </View>
          <Input
            label="Telefone"
            keyboardType='decimal-pad'
            onChangeText={setTelefone}
          />
          <Input
            label="Email"
            onChangeText={setEmail}
          />
          <Input
            label="CEP"
            keyboardType='decimal-pad'
            onChangeText={setCep}
            value={cep}
          />
          <Input label="Rua" onChangeText={setRua} value={rua} />
          <Input label="Bairro" onChangeText={setBairro} value={bairro} />
          <Input
            label="Nº"
            keyboardType='decimal-pad'
            onChangeText={setNumeroCasa}
          />
          <Input label="Cidade" onChangeText={setCidade} value={cidade} />
          <Input label="UF" onChangeText={setUf} />
          <Input label="Complemento" onChangeText={setComplemento} />

          <Input label="Senha" secureTextEntry={escondeSenha}
            right={<TextInput.Icon onPress={() =>
              escondeSenha ?
                setEscondeSenha(false) : setEscondeSenha(true)} 
                icon="eye" />} onChangeText={setSenha} />

          <Input label="Confirmar Senha" secureTextEntry={true} right={<TextInput.Icon onPress={() =>
            escondeConfirmarSenha ?
              setEscondeConfirmarSenha(false) : setEscondeConfirmarSenha(true)} icon="eye" />} onChangeText={setConfirmarSenha} />

          <Botao
            style={styles.textoBotao}
            textoBotao='Cadastrar'
            mode='outlined'
            onPress={cadastrarUsuario}

          />
        </ScrollView>
      </Body>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  containerInput: {
    marginVertical: 40,
  },
  input: {
    backgroundColor: '#fff',
    padding: 5,
    marginHorizontal: 10,
    marginTop: 5,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textoBotao: {
    textAlign: "center",
    fontSize: 20,
    color: "white"
  },
  logo: {
    height: 190,
    width: 145,
    padding: 10,
    marginBottom: 30,
    alignSelf: 'center'
  },
});


export default CadastroUsuario;