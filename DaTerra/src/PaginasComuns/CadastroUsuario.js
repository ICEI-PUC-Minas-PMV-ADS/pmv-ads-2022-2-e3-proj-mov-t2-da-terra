import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions, BackHandler
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

  const handleCadastrar = () => {
    //Verifica se alguma informação esta incompleta ou errada,se sim seta na variável missInfo para poder mostrar nos campos qual informação esta faltando
    if (
      nome == "" ||
      cpf == "" ||
      cpf.length < 11 ||
      email == "" ||
      telefone == "" ||
      rua == "" ||
      bairro == "" ||
      numeroCasa == "" ||
      cep == "" ||
      cep.length < 8 ||
      senha == "" ||
      confirmarSenha == "" ||
      confirmarSenha != senha ||
      cidade == "" ||
      uf == "" ||
      complemento == ""
    ) {
      setMissInfo(true);//Tem informação errada/faltando
    } else {
      // Vai chamar o metodo do banco para verificar se o usuário já esta cadastrado
      setMissInfo(false);//Seta a varíavel que indica que esta faltando informação para false para,caso anteriormente tenha faltando info,o não impedir posteriormente de o usuário cadastrar com todas as informações corretamente
      getCadastrado(email).then((usuario) => {
        setUser(usuario[0]);


        //Caso o valor retornado do banco seja do tipo undefined significa que não possui nenhum usuario com o email digitado,assim prosseguira com o cadastro do usuário
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
          navigation.navigate("Login");
        }
        //Se o valor retornado do banco não for undefined significa que o o email já e cadastrado,assim seta a variável abaixo para
        else {
          setUserAlredyRegister(true);
        }
      });
    }
  };

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
              setUf(json.uf)
            }
          });
        console.log(uf)
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
        <Appbar.Action icon="check" onPress={() => handleCadastrar()} />
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
                color={'#3d9d74'}
                value="cliente"
                status={tipoUsuario === "cliente" ? "checked" : "unchecked"}
                onPress={() => setTipoUsuario("cliente")}
              />
              <Text>Cliente</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton
                color={'#3d9d74'}
                value="produtor"
                status={tipoUsuario === "produtor" ? "checked" : "unchecked"}
                onPress={() => setTipoUsuario("produtor")}
              />
              <Text>Produtor</Text>
            </View>
          </View>

          <Input label="Nome" onChangeText={setNome} value={nome} />
          {nome == "" && missInfo && (
            <Text style={styles.aviso}>{avisoNome}</Text>
          )}

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
            <View style={{ flexDirection: 'row' }}>
              <TextInput
                style={styles.textInput}
                label="CPF"
                mode='outlined'
                onChangeText={setCpf}
                keyboardType="decimal-pad"
                value={cpf}
              />
              {(cpf == "" ||
                cpf.length < 11) && missInfo && (
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.aviso}>{avisoCpf}</Text>
                  </View>
                )}

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
          </View>

          <Input label="Email" onChangeText={setEmail} value={email} />
          {email == "" && missInfo && (
            <Text style={styles.aviso}>{avisoEmail}</Text>
          )}

          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={styles.textInput}
              mode='outlined'
              label="Telefone"
              keyboardType="decimal-pad"
              onChangeText={setTelefone}
              value={telefone}
            />
            {telefone == "" && missInfo && (
              <Text style={styles.aviso}>{avisoTelefone}</Text>
            )}

            <TextInput
              style={styles.textInput}
              mode='outlined'
              label="CEP"
              keyboardType="decimal-pad"
              onChangeText={setCep}
              value={cep}
            />
            {(cep == "" ||
              cep.length < 8) && missInfo && (
                <Text style={styles.aviso}>{avisoCep}</Text>
              )}
          </View>

          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={styleCompose}
              mode='outlined' label="Rua" onChangeText={setRua} value={rua} />
            {rua == "" && missInfo && (
              <Text style={styles.aviso}>{avisoRua}</Text>
            )}

            <TextInput
              style={styles.textInput}
              mode='outlined'
              label="Nº"
              keyboardType="decimal-pad"
              onChangeText={setNumeroCasa}
            />
            {numeroCasa == "" && missInfo && (
              <Text style={styles.aviso}>{avisoNumeroCasa}</Text>
            )}
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={styleCompose}
              mode='outlined'
              label="Bairro"
              onChangeText={setBairro} value={bairro} />
            {bairro == "" && missInfo && (
              <Text style={styles.aviso}>{avisoBairro}</Text>
            )}

            <TextInput
              style={styles.textInput}
              label={'Apt'}
              mode='outlined'
              onChangeText={setComplemento}
              value={complemento}
            />
            {/* {complemento == "" && missInfo && (
              <Text style={styles.aviso}>{avisoComplemento}</Text>
            )} */}
          </View>

          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={styleCompose}
              mode='outlined'
              label={'Cidade'}
              onChangeText={setCidade} value={cidade} />
            {cidade == "" && missInfo && (
              <Text style={styles.aviso}>{avisoCidade}</Text>
            )}

            <TextInput
              style={styles.textInput}
              mode='outlined'
              label="UF"
              value={uf}
              onChangeText={setUf} />
            {uf == "" && missInfo && <Text style={styles.aviso}>{avisoUf}</Text>}
          </View>

          <Input
            label="Senha"
            value={senha}
            secureTextEntry={escondeSenha}
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
          {senha == "" && missInfo && (
            <Text style={styles.aviso}>{avisoSenha}</Text>
          )}

          <Input
            label="Confirmar Senha"
            value={confirmarSenha}
            secureTextEntry={escondeConfirmarSenha}
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
          {(confirmarSenha == "" ||
            confirmarSenha != senha) && missInfo && (
              <Text style={styles.aviso}>{avisoConfirmarSenha}</Text>
            )}
          {/* {trySignIn && <Text style={styles.aviso}>Usuario já cadastrado</Text>} */}
          {userAlredyRegister && (
            <Text style={styles.avisoUserAlredyRegister}>Email já cadastrado</Text>
          )}
          <View style={{ marginVertical: 15 }}>
            <Botao
              style={styles.textoBotao}
              textoBotao="Cadastrar"
              buttonColor='#3d9d74'
              onPress={handleCadastrar}
            />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>

            {/* <Text style={styles.textoVoltar}>Voltar</Text> */}

          </TouchableOpacity>
        </ScrollView>
      </Body>
    </Container >
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
  textInput: {
    height: 48,
    fontSize: 16,
    backgroundColor: "#FFFAFA",
    margin: 3,
    flexGrow: 1,
    flexShrink: 1,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
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
  textoVoltar: {
    textAlign: "center",
    marginTop: 8,
    fontSize: 18
  },
  logo: {
    marginTop: 10,
    height: 190,
    width: 145,
    padding: 10,
    marginBottom: 30,
    alignSelf: "center",
  },
});

const styles2 = StyleSheet.create({
  textInputEspecial: {
    flexBasis: 240,
  }
});

const styleCompose = StyleSheet.compose(styles.textInput, styles2.textInputEspecial)

export default CadastroUsuario;
