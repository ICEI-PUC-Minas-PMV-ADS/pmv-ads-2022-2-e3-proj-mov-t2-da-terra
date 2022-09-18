import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { TextInput, RadioButton } from "react-native-paper";

import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import Body from "../Componentes/Body";
import Botao from "../Componentes/Botao";

import DataBase from "../DBService/DBService";
//import { inserirPessoa } from "../DBService/DBQuery";

const CadastroUsuario = ({ navigation }) => {
  const [nome, setNome] = useState();
  const [dataNascimento, setDataNascimento] = useState(
    moment(new Date()).format('DD/MM/YYYY')
  );
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
  const [dataCadastro, setDataCadastro] = useState(
    moment(new Date()).format('DD/MM/YYYY')
  );

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

  // SUBSTITUIR INPUTS
  return (
    <Body>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setNome}
          label='Nome'
        />
      </View>
      <View >
        <TextInput
          style={styles.input}
          onChangeText={setDataNascimento}
          label='Data de Nascimento'
        />
      </View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setCpf}
          label='CPF'
        />
      </View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setTelefone}
          label='Telefone'
        />
      </View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          label='Email'
        />
      </View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setRua}
          label='Rua'
        />
      </View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setBairro}
          label='Bairro'
        />
      </View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setNumeroCasa}
          label='Nº'
        />
      </View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setCep}
          label='CEP'
        />
      </View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setCidade}
          label='Cidade'
        />
      </View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setUf}
          label='UF'
        />
      </View>
      <View >
        <TextInput
          style={styles.input}
          onChangeText={setComplemento}
          label='Complemento'
        />
      </View>
      
        <View>
          <RadioButton
            value="cliente"
            status={tipoUsuario === 'cliente' ? 'checked' : 'unchecked'}
            onPress={() => setTipoUsuario('cliente')}
          />
          <Text>Cliente</Text>
        </View>
        <View>
          <RadioButton
            value="produtor"
            status={tipoUsuario === 'produtor' ? 'checked' : 'unchecked'}
            onPress={() => setTipoUsuario('produtor')}
          />
          <Text>Produtor</Text>
        </View>
      
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setSenha}
          label='Senha'
        />
      </View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setConfirmarSenha}  // Apenas em tempo de execução
          label='Confirmar Senha'
        />
      </View>
      <Botao textoBotao='Cadastrar'/>
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
});


export default CadastroUsuario;