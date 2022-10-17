import React, {useState,useContext} from 'react';
import {BottomNavigation,} from 'react-native-paper';
import {StyleSheet} from "react-native";

import Loja from './Loja'
import MinhasVendas from "./MinhasVendas";
import MinhaConta from "../PaginasComuns/MinhaConta"

import { AuthContext } from '../contexts/AuthProvider';

const HomeVendedor = () => {
    
    const {} = useContext(AuthContext);
    const [index, setIndex] = useState(0);

    const [routes] = useState([

        {key: 'loja', title: 'Loja', focusedIcon: 'store'},
        {key: 'minhasVendas', title: 'Minhas Vendas', focusedIcon: 'currency-usd'},
        {key: 'minhaConta', title: 'Minha Conta', focusedIcon: 'account-multiple'},

    ]);

    const renderScene = BottomNavigation.SceneMap({
        loja: Loja,
        minhasVendas: MinhasVendas,
        minhaConta: MinhaConta,
    });

    return (
        <BottomNavigation
            barStyle={{backgroundColor: '#9fd09d'}}
            navigationState={{index, routes}}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
};

const styles = StyleSheet.create({})


export default HomeVendedor;