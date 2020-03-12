import React from 'react'
import { View, StyleSheet } from 'react-native';

const ProgressBar = (props) => {
    const { position } = props;

    if (position === "1"){
        return (
            <View style={styles.view}>
                <View style={styles.active}/>
                <View style={styles.notActive}/>
                <View style={styles.notActive}/>
            </View>
        )
    } else if (position === "2"){
        return (
            <View style={styles.view}>
                <View style={styles.notActive}/>
                <View style={styles.active}/>
                <View style={styles.notActive}/>
            </View>
        )
    } else if (position === "3"){
        return (
            <View style={styles.view}>
                <View style={styles.notActive}/>
                <View style={styles.notActive}/>
                <View style={styles.active}/>
            </View>
        )
    } else if (position === "all"){
        return (
            <View style={styles.view}>
                <View style={styles.active}/>
                <View style={styles.active}/>
                <View style={styles.active}/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        position: "absolute",
        top: 35
    },
    active: {
        width:88, 
        height: 15, 
        backgroundColor: '#3B86FF',
        borderRadius: 3,
        margin: 10
    },
    notActive: {
        width:88, 
        height: 15, 
        backgroundColor: '#3B86FF',
        opacity: 0.5,
        borderRadius: 3,
        margin: 10
    }
})

export default ProgressBar
