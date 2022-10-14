import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

import { fetch } from "react-native/Libraries/Network/fetch";
import { RadioButton, Appbar, TextInput } from "react-native-paper";

import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

import Body from "../Componentes/Body";
import Botao from "../Componentes/Botao";

import DataBase from "../DBService/DBService";
import Input from "../Componentes/Input";
import Container from "../Componentes/Container";
import Header from "../Componentes/Header";
//import { inserirPessoa } from "../DBService/DBQuery";
import { insertUsuario } from "../DBService/DBUsuario";

const larguraTela = Dimensions.get("screen").width;

const CadastroUsuario = ({ navigation, route }) => {
  const [escondeSenha, setEscondeSenha] = useState(true);
  const [escondeConfirmarSenha, setEscondeConfirmarSenha] = useState(true);
  const [trySignIn,setTrySignIn]=useState(false);
  // Configurar DATE
  const [data, setData] = useState(moment(new Date()).format("DD/MM/YYYY"));
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [nome, setNome] = useState("Nobody");
  const [cpf, setCpf] = useState("23425326");
  const [telefone, setTelefone] = useState("235532235");
  const [rua, setRua] = useState("Nobody's street");
  const [bairro, setBairro] = useState("None");
  const [numeroCasa, setNumeroCasa] = useState("000");
  const [cep, setCep] = useState("63836285");
  const [cidade, setCidade] = useState("Nobody city");
  const [uf, setUf] = useState("Nb");
  const [complemento, setComplemento] = useState("null");
  const [tipoUsuario, setTipoUsuario] = useState("cliente"); // Cliente Default
  const [email, setEmail] = useState("nobody@yahoo.com.br");
  const [senha, setSenha] = useState("3632624242");
  const [confirmarSenha, setConfirmarSenha] = useState("3632624242"); // Tempo de execução
  const [dataCadastro, setDataCadastro] = useState(); // Somento DB
  useEffect(() => {
    DataBase.getConnection();
  }, []);

  const handleCadastrar = () => {
   setTrySignIn(true);
   
  
    // if (nome == "") 
    //  else if (data == "") set 
    //  else if (cpf == "") 
    //  else if (telefone == "") 
    //  else if (rua == "") {
    //  else if (bairro == "") 
    //  else if (numCasa == "") 
    //  else if (cep == "" || cep.length < 8) 
    //  else if (cidade == "") 
    //  else if (uf == "") 
    //  else if(complemento=="")
      insertUsuario({
        nome: nome,
        dtNascimento: data,
        cpf: cpf,
        telefone: telefone,
        rua: rua,
        bairro: bairro,
        numCasa: numeroCasa,
        cep: cep,
        cidade: cidade,
        uf: uf,
        complemento: complemento,
        email: email,
        senha: senha,
        tipoUsuario: tipoUsuario,
      })
        .then()
        .catch();

      // navigation.navigate("Login");
    }

  useEffect(() => {
    buscarEndereco();
  }, [cep]);

  const buscarEndereco = () => {
    const Cep = (e) => {
      if (String(cep).length == 8) {
        const meuCep = String(cep);

        const value = meuCep.replace(/[^0-9]+/, meuCep);
        const url = `https://viacep.com.br/ws/${value}/json/`;

        fetch(url)
          .then((response) => response.json())
          .then((json) => {
            if (json.logradouro) {
              setBairro(json.bairro);
              setCidade(json.localidade);
              setRua(json.logradouro);
            }
          });
      }
    };
    Cep();
  };

  return (
    <Container>
      <Header
        title={"Cadastro"}
        goBack={() => navigation.goBack()} // Só se houver tela empilhada
      >
        <Appbar.Action icon="check" onPress={() => handleSalvar()} />
      </Header>
      <Body>
        <ScrollView>
          <Image
            style={styles.logo}
            source={require("../assets/DATERRA-COMPLETO-800X1050.png")}
          />
          <View style={styles.radioContainer}>
            <View style={styles.radioItem}>
              <RadioButton
                value="cliente"
                status={tipoUsuario === "cliente" ? "checked" : "unchecked"}
                onPress={() => setTipoUsuario("Cliente")}
              />
              <Text>Cliente</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton
                value="produtor"
                status={tipoUsuario === "produtor" ? "checked" : "unchecked"}
                onPress={() => setTipoUsuario("Produtor")}
              />
              <Text>Produtor</Text>
            </View>
          </View>

          <Input label="Nome" onChangeText={setNome} value={nome} />
          
          <View
            style={
              {
                // flexDirection: 'row',
                // alignSelf: 'stretch',
                // flexGrow: 1,
                // backgroundColor: "#000"
              }
            }
          >
            <Input
              //style={{ flexBasis: 10, flexGrow: 1}}
              label="CPF"
              onChangeText={setCpf}
              keyboardType="decimal-pad"
              value={cpf}
            />

            {
              // Início Configuração DATE
              show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={"date"}
                  is24Hour={true}
                  display="default"
                  onTouchCancel={() => setShow(false)} // Para fechar
                  onChange={(event, date) => {
                    setShow(false);
                    setData(moment(date).format("DD/MM/YYYY"));
                  }}
                />
              )
            }
            <TouchableOpacity onPress={() => setShow(true)}>
              <Input
                label="Data Nascimento"
                value={data}
                left={<TextInput.Icon icon="calendar" />}
                editable={false}
              />
            </TouchableOpacity>
            {/* Fim configuração DATE*/}
          </View>
          <Input
            label="Telefone"
            keyboardType="decimal-pad"
            onChangeText={setTelefone}
            value= {telefone}
          />
          <Input label="Email" onChangeText={setEmail}value={email} />
          <Input
            label="CEP"
            keyboardType="decimal-pad"
            onChangeText={setCep}
            value={cep}
          />
          <Input label="Rua" onChangeText={setRua} value={rua} />
          <Input label="Bairro" onChangeText={setBairro} value={bairro} />
          <Input
            label="Nº"
            keyboardType="decimal-pad"
            onChangeText={setNumeroCasa}
          />
          <Input label="Cidade" onChangeText={setCidade} value={cidade} />
          <Input label="UF" onChangeText={setUf} />
          <Input label="Complemento" onChangeText={setComplemento} value={complemento}/>

          <Input
            label="Senha"
            value={senha}
            secureTextEntry={escondeSenha}
            right={
              <TextInput.Icon
                onPress={() =>
                  escondeSenha ? setEscondeSenha(false) : setEscondeSenha(true)
                }
                icon="eye"
              />
            }
            onChangeText={setSenha}
          />

          <Input
            label="Confirmar Senha"
            value={confirmarSenha}
            secureTextEntry={true}
            right={
              <TextInput.Icon
                onPress={() =>
                  escondeConfirmarSenha
                    ? setEscondeConfirmarSenha(false)
                    : setEscondeConfirmarSenha(true)
                }
                icon="eye"
              />
            }
            onChangeText={setConfirmarSenha}
          />
          
        
          <Botao
            style={styles.textoBotao}
            textoBotao="Cadastrar"
            mode="outlined"
            onPress={handleCadastrar}
          />
        </ScrollView>
      </Body>
    </Container>
  );
};
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  containerInput: {
    marginVertical: 40,
  },
  input: {
    backgroundColor: "#fff",
    padding: 5,
    marginHorizontal: 10,
    marginTop: 5,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  textoBotao: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },
  aviso: {
    padding: 10,
    color: "red",
    fontStyle: "italic",
  },
  logo: {
    height: 190,
    width: 145,
    padding: 10,
    marginBottom: 30,
    alignSelf: "center",
  },
});

export default CadastroUsuario;
