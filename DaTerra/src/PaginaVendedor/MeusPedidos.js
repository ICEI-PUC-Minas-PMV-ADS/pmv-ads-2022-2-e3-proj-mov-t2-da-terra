import React, { useContext } from 'react';


import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { SegmentedButtons } from 'react-native-paper';

import Body from "../Componentes/Body";
import Container from '../Componentes/Container';

import { AuthContext } from '../contexts/AuthProvider';

const MeusPedidos = () => {

  //const { } = useContext(AuthContext);
  const [value, setValue] = React.useState('');

  return (   
      <Container>
        <Body>
          {/* <View style={styles.segmentedButtons}>
            <SegmentedButtons
              onValueChange={setValue}
              buttons={[
                {
                  value: 'pedidoPendente',
                  label: 'Solicitação',
                },
                {
                  value: 'pedidoAceito',
                  label: 'Transit',
                },
                {
                  value: 'pedidoAceito',
                  label: 'Transit',
                },
              ]}
            />
          </View> */}
        </Body>
      </Container>  
  )
}

const styles = StyleSheet.create({
  segmentedButtons: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#ccc'
  },
});

export default MeusPedidos;