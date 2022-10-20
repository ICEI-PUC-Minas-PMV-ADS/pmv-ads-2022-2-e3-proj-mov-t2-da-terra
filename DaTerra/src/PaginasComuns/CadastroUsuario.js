import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

import { fetch } from "react-native/Libraries/Network/fetch";
import { RadioButton, Appbar, TextInput, } from "react-native-paper";

import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

import Body from "../Componentes/Body";
import Botao from "../Componentes/Botao";

import DataBase from "../DBService/DBService";
import Input from "../Componentes/Input";
import Container from "../Componentes/Container";
import Header from "../Componentes/Header";
//import { inserirPessoa } from "../DBService/DBQuery";
import { getCadastrado, getLogin, insertUsuario } from "../DBService/DBUsuario";


/* CEP PARA TESTE 01311-000 */

const CadastroUsuario = ({ navigation, route }) => {

  // Esconde Senha e Avisos
  const [escondeSenha, setEscondeSenha] = useState(true);
  const [user, setUser] = useState([]);
  const [escondeConfirmarSenha, setEscondeConfirmarSenha] = useState(true);
  const [missInfo, setMissInfo] = useState(false);
  const [userAlredyRegister, setUserAlredyRegister] = useState(false);

  // Configurar DATE
  const [data, setData] = useState(moment(new Date()).format("DD/MM/YYYY"));
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  // Dados Pessoais dos Usuário
  const [nome, setNome] = useState("");
  const [avisoNome, setAvisoNome] = useState("Digite seu nome completo");
  const [cpf, setCpf] = useState("");
  const [avisoCpf, setAvisoCpf] = useState("CPF Incompleto");
  const [telefone, setTelefone] = useState("");
  const [avisoTelefone, setAvisoTelefone] = useState(
    "Digite o nome do seu telefone"
  );

  // Endereço do Usuário
  const [rua, setRua] = useState("");
  const [avisoRua, setAvisoRua] = useState("Digite o nome da sua rua");
  const [bairro, setBairro] = useState("");
  const [avisoBairro, setAvisoBairro] = useState(
    "Informe o nome do seu bairro"
  );
  const [numeroCasa, setNumeroCasa] = useState("");
  const [avisoNumeroCasa, setAvisoNumeroCasa] = useState("Informe o numero da sua casa");
  const [cep, setCep] = useState("");
  const [avisoCep, setAvisoCep] = useState("CEP inválido");
  const [cidade, setCidade] = useState("");
  const [avisoCidade, setAvisoCidade] = useState(
    "Você precisa informar o nome da sua cidade"
  );
  const [uf, setUf] = useState("");
  const [avisoUf, setAvisoUf] = useState("Informe a sua unidade federativa");
  const [complemento, setComplemento] = useState("");
  const [avisoComplemento, setAvisoComplemento] = useState(
    "Digite um complemento para o seu endereço"
  );

  // Tipo de Usuário
  const [tipoUsuario, setTipoUsuario] = useState("cliente"); // Cliente Default
  const [email, setEmail] = useState("");
  const [avisoEmail, setAvisoEmail] = useState(
    "Você precisa informar seu email"
  );

  // Senha
  const [senha, setSenha] = useState("");
  const [avisoSenha, setAvisoSenha] = useState(
    "Você precisa informar um senha válida"
  );
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [avisoConfirmarSenha, setAvisoConfirmarSenha] = useState(
    "As senhas estão diferentes,por favor verifique"
  );

  const [dataCadastro, setDataCadastro] = useState(); // Somento DB

  useEffect(() => {
    DataBase.getConnection();
  }, []);


  // Cadastrar Usuário, Validação de Dados e senha
  const handleCadastrar = () => {
    // Verificar se tem algo incompleto no formulário
    if (!nome ||
      !cpf ||
      cpf.length < 11 ||
      !email ||
      !telefone ||
      !rua ||
      !bairro ||
      !numeroCasa ||
      !cidade ||
      !uf ||
      !cep ||
      cep.length < 8 ||
      !senha ||
      !confirmarSenha
    ) {
      setMissInfo(true);  // Falta Informação
      if (senha != confirmarSenha) {
        Alert.alert("Confirmação de senha incorreta, verifique")
      }
    } else {
      //Indica que falta informação,caso anteriormente tenha faltado info, não impede posteriormente de o usuário cadastrar com todas as informações corretamente
      setMissInfo(false); 
      // Se retornar undefined, então segue o fluxo e seta os valores para cadastrar o usuário
      getCadastrado(email).then((usuario) => {
        setUser(usuario[0]);        
        if (typeof (usuario[0]) == "undefined") {
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
          console.log('Entrou')
          navigation.navigate("Login");
        }
        //Se o valor retornado do banco não for undefined significa que o o email já e cadastrado, assim seta a variável abaixo para
        else {
          setUserAlredyRegister(true);
        }
      });
    }
  };

  // API: Buscar o Cep
  useEffect(() => {
    buscarEndereco();
  }, [cep]);

  // API: Buscar o Cep
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
              setUf(json.uf)
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
        <Appbar.Action
          style={{ marginRight: 10 }}
          icon="check"
          // icon={() => (
          //   <Image
          //     source={require('../assets/DATERRA-NOME-800X162.png')}
          //     style={{ width: 20, height: 20, tintColor: 'white' }}
          //   />
          // )}        
          onPress={() => handleCadastrar()} />
      </Header>
      <Body>
        <ScrollView>
          {/* Logo */}
          <Image
            style={styles.logo}
            source={require("../assets/DATERRA-COMPLETO-800X1050.png")}
          />

          {/* RadioButton Cliente ou Produtor */}
          <View style={styles.radioContainer}>
            <View style={styles.radioItem}>
              <RadioButton
                color={'#3d9d74'}
                value="cliente"
                status={tipoUsuario === "cliente" ? "checked" : "unchecked"}
                onPress={() => setTipoUsuario("cliente")}
              />
              <Text style={{ fontSize: 18 }}>Cliente</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton
                color={'#3d9d74'}
                value="produtor"
                status={tipoUsuario === "produtor" ? "checked" : "unchecked"}
                onPress={() => setTipoUsuario("produtor")}
              />
              <Text style={{ fontSize: 18 }}>Produtor</Text>
            </View>
          </View>

          {/* Nome */}
          <Input
            label="Nome"
            onChangeText={setNome}
            value={nome}
            error={missInfo && !nome ? true : false}
          />

          {/* CPF / Data */}
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={styles.textInput}
              label="CPF"
              mode='outlined'
              maxLength={11}
              onChangeText={setCpf}
              keyboardType="decimal-pad"
              value={cpf}
              error={missInfo && !cpf ? true : false}
            />

            {/* Data: Início Configuração DATE*/}
            {
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
              <TextInput
                style={styles.textInput}
                label="Data Nascimento"
                mode="outlined"
                value={data}
                left={<TextInput.Icon icon="calendar" />}
                editable={false}
              />
            </TouchableOpacity>
            {/* Fim configuração DATE*/}
          </View>

          {/* Email */}
          <Input
            label="Email"
            onChangeText={setEmail}
            value={email}
            error={missInfo && !email ? true : false}
          />

          {/* Telefone / CEP */}
          <View style={{ flexDirection: 'row' }}>
            {/* Telefone */}
            <TextInput
              style={styles.textInput}
              mode='outlined'
              label="Telefone"
              keyboardType="decimal-pad"
              onChangeText={setTelefone}
              value={telefone}
              error={missInfo && !telefone ? true : false}
            />
            {/* CEP */}
            <TextInput
              style={styles.textInput}
              mode='outlined'
              label="CEP"
              keyboardType="decimal-pad"
              onChangeText={setCep}
              value={cep}
              error={missInfo && !cep ? true : false}
            />
          </View>

          {/* Rua / Número Casa */}
          <View style={{ flexDirection: 'row' }}>
            {/* Rua */}
            <TextInput
              style={styleCompose}
              mode='outlined'
              label="Rua"
              error={missInfo && !rua ? true : false}
              onChangeText={setRua}
              value={rua} />

            {/* Número Casa */}
            <TextInput
              style={styles.textInput}
              mode='outlined'
              label="Nº"
              keyboardType="decimal-pad"
              error={missInfo && !numeroCasa ? true : false}
              value={numeroCasa}
              onChangeText={setNumeroCasa}
            />
          </View>

          {/* Bairro / Complemento */}
          <View style={{ flexDirection: 'row' }}>
            {/* Bairro */}
            <TextInput
              style={styleCompose}
              mode='outlined'
              label="Bairro"
              error={missInfo && !bairro ? true : false}
              onChangeText={setBairro}
              value={bairro} />

            {/* Complemento */}
            <TextInput
              style={styles.textInput}
              label={'Apt'}
              mode='outlined'
              onChangeText={setComplemento}
              value={complemento}
            />
          </View>

          {/* Cidade / UF */}
          <View style={{ flexDirection: 'row' }}>
            {/* Cidade */}
            <TextInput
              style={styleCompose}
              mode='outlined'
              label={'Cidade'}
              error={missInfo && !cidade ? true : false}
              onChangeText={setCidade} value={cidade} />

            {/* UF */}
            <TextInput
              style={styles.textInput}
              mode='outlined'
              label="UF"
              value={uf}
              error={missInfo && !uf ? true : false}
              onChangeText={setUf} />
          </View>

          {/* Senha */}
          <Input
            label="Senha"
            value={senha}
            secureTextEntry={escondeSenha}
            error={missInfo && !senha ? true : false}
            right={
              <TextInput.Icon
                onPress={() =>
                  escondeSenha
                    ? setEscondeSenha(false)
                    : setEscondeSenha(true)
                }
                icon={escondeSenha ? 'eye-off' : 'eye'}
              />
            }
            onChangeText={setSenha}
          />

          {/* Confirmar Senha */}
          <Input
            label="Confirmar Senha"
            value={confirmarSenha}
            secureTextEntry={escondeConfirmarSenha}
            error={missInfo && !confirmarSenha ? true : false}
            right={
              <TextInput.Icon
                onPress={() =>
                  escondeConfirmarSenha
                    ? setEscondeConfirmarSenha(false)
                    : setEscondeConfirmarSenha(true)
                }
                icon={escondeConfirmarSenha ? 'eye-off' : 'eye'}
              />
            }
            onChangeText={setConfirmarSenha}
          />
         
          {/* Verifica se email já tem cadastro */}
          {userAlredyRegister && (
            <Text style={styles.avisoUserAlredyRegister}>Email já cadastrado</Text>
          )}

          {/* Botão Cadastrar */}
          <View style={styles.viewBotaoCadastrar}>
            <Botao
              style={styles.textoBotao}
              textoBotao="Cadastrar"
              buttonColor='#3d9d74'
              onPress={handleCadastrar}
            />
          </View>
        </ScrollView>
      </Body>
    </Container >
  );
};

