import React, { useState } from "react";

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from "react-native";

const Seletor = (props) => {
  const [quantidade, setQuantidade] = useState(1);
  let contador = quantidade;

  const upQtd = () => {
    setQuantidade(contador += 1);
  };

  const downQtd = () => {
    setQuantidade(contador -= 1);
  };

  return (
    <>
      < View style={styles.viewBotaoSeletorQtd} >
        {/* Botão Menos */}
        < TouchableOpacity
          style={styles.botaoSeletorQtd}
          onPress={() => downQtd()}
        >
          <Text style={styles.textBotaoSeletorQtd}>-</Text>
        </TouchableOpacity >

        {/* Quantidade Dinâmica */}
        < View style={styles.viewTextDinamicoSeletorQtd} >
          <Text style={styles.textDinamicoSeletorQtd}>{contador}</Text>
        </View >

        {/* Botão Mais */}
        <TouchableOpacity
          style={styles.botaoSeletorQtd}
          onPress={() => upQtd()}
        >
          <Text style={styles.textBotaoSeletorQtd}>+</Text>
        </TouchableOpacity >
      </View >
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