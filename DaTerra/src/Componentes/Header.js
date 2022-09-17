//Molde de Header caso precise usar um, passivel de mudancças

import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInput, Appbar, Button,} from "react-native-paper";

const Header = ()=>{

    return(
        <View >
            <Appbar.Header style={styles.Header}>



            </Appbar.Header>
        </View>
    )
}
export default Header;

const styles= StyleSheet.create({
    Header: {
        backgroundColor:"#282828",
        height: 40,
    },





})