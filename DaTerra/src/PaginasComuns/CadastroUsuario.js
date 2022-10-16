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
import { getCadastrado, getLogin, insertUsuario } from "../DBService/DBUsuario";

const CadastroUsuario = ({ navigation, route }) => {
  const [escondeSenha, setEscondeSenha] = useState(true);
  const [user, setUser] = useState([]);
  const [escondeConfirmarSenha, setEscondeConfirmarSenha] = useState(true);
  const [missInfo, setMissInfo] = useState(false);
  // Configurar DATE
  const [data, setData] = useState(moment(new Date()).format("DD/MM/YYYY"));
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const [nome, setNome] = useState("");
  const [avisoNome, setAvisoNome] = useState("Digite seu nome completo");

  const [cpf, setCpf] = useState("");
  const [avisoCpf, setAvisoCpf] = useState("CPF Incompleto");

  const [telefone, setTelefone] = useState("");
  const [avisoTelefone, setAvisoTelefone] = useState("Digite o nome do seu telefone");

  const [rua, setRua] = useState("");
  const [avisoRua,setAvisoRua] = useState("Digite o nome da sua rua");

  const [bairro, setBairro] = useState("");
  const [avisoBairro, setAvisoBairro] = useState("Informe o nome do seu bairro");

  const [numeroCasa, setNumeroCasa] = useState("Informe o numero da sua casa");
  const [avisoNumeroCasa, setAvisoNumeroCasa] = useState("");

  const [cep, setCep] = useState("");
  const [avisoCep, setAvisoCep] = useState("CEP inválido");

  const [cidade, setCidade] = useState("");
  const [avisoCidade, setAvisoCidade] = useState("Você precisa informar o nome da sua cidade");

  const [uf, setUf] = useState("");
  const [avisoUf, setAvisoUf] = useState("Informe a sua unidade federativa");

  const [complemento, setComplemento] = useState("");
  const [avisoComplemento, setAvisoComplemento] = useState("Digite um complemento para o seu endereço");

  const [tipoUsuario, setTipoUsuario] = useState("cliente"); // Cliente Default
  const [email, setEmail] = useState("");
  const [avisoEmail, setAvisoEmail] = useState("Você precisa informar seu email");

  const [senha, setSenha] = useState("");
  const [avisoSenha, setAvisoSenha] = useState("Você precisa informar um senha válida");

  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [avisoConfirmarSenha, setAvisoConfirmarSenha] = useState("Senha incorreta ou diferente");
  const [dataCadastro, setDataCadastro] = useState(); // Somento DB
  useEffect(() => {
    DataBase.getConnection();
  }, []);

  const handleCadastrar = () => {
      
    setMissInfo(true)
    
    if (nome == "") setAvisoNome("Digite seu nome completo")
    //  else if (cpf == "" ||cpf.length<11) setAvisoCpf("Cpf incompleto")
    //  else if (email == "") setAvisoEmail("Você deve inserir seu email")
    //  else if (telefone == "")setAvisoTelefone("Digite seu numero de telefone")
    //  else if (rua == "") setAvisoRua("Digite o nome da sua rua")
    //  else if (bairro == "")setAvisoBairro("Você precisa inserir o nome do seu bairro")
    //  else if (numCasa == "")setAvisoNumeroCasa("Digite o numero da sua casa")
    //  else if (cep == "" || cep.length < 8)setAvisoCep("CEP inválido")
    //  else if (senha == "")setAvisoSenha("Você precisa inserir uma senha")
    //  else if (confirmarSenha == "" || confirmarSenha!= senha)setAvisoConfirmarSenha("Senhas diferentes")

    //  else if (cidade == "")setAvisoCidade("Digite o nome da sua cidade")
    //  else if (uf == "")setAvisoUf("Digite a sua unidade federativa")
    //  else if(complemento=="")setComplemento("Digite complemento do seu endereço")
    
    
    
    
    
    else {
      getCadastrado(email).then((usuario) => {
        setUser(usuario[0]);
        console.log("oiiii");
        console.log(typeof(user));
      });
  
      if (typeof user == "undefined") {
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
      } 
  
   
  
      //  navigation.navigate("Login");
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
          {nome==""&& missInfo && (<Text style={styles.aviso}>{avisoNome}</Text>)}

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
            {cpf==""||cpf.length<11 && missInfo && (<Text style={styles.aviso}>{avisoCpf}</Text>)}

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
            value={telefone}
          />
          {telefone=="" && missInfo && (<Text style={styles.aviso}>{avisoTelefone}</Text>)}


          <Input label="Email" onChangeText={setEmail} value={email} />
          
          {email==""&& missInfo && (<Text style={styles.aviso}>{avisoEmail}</Text>)}
        
          <Input
            label="CEP"
            keyboardType="decimal-pad"
            onChangeText={setCep}
            value={cep}
          />
          {cep==""||cep.length < 8 && missInfo && (<Text style={styles.aviso}>{avisoCep}</Text>)}
          <Input label="Rua" onChangeText={setRua} value={rua} />
          {rua==""&& missInfo && (<Text style={styles.aviso}>{avisoRua}</Text>)}
          <Input label="Bairro" onChangeText={setBairro} value={bairro} />
          {bairro==""&& missInfo && (<Text style={styles.aviso}>{avisoBairro}</Text>)}
          <Input
            label="Nº"
            keyboardType="decimal-pad"
            onChangeText={setNumeroCasa}
          />
          {numeroCasa==""&& missInfo && (<Text style={styles.aviso}>{avisoNumeroCasa}</Text>)}

          <Input label="Cidade" onChangeText={setCidade} value={cidade} />
          {cidade==""&& missInfo && (<Text style={styles.aviso}>{avisoCidade}</Text>)}
          <Input label="UF" onChangeText={setUf} />
          {uf==""&& missInfo && (<Text style={styles.aviso}>{avisoUf}</Text>)}
         
          <Input
            label="Complemento"
            onChangeText={setComplemento}
            value={complemento}
          />
{complemento==""&& missInfo && (<Text style={styles.aviso}>{avisoComplemento}</Text>)}
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
          {senha==""&& missInfo && (<Text style={styles.aviso}>{avisoSenha}</Text>)}

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
          {confirmarSenha==""||confirmarSenha!=senha && missInfo && (<Text style={styles.aviso}>{avisoConfirmarSenha}</Text>)}
          {/* {trySignIn && <Text style={styles.aviso}>Usuario já cadastrado</Text>} */}

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
    marginTop: 5,
    marginLeft: 8,
    marginBottom:10,
    color: "red",
    fontStyle: "italic",
    fontWeight: "bold",
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
