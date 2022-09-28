import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button, Text, ScrollView, TouchableOpacity } from "react-native";
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

const CadastroUsuario = ({ navigation, route }) => {

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
      // dataNascimento: dataNascimento,
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
    console.log("Cadastro: " + pessoa);  // TESTE OBJETO OK
    await inserirPessoa(pessoa).then().catch();

    //navigation.navigate('Lista');
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

          <View style={styles.radioContainer}>
            <View style={styles.radioItem}>
              <RadioButton
                value="cliente"
                status={tipoUsuario === 'cliente' ? 'checked' : 'unchecked'}
                onPress={() => setTipoUsuario('cliente')}
              />
              <Text>Cliente</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton
                value="produtor"
                status={tipoUsuario === 'produtor' ? 'checked' : 'unchecked'}
                onPress={() => setTipoUsuario('produtor')}
              />
              <Text>Produtor</Text>
            </View>
          </View>

          <Input label="Nome" onChangeText={setNome} />      
          <Input      
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

          <Input
            label="Telefone"
            keyboardType='decimal-pad'
            onChangeText={setTelefone}
          />          
          <Input
            label="CEP"
            keyboardType='decimal-pad'
            onChangeText={setCep}
          />
          <Input label="Rua" onChangeText={setRua} />
          <Input label="Bairro" onChangeText={setBairro} />
          <Input
            label="Nº"
            keyboardType='decimal-pad'
            onChangeText={setNumeroCasa}
          />          
          <Input label="Cidade" onChangeText={setCidade} />
          <Input label="UF" onChangeText={setUf} />
          <Input label="Complemento" onChangeText={setComplemento} />

          <Input label="Email" onChangeText={setEmail} />
          <Input label="Senha" onChangeText={setSenha} />
          <Input label="Confirmar Senha" onChangeText={setConfirmarSenha} />

          <Botao
            style={styles.textoBotao}
            textoBotao='Cadastrar'
            mode='outlined'
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
  inputCpf: {
   
  }
});


export default CadastroUsuario;