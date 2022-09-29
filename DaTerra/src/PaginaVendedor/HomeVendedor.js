import React, {useState,useContext} from 'react';
import {BottomNavigation,} from 'react-native-paper';
import {StyleSheet} from "react-native";

import Loja from './Loja'
import MeusPedidos from "./MeusPedidos";
import MinhaConta from "../PaginasComuns/MinhaConta"
import { AuthContext } from '../contexts/autenticacao';

const HomeVendedor = () => {
    
    const {} = useContext(AuthContext);
    const [index, setIndex] = useState(0);

    const [routes] = useState([
        {key: 'loja', title: 'Loja', icon: 'store'},
        {key: 'pedidos', title: 'Meus pedidos', icon: 'truck-fast'},
        {key: 'minhaConta', title: 'Minha Conta', icon: 'account-multiple'},
    ]);

    const renderScene = BottomNavigation.SceneMap({
        loja: Loja,
        pedidos: MeusPedidos,
        minhaConta: MinhaConta,
    });

    return (
        <BottomNavigation
            barStyle={{backgroundColor: '#C0D56A'}}
            navigationState={{index, routes}}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
};

const styles = StyleSheet.create({})


export default HomeVendedor;