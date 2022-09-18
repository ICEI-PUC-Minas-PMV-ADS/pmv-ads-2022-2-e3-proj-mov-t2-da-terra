import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const Body = ({ children }) => {
    return (
        <ScrollView>
            <View style={styles.container}>{children}</View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        //alignSelf: "center",
        margin: 8
    },
});

export default Body;