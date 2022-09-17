import React from 'react';
import {StyleSheet, View} from 'react-native';

const Body = ({children}) => {
    return <View style={styles.container}>{children}</View>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        alignSelf:"center",
        margin: 8
    },
});

export default Body;