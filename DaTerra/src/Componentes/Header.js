import React, { Children } from "react";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, goBack, children }) => {

  const navigation = useNavigation();

  return (
    <Appbar.Header style={{backgroundColor: '#50ac5d'}}>
      {
        /* Se houver a função goback (quando tem tela empilhada)
         então adiciona o componente */
        goBack &&
        <Appbar.BackAction
          style={{backgroundColor:'#FFF'}}
          onPress={() => navigation.goBack(goBack)} />
      }
      <Appbar.Content titleStyle={{color:'#FFF', fontWeight:'bold', marginLeft: 10}} title={title} />
      {children}
    </Appbar.Header>
  );
}

export default Header;