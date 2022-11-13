import React, { useState, useEffect, useContext } from "react";

import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AuthContext } from "../contexts/AuthProvider";
import { UsuarioContext } from "../contexts/webapi.CadastroUsuario";
import Input from "../Componentes/Input";
import { RadioButton, Appbar, TextInput } from "react-native-paper";
import Body from "../Componentes/Body";
import Container from "../Componentes/Container";
import Header from "../Componentes/Header";
import Botao from "../Componentes/Botao";

export default function EditarMinhaConta() {
  const navigation = useNavigation();
  const { tipoUsuario,idLogado} = useContext(AuthContext);

  //Dados pessoais do usuario que seram editador

  const [telefone, setTelefone] = useState(3241234123);

  // Endereço do Usuário
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [numeroCasa, setNumeroCasa] = useState("222");
  const [cep, setCep] = useState();
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [complemento, setComplemento] = useState("asd");

  const [nomeLoja, setNomeLoja] = useState("");

  // Email e Senha
  const [email, setEmail] = useState("maria@gmail.com");
  const [senha, setSenha] = useState(1234);
  const [escondeSenha, setEscondeSenha] = useState(true);
  
  const {

    putUsuario,
    
  } = useContext(UsuarioContext);
  
  //Sempre que houver mudança no cep,consulta a API para atualizar os endereços
  useEffect(() => {
    console.log(idLogado)
    buscarEndereco(); // Busca CEP
    
  }, [cep]);
  const buscarEndereco = async () => {
    if (String(cep).length == 8) {
      const meuCep = String(cep);

      const value = meuCep.replace(/[^0-9]+/, meuCep);
      const url = `https://viacep.com.br/ws/${value}/json/`;

      await fetch(url)
        .then((response) => response.json())
        .then((json) => {
          setBairro(json.bairro);
          setCidade(json.localidade);
          setRua(json.logradouro);
          setUf(json.uf)
        });
    }
  };
  const atualizarUsuario=async ()=>{
    await putUsuario({
        email:email.trim(),
        senha:senha.trim(),
        telefone:telefone.trim(),
        cep:cep.trim(),
        rua:rua.trim(),
        numeroCasa:numeroCasa.trim(),
        bairro:bairro.trim(),
        complemento:complemento.trim(),
        cidade:cidade.trim(),
        uf:uf.trim()


    }).then(a=>console.log(a)).catch(a=>console.log(a))



  }





  return (
    <>
      <Header
        title={"Editar Meus dados"}
        // Só se houver tela empilhada
        goBack={() => navigation.goBack()}
      />
      <Container>
        <Body>
          
            {tipoUsuario == "Produtor" && (
              <Input
                style={styles.textInput}
                label="Novo Nome da Loja"
                onChangeText={setNomeLoja}
                value={nomeLoja}
                activeOutlineColor={"#3d9d74"}
              />
            )}
            <Input
              label="Novo Email"
              onChangeText={setEmail}
              value={email}
              activeOutlineColor={"#3d9d74"}
            />
            <Input
              label="Novo Senha"
              value={senha}
              secureTextEntry={escondeSenha}
              activeOutlineColor={"#3d9d74"}
              right={
                <TextInput.Icon
                  onPress={() =>
                    escondeSenha
                      ? setEscondeSenha(false)
                      : setEscondeSenha(true)
                  }
                  icon={escondeSenha ? "eye-off" : "eye"}
                />
              }
              onChangeText={setSenha}
            />
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="Novo Telefone"
              keyboardType="decimal-pad"
              onChangeText={setTelefone}
              value={telefone}
              activeOutlineColor={"#3d9d74"}
            />
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="Novo CEP"
              keyboardType="decimal-pad"
              onChangeText={setCep}
              value={cep}
              activeOutlineColor={"#3d9d74"}
            />
            <View style={{ flexDirection: 'row' }}>
                <TextInput
                  style={styleCompose}
                  mode="outlined"
                  label="Nova Rua"
                  activeOutlineColor={"#3d9d74"}
                  onChangeText={setRua}
                  value={rua}
                />
                <TextInput
                  style={styles.textInput}
                  mode="outlined"
                  label="Nº"
                  keyboardType="decimal-pad"
                  activeOutlineColor={"#3d9d74"}
                  value={numeroCasa}
                  onChangeText={setNumeroCasa}
                />
                 </View>

                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                      style={styleCompose}
                      mode="outlined"
                      label="Novo Bairro"
                      activeOutlineColor={"#3d9d74"}
                      onChangeText={setBairro}
                      value={bairro}
                    />
                    <TextInput
                      style={styles.textInput}
                      label= "Apt"
                      mode="outlined"
                      activeOutlineColor={"#3d9d74"}
                      onChangeText={setComplemento}
                      value={complemento}
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                      style={styleCompose}
                      mode="outlined"
                      label="Nova Cidade"
                      activeOutlineColor={"#3d9d74"}
                      onChangeText={setCidade}
                      value={cidade}
                    />
                    <TextInput
                      style={styles.textInput}
                      mode="outlined"
                      label="UF"
                      value={uf}
                      activeOutlineColor={"#3d9d74"}
                      onChangeText={setUf}
                    />
                </View>
           <View style={styles.viewBotao}>
          <TouchableOpacity onPress={atualizarUsuario}>
            <Botao
              style={styles.textoBotao}
              buttonColor={"#3d9d74"}
              textoBotao="Editar"
              mode="contained"
            />
          </TouchableOpacity>
        </View>
          
        </Body>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 48,
    fontSize: 16,
    backgroundColor: "#FFFAFA",
    margin: 3,
    flexGrow: 1,
    flexShrink: 1,
  },
  viewBotao: {
    marginTop: 35,
    marginBottom: 25,
  },
  textoBotao: {
    textAlign: "center",
    fontSize: 20,
  },
});
const styles2 = StyleSheet.create({
  textInputEspecial: {
    flexBasis: 240,
  },

});

const styleCompose = StyleSheet.compose(
  styles.textInput,
  styles2.textInputEspecial
);
