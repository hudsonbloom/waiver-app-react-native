import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';


const BackForwardButtons = (props) => {

    const { navigate, destination, ContinueText, back, data, profile, uid, selected, onPress } = props;

    if (onPress) {
      return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigate(back)}>
              <Text style={styles.nextButton}>Back</Text>
          </TouchableOpacity>
    
            <TouchableOpacity style={styles.continueButton} onPress={onPress}>
              <Text style={styles.nextButton}>{ContinueText}</Text>
          </TouchableOpacity>
        </View>   
        )
    }

    return (
    <View style={styles.view}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigate(back)}>
          <Text style={styles.nextButton}>Back</Text>
      </TouchableOpacity>

        <TouchableOpacity style={styles.continueButton} onPress={() => navigate(destination, {
            data: data,
            profile: profile,
            uid: uid,
            selected: selected})}>
          <Text style={styles.nextButton}>Continue</Text>
      </TouchableOpacity>
    </View>   
    )
}

const styles = StyleSheet.create({
    view: {
        flexDirection: "row",
        position: "absolute",
        bottom: 50
    },
    continueButton: {
        width: 350,
        height: 75,
        backgroundColor: "#1062E5",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        margin: 10
      },
    backButton: {
        width: 350,
        height: 75,
        backgroundColor: "rgba(16, 98, 229, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        margin: 10
      },
    nextButton: {
        fontSize: 24,
        color: "#fff",
    }, 
  });

export default BackForwardButtons
