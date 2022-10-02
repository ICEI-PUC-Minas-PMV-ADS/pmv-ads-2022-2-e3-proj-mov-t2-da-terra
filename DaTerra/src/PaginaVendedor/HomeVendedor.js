import React, {useState,useContext} from 'react';
import {BottomNavigation,} from 'react-native-paper';
import {StyleSheet} from "react-native";

import Loja from './Loja'
import MeusPedidos from "./MeusPedidos";
import MinhaConta from "../PaginasComuns/MinhaConta"

import { AuthContext } from '../contexts/AuthProvider';

const HomeVendedor = () => {
    
    const {} = useContext(AuthContext);
    const [index, setIndex] = useState(0);

    const [routes] = useState([
        {key: 'loja', title: 'Loja', focusedIcon: 'store'},
        {key: 'meusPedidos', title: 'Meus pedidos', focusedIcon: 'truck-fast'},
        {key: 'minhaConta', title: 'Minha Conta', focusedIcon: 'account-multiple'},
    ]);

    const renderScene = BottomNavigation.SceneMap({
        loja: Loja,
        meusPedidos: MeusPedidos,
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