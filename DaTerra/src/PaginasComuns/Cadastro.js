import React, {useEffect, useState } from "react";
import { View, StyleSheet, Button } from "react-native";

import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import { TextInput } from "react-native-paper";

import DataBase from "../DBService/DBService";  
import { inserirPessoa } from "../DBService/DBQuery";


const Cadastro = ({ navigation }) => {
  const [nome, setNome] = useState();
  const [dataNascimento, setdataNascimento] = useState();
  const [cpf, setCpf] = useState();
  const [telefone, setTelefone] = useState();
  const [rua, setRua] = useState();
  const [bairro, setBairro] = useState();
  const [numCasa, setNumCasa] = useState();
  const [cep, setCep] = useState();
  const [cidade, setCidade] = useState();
  const [uf, setUf] = useState();
  const [complemento, setComplemento] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState(0);
  const [dataCadastro, setDataCadastro] = useState(moment(new Date()).format('DD/MM/YYYY'));

  useEffect(() => {
    DataBase.getConnection();  
  }, []);

  const cadastrarUsuario = async () => {    
    const pessoa = {
      nome: nome,
      idade: idade,
      curso: curso
    };
    console.log("Cadastro: " + pessoa);  // TESTE OBJETO OK
    await inserirPessoa(pessoa).then().catch();
    
    navigation.navigate('Lista');
  }
  
  return (
    <View styles={styles.container}>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          onChangeText={setNome}
          label='Nome'
        />
        <TextInput
          style={styles.input}
          onChangeText={setIdade}
          label='Idade'
          keyboardType="decimal-pad"
        />
        <TextInput
          style={styles.input}
          onChangeText={setCurso}
          label='Curso'
        />
      </View>
      <Button
        style={styles.btn}
        title='Salvar'
        onPress={() => cadastrarUsuario()}
      />
    </View>
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
});


export default Cadastro;