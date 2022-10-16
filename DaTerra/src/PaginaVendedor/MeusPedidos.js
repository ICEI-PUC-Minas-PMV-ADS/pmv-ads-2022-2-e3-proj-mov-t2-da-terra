import React, { useContext, useState } from 'react';

import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import Body from "../Componentes/Body";
import Container from '../Componentes/Container';
import Header from '../Componentes/Header';

import { AuthContext } from '../contexts/AuthProvider';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const MeusPedidos = () => {

  //const { } = useContext(AuthContext);

  return (
    <Container>
      <Header title={'Meus Pedidos'} />
      <Body>

      </Body>
    </Container>
  )
}

const styles = StyleSheet.create({
  textTitulos: {
    marginTop: 14,
    textAlignVertical: 'center',
    marginLeft: 14,
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default MeusPedidos;

// <Text style={styles.textTitulos}>Solicitações Pendentes</Text>
//         <Card>
//           {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
//           <Card.Content>
//             <Title>R$ 0,00</Title>
//             <Paragraph></Paragraph>
//           </Card.Content>
//           <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
//           <Card.Actions>
//             <Button>Cancel</Button>
//             <Button>Ok</Button>
//           </Card.Actions>
//         </Card>