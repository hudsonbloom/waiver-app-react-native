import React from 'react'
import { View, StyleSheet, Text } from 'react-native';

const SelectedGameWidget = (props) => {
    const { selected, player, minors } = props;
    

    if (player) {
      return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{selected.time} - {selected.game}</Text>
            <Text style={styles.sectionDescription}>
              {player.firstName} {player.lastName}
            </Text>
            
          </View>
      )
    }

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{selected.time} - {selected.game}</Text>
          </View>
    )
}

const styles = StyleSheet.create({
    section: {
        position: "absolute",
        top: 30,
        right: 25
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: "#eee",
    },
    sectionDescription: {
      marginTop: 5,
      fontSize: 16,
      fontWeight: '400',
      color: "#eee",
      opacity: 0.5,
      alignSelf: "flex-end"
    }
  });

export default SelectedGameWidget
