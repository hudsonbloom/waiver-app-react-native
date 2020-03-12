import React, { Component } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    FlatList
  } from 'react-native';

class ListItem extends Component {


    _onPress = () => {
      
        const { id, game_id, time, game, originalTime, timestamp } = this.props
        this.props.onPressItem(id, game_id, time, game, originalTime, timestamp);
      };

    render() {

        const { data, selected, id } = this.props
        const textStyle = selected ? styles.selectedText : styles.text
        const rowStyle = selected ? styles.newSelectedItem : styles.item

    return (
        <TouchableOpacity style={rowStyle}
            onPress={this._onPress}>
            
            <Text style={styles.headerTime}>{data.time}</Text>
            <Text style={styles.gameName}> {data.game} </Text>
        </TouchableOpacity>
          
    )
}
}

const styles = StyleSheet.create({
  headerTime: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fff"
  },
  gameName: {
    fontSize: 18,
    color: "#fff"
  },
    item: {
        width: 350,
        height: 100,
        fontSize: 32,
        color: "#eee",
        backgroundColor: "rgba(54, 50, 62, 0.5)",
        borderRadius: 3,
        borderColor: "rgba(112, 112, 112, 0.5)",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 10
      },
      newSelectedItem: {
        width: 350,
        height: 100,
        fontSize: 32,
        color: "#eee",
        backgroundColor: "#1062E5",
        margin:10,
        borderRadius: 3,
        justifyContent: "center",
        alignItems: "center"
      },
      selectedItem: {
        padding: 25,
        fontSize: 18,
        height: 75,
        fontSize: 32,
        color: "red",
        backgroundColor: "#1062E5",
        marginBottom:10,
        borderRadius: 50
      },
      text: {
        fontSize: 22,
        color: "#ccc",
      },
      selectedText: {
        fontSize: 22,
        color: "#fff",
        fontWeight: "500"
      },
      list: {
        paddingVertical: 5,
        margin: 3,
        flexDirection: "row",
        backgroundColor: "#192338",
        justifyContent: "flex-start",
        alignItems: "center",
        zIndex: -1
      },
      lightText: {
        color: "#f7f7f7",
        width: 200,
        paddingLeft: 15,
        fontSize: 12
       },
       line: {
        height: 0.5,
        width: "100%",
        backgroundColor:"rgba(255,255,255,0.5)"
      },
      icon: {
        position: "absolute",  
        bottom: 20,
        width: "100%", 
        left: 290, 
        zIndex: 1
      },
      numberBox: {
        position: "absolute",
        bottom: 75,
        width: 30,
        height: 30,
        borderRadius: 15,  
        left: 330,
        zIndex: 3,
        backgroundColor: "#e3e3e3",
        justifyContent: "center",
        alignItems: "center"
      },
      number: {
          fontSize: 14,color: "#000"
        },
    selected: {
        backgroundColor: "#FA7B5F"
    },
})

export default ListItem
