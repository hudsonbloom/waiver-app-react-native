import React, { Component } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    ActivityIndicator,
    Animated
  } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import ProgressBar from '../customElements/ProgressBar'
import moment from 'moment';
var momentTZ = require('moment-timezone');

export class ThankYou extends Component {
    static navigationOptions = {
            header: null,
        };

    componentDidMount(){
        this.goBackHome()
    }

    goBackHome = () => {
        const {navigate} = this.props.navigation;
        setTimeout(() => {
            navigate('Home')
          }, 3000);
    }
 
    
    render() {

      const data = this.props.navigation.getParam('data', null);
      const selected = this.props.navigation.getParam('selected', null);
      const timestamp = this.props.navigation.getParam('timestamp', null);

      const time = selected.originalTime;
      const timeDate = moment(new Date()).format().slice(0,11)
      const ts = timeDate + time;
      const defaultTimeZone = momentTZ.tz.guess();
      const m = momentTZ.tz(ts, defaultTimeZone);

        return (
        <React.Fragment>
      <StatusBar hidden={true} />
      <SafeAreaView style={{backgroundColor: "#1E1D23"}}>
      
            <View style={styles.body}>
            <ProgressBar position="all" />
            <View style={styles.sectionHomescreen}>
              <Text style={styles.sectionTitle}>Thank You</Text>
              <Text style={styles.sectionCheckinTime}>
                {timestamp}
              </Text>
              <Text style={styles.sectionDescription}>The game will begin {m.fromNow()}</Text>
            </View>

            <View style={styles.playerInfoBox}>

          <View style={{flexDirection: "row", justifyContent: "center",
    alignItems: "center",}}>
              <Icon
                  name={"md-person"}
                  color="#A5A4BF"
                  size={22}
                />

                <Text style={styles.playerName}>{data.firstName} {data.lastName}</Text>
        </View>

        <View style={{flexDirection: "row", justifyContent: "center",
    alignItems: "center",}}>

                <Icon
                  name={"ios-today"}
                  color="#A5A4BF"
                  size={18}
                />
          <Text style={styles.selectedGame}>{selected.time} - {selected.game}</Text>
    </View>
                
              

            </View>


          </View>
        </SafeAreaView>
    </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
  playerName: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fff",
    marginLeft: 10,
  },
  selectedGame: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    opacity: 0.5,
    marginLeft: 10,
  },
  playerInfoBox: {
    width: 450,
    height: 100,
    fontSize: 32,
    color: "#eee",
    backgroundColor: "rgba(54, 50, 62, 0.5)",
    borderRadius: 3,
    borderColor: "rgba(112, 112, 112, 0.5)",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50
  },
    scrollView: {
      backgroundColor: "#fff",
    },
    engine: {
      position: 'absolute',
      right: 0,
    },
    body: {
      backgroundColor: "#1E1D23",
      height: "100%",
      justifyContent: "center",
      alignItems: "center"
    },
    sectionHomescreen: {
        paddingHorizontal: 24,
        marginTop: -75,
        width: "80%"
    },
    sectionContainer: {
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 90,
      fontWeight: '600',
      color: "#eee",
      alignSelf: "center"
    },

    sectionCheckinTime: {
      marginTop: 5,
      fontSize: 70,
      fontWeight: '400',
      color: "#eee",
      opacity: 0.5,
      alignSelf: "center"
    },


    sectionDescription: {
      marginTop: 5,
      fontSize: 22,
      color:"#fff", 
      opacity:0.5, 
      alignSelf: "center"
    },
    highlight: {
      fontWeight: '700',
    },
    footer: {
      color: "#333",
      fontSize: 12,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'right',
    },
  });

export default ThankYou
