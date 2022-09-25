import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const Body = ({ children}) => {    
    return <View style={styles.container}>{children}</View>          
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
       // backgroundColor: '#FFF',
        margin: 10,
    },
});

export default Body;