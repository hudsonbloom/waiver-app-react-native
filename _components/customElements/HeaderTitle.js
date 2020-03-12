import React from 'react'
import { View, StyleSheet, Text } from 'react-native';


const HeaderTitle = (props) => {

    const { header, subtitle } = props;

    return (
        <View style={styles.headerSection}>
            <Text style={styles.sectionTitle}>{header}</Text>
            <Text style={styles.sectionDescription}>
              {subtitle}
            </Text>
            
          </View>
    )
}

const styles = StyleSheet.create({
    headerSection: {
        paddingHorizontal: 0,
        marginTop:0,
        marginBottom: 30,
        width: 735
    },
    sectionTitle: {
      fontSize: 43,
      fontWeight: '700',
      color: "#eee",
    },
    sectionDescription: {
      marginTop: 5,
      fontSize: 30,
      fontWeight: '400',
      color: "#eee",
      opacity: 0.5
    }
  });

export default HeaderTitle