const styles = StyleSheet.create({

  // Logo
  logo: {
    marginTop: 10,
    height: 190,
    width: 145,
    padding: 10,
    marginBottom: 30,
    alignSelf: "center",
  },

  // Inputs e TextInputs
  containerInput: {
    marginVertical: 40,
  },
  input: {
    backgroundColor: "#fff",
    padding: 5,
    marginHorizontal: 10,
    marginTop: 5,
  },
  textInput: {
    height: 48,
    fontSize: 16,
    backgroundColor: "#FFFAFA",
    margin: 3,
    flexGrow: 1,
    flexShrink: 1,
  },

  // RadioButton
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  // Botão
  viewBotaoCadastrar: {
    marginVertical: 30,
  },
  textoBotao: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },

  // Text Aviso de info incompletas
  aviso: {
    marginTop: 5,
    marginLeft: 8,
    marginBottom: 10,
    color: "red",
    fontWeight: "bold",
  },
  avisoUserAlredyRegister: {
    marginTop: 12,
    marginLeft: 8,
    marginBottom: 10,
    color: "red",
    fontStyle: "italic",
    fontWeight: "bold",
  },
});

// Estilos (e compose) para os TextInputs 'especiais'
const styles2 = StyleSheet.create({
  textInputEspecial: {
    flexBasis: 240,
  }
});

const styleCompose = StyleSheet.compose(styles.textInput, styles2.textInputEspecial)

export default CadastroUsuario;
