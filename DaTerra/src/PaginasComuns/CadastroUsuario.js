import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { TextInput, RadioButton, TouchableOpacity } from "react-native-paper";

import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import Body from "../Componentes/Body";
import Botao from "../Componentes/Botao";

import DataBase from "../DBService/DBService";
import Input from "../Componentes/Input";
//import { inserirPessoa } from "../DBService/DBQuery";

const CadastroUsuario = ({ navigation }) => {
  const [dataNascimento, setDataNascimento] = useState(
    moment(new Date()).format('DD/MM/YYYY')
  );
  
  // Configurar DATE
  //const [show, setShow] = useState(false);
  //const[ date, setDate] = useState(new Date());
  
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
    console.log("Cadastro: " + pessoa);  // TESTE OBJETO OK
    await inserirPessoa(pessoa).then().catch();

    //navigation.navigate('Lista');
  }

  return (
    <Body>
      {/*Configurar Date */}
      {/* {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onTouchCancel={() => setShow(false)}
          onChange={(event, date) => {
            setShow(false);
            setDataNascimento(moment(date).format('DD/MM/YYYY'));
          }}
        />
      )}
      <TouchableOpacity onPress={() => setShow(true)}>
        <Input
          label="Data de Nascimento"
          value={dataNascimento}
          left={<TextInput.Icon name="calendar" />}
          editable={false}
        />
      </TouchableOpacity> */}

      <Input label="Nome" onChangeText={setNome} />

      <Input label="Data de Nascimento" onChangeText={setDataNascimento} />
      
      <Input label="CPF" onChangeText={setCpf} />
      <Input label="Telefone" onChangeText={setTelefone} />
      <Input label="Email" onChangeText={setEmail} />
      <Input label="Rua" onChangeText={setRua} />
      <Input label="Bairro" onChangeText={setBairro} />
      <Input label="Nº" onChangeText={setNumeroCasa} />
      <Input label="CEP" onChangeText={setCep} />
      <Input label="Cidade" onChangeText={setCidade} />
      <Input label="UF" onChangeText={setUf} />
      <Input label="Complemento" onChangeText={setComplemento} />

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

      <Input label="Email" onChangeText={setEmail} />
      <Input label="Senha" onChangeText={setSenha} />
      <Input label="Senha" onChangeText={setConfirmarSenha} />

      <Botao
        style={styles.textoBotao}
        textoBotao='Cadastrar'
        mode='contained'
      />
    </Body>
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
});


export default CadastroUsuario;