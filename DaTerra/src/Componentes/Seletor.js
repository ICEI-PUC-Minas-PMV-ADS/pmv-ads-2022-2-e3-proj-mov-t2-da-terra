import React, { useState } from "react";

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from "react-native";

const Seletor = (props) => {
  const [quantidade, setQuantidade] = useState(1);  

  return (
    <>
      {/*Início Seletor Quantidade*/}
      < View style={styles.viewBotaoSeletorQtd} >
        {/* Botão Menos */}
        < TouchableOpacity
          style={styles.botaoSeletorQtd}
          onPress={() => setQuantidade(false)}
        >
          <Text style={styles.textBotaoSeletorQtd}>-</Text>
        </TouchableOpacity >

        {/* Quantidade Dinâmica */}
        < View style={styles.viewTextDinamicoSeletorQtd} >
          <Text style={styles.textDinamicoSeletorQtd}>{quantidade}</Text>
        </View >

        {/* Botão Mais */}
        < TouchableOpacity
          onPress={() => setQuantidade(true)}
          style={styles.botaoSeletorQtd}
        >
          <Text style={styles.textBotaoSeletorQtd}>+</Text>
        </TouchableOpacity >
      </View >
      {/*Fim Seletor Quantidade*/}
    </>
  );
}

const styles = StyleSheet.create({
  // Seletor Quantidade
  viewBotaoSeletorQtd: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  botaoSeletorQtd: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#5f9846',
    elevation: 2,
  },
  textBotaoSeletorQtd: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
  viewTextDinamicoSeletorQtd: {
    padding: 10,
    flexGrow: 1,
    flexShrink: 1,
    maxWidth: 80
  },
  textDinamicoSeletorQtd: {
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 24,
    textAlign: 'center',
  },
});

export default Seletor;