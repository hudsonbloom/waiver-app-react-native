import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const ExitButton = (props) => {

    const { navigate } = props;

    return (
        <TouchableOpacity style={styles.exitButton} onPress={() => navigate('Home')}>
          <Text style={styles.text}>Exit</Text>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    exitButton: {
        width: 100,
        height: 60,
        backgroundColor: "#434548",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 35,
        position: "absolute",
        top: 20,
        left: 20
    },
    text: {
        fontSize: 22,
        color: "#fff"
    }
})

export default ExitButton
