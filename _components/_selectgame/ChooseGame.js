import React, { Component } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    FlatList,
    ActivityIndicator
  } from 'react-native';
import moment from 'moment';
var momentTZ = require('moment-timezone');
import firebase from 'react-native-firebase'

import ListItem from './ListItem'
import ProgressBar from '../customElements/ProgressBar'
import HeaderTitle from '../customElements/HeaderTitle'
import BackForwardButtons from '../customElements/BackForwardButtons'
import ExitButton from '../customElements/ExitButton'



export class ChooseGame2 extends Component {
  constructor(props) {
      super(props);
      this.state = {
          error: '',
          noMoreGames: '',
          loading: false,
          dataSource: [],
          selected: (new Map()),
          isSelected: false,
          selectedItem: {},
          time: ''
    }
}

  static navigationOptions = {
      header: null,
  };

  componentDidMount() {
      const { navigation } = this.props;
      const uid = navigation.getParam('uid', null);
      this.fetchDataNew(uid)
      //this.createGameTimeData();
  }

  createGameTimeData = (data) => {
    var times = [{id: "11", time: '18:00:00', game: 'Expedition Unknown'},
          {id: "12", time: '18:30:00', game: 'The Black Widow'},
          {id: "13", time: '19:30:00', game: 'Expedition Unknown'},
          {id: "14", time: '19:45:00', game: 'The Black Widow'},
          {id: "15", time: '20:45:00', game: 'Expedition Unknown'},
          {id: "16", time: '21:00:00', game: 'The Black Widow'},]

    

    data.forEach(element => {
      const time = element.time;
      const timestamp = '2019-09-02T' + time;
      const defaultTimeZone = momentTZ.tz.guess();
      const m = momentTZ.tz(timestamp, defaultTimeZone);
      
      newTimes.push({
        id: element.id,
        timestamp: m,
        originalTime: element.time,
        time: m.format('LT') ,
        game: element.game
      })
    });

    this.setState({dataSource: newTimes})


  }

  getDay = () => {
    var d = new Date();
    var n = d.getDay()

    var day = "Sunday";
    if (n === 0){
      day = "Sunday"
    } else if (n === 1){
      day = "Monday"
    } else if (n === 2){
      day = "Tuesday"
    } else if (n === 3){
      day = "Wednesday"
    } else if (n === 4){
      day = "Thursday"
    } else if (n === 5){
      day = "Friday"
    } else if (n === 6){
      day = "Saturday"
    }

    return day;
  }

  fetchData = (uid) => {
      this.setState({loading: true});

      firebase.firestore().collection('schedule')
        .where("user_id", "==", uid)
        .where("day", "==", this.getDay())
        .get()
        .then(snapshot => {

          if (snapshot.empty) {
            this.setState({
              noMoreGames: "No documents found",
              loading: false
            })
            return;
          } 

          var newTimes = [];
          snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            const data = doc.data();
            const time = data.time;
            const date = new Date();
            const timeDate = moment(date).format().slice(0,11)
            const timestamp = timeDate + time
            const defaultTimeZone = momentTZ.tz.guess();
            const m = momentTZ.tz(timestamp, defaultTimeZone);

            const currentTime = new Date()
            currentTime.setMinutes( currentTime.getMinutes() - 30 )

            if (m > currentTime){
              newTimes.push({
                id: doc.id,
                timestamp: m,
                originalTime: data.time,
                time: m.format('LT') ,
                game: data.game
              })
            }
            

          });

          // if (newTimes.length === 0){
          //   this.setState({noMoreGames: "No more games today."})
          // }
          newTimes.sort(function(a, b){
            var keyA = a.time,
                keyB = b.time;
            // Compare the 2 dates
            if(keyA < keyB) return -1;
            if(keyA > keyB) return 1;
            return 0;
          });


          newTimes.length = 6;

          this.setState({
            dataSource: newTimes,
            loading: false
          })

        })
        .catch(err => {
          console.log('Error getting documents', err);
          this.setState({noMoreGames: err.message})
        });
  }

  fetchDataNew = (uid) => {
    this.setState({loading: true});

    firebase.firestore().collection('products')
      .where("user_id", "==", uid)
      .get()
      .then(snapshot => {

        if (snapshot.empty) {
          this.setState({
            noMoreGames: "No games found today.",
            loading: false
          })
          return;
        } 

        var newTimes = [];
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          const data = doc.data();
          const id = doc.id;
          const schedule = data.schedule;
          const isOnSchedule = data.isOnSchedule;
          const isVisible = data.isVisible;
          const name = data.name;
          const seats = data.seats;

          Object.keys(schedule).sort().map(item => {
              
                var d = new Date();
                var today = d.getDay().toString()

                if (item === today && isVisible){
                const array = schedule[item].slice().sort()
                
                return (
                    array.map(e => {

                    const date = new Date();
                    const timeDate = moment(date).format().slice(0,11)
                    const timestamp = timeDate + e
                    const defaultTimeZone = momentTZ.tz.guess();
                    const m = momentTZ.tz(timestamp, defaultTimeZone);

                    const currentTime = new Date()
                    currentTime.setMinutes( currentTime.getMinutes() - 30 )

                    if (m > currentTime){
                      newTimes.push({
                        id: Math.floor((Math.random() * 10000) + 1),
                        game_id: id,
                        timestamp: timestamp,
                        originalTime: e,
                        time: m.format('LT') ,
                        game: name,
                        seats: seats
                      })
                    }

                     return;
                    })
                )

              } // end of IF 
            })
        });

        // if (newTimes.length === 0){
        //   this.setState({noMoreGames: "No more games today."})
        // }
        newTimes.sort(function(a, b){
          var keyA = a.time,
              keyB = b.time;
          // Compare the 2 dates
          if(keyA < keyB) return -1;
          if(keyA > keyB) return 1;
          return 0;
        });


        newTimes.length = 6;

        this.setState({
          dataSource: newTimes,
          loading: false
        })

      })
      .catch(err => {
        console.log('Error getting documents', err);
        this.setState({noMoreGames: err.message})
      });
}

  _keyExtractor = (item, index) => item.id;
  _onPressItem = (id, game_id, time, game, originalTime, timestamp) => {
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map();
      selected.set(id, !selected.get(id)); // toggle
      return {selected};
    });
    this.setState({
      isSelected: true,
      selectedItem: {
        id: id,
        game_id: game_id,
        time: time,
        timestamp: timestamp,
        originalTime: originalTime,
        game: game
    }})
  };

  _renderItem = ({item}) => (
    <ListItem
      id={item.id}
      game_id={item.game_id}
      time={item.time}
      game={item.game}
      originalTime={item.originalTime}
      timestamp={item.timestamp}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      data={item}
    />
  );

  handleNextScreen = (uid, data, profile, selected) => {
    const {navigate} = this.props.navigation;

    if (this.state.isSelected){
      navigate('PlayerDetails', {
        uid: uid,
        data: data,
        profile: profile,
        selected: selected})
    } else {
      this.setState({error: "Please select a game."})
    }
  }


  
  render() {
    const {navigate} = this.props.navigation;
    const { navigation } = this.props;
    const data = navigation.getParam('data', null);
    const profile = navigation.getParam('profile', null);
    const uid = navigation.getParam('uid', null);
    const { isSelected, dataSource } = this.state

      return (
  <React.Fragment>
    <StatusBar hidden={true} />

    <SafeAreaView style={{backgroundColor: "#1E1D23"}}>
      <View style={styles.body} keyboardDismissMode="interactive">

        <ProgressBar position="1" />
        <ExitButton navigate={navigate} />

        <View style={styles.contentSection}>
          <HeaderTitle header="Choose Your Game" subtitle="Please select your game and time" />
          {/* <Text style={{color: "#fff", opacity:0.5, fontSize:24}}>{this.state.error}</Text> */}
            <Text style={{color: "#fff", opacity:0.5, fontSize:24}}>{this.state.noMoreGames}</Text>
          {this.state.loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <View>
            <FlatList style={styles.flatlist}
              data={dataSource}
              renderItem={this._renderItem}
              keyExtractor={this._keyExtractor}
              extraData={this.state}
              numColumns="2"
            />
          </View>
          )}
          
        </View>

        <BackForwardButtons navigate={navigate} ContinueText="Continue" destination='PlayerDetails' back='Home' data={data} profile={profile} uid={uid} selected={this.state.selectedItem} onPress={() => this.handleNextScreen(uid, data, profile, this.state.selectedItem)} />
      </View>
    </SafeAreaView>
  </React.Fragment>
      )
  }
}


// export class ChooseGame extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             loading: false,
//             dataSource: [],
//             selected: (new Map()),
//             isSelected: false,
//             selectedItem: {},
//             time: ''
//       }
//   }

//     static navigationOptions = {
//         header: null,
//     };

//     componentDidMount() {
//         //this.fetchData();
//     }

//     fetchData = () => {
//         this.setState({loading: true});
        
//         fetch("https://jsonplaceholder.typicode.com/photos")
//             .then(response => response.json())
//             .then(responseJson => {
//                 responseJson = responseJson.map(item => {
//                     item.isSelect = false;
//                     item.selectedClass = styles.list;
//                     return item;
//                 });

//                 this.setState({
//                     loading: false,
//                     dataSource: responseJson
//                 });
//             }).catch(error => {this.setState({loading: false})})
//     }

//     _keyExtractor = (item, index) => item.id;
//     _onPressItem = (id, time, game) => {
//       // updater functions are preferred for transactional updates
//       this.setState((state) => {
//         // copy the map rather than modifying state.
//         const selected = new Map();
//         selected.set(id, !selected.get(id)); // toggle
//         return {selected};
//       });
//       this.setState({
//         isSelected: true,
//         selectedItem: {
//         id: id,
//         time: time,
//         game: game
//       }})
//     };

//     _renderItem = ({item}) => (
//       <ListItem
//         id={item.id}
//         time={item.time}
//         game={item.game}
//         onPressItem={this._onPressItem}
//         selected={!!this.state.selected.get(item.id)}
//         data={item}
//       />
//     );
  

    
//     render() {
//       const {navigate} = this.props.navigation;
//       const { navigation } = this.props;
//       const data = navigation.getParam('data', null);
//       const profile = navigation.getParam('profile', null);
//       const uid = navigation.getParam('uid', null);
//       const { isSelected } = this.state

//         return (
//     <React.Fragment>
//       <StatusBar hidden={true} />


//       <SafeAreaView style={{backgroundColor: "#1E1D23"}}>
//             <View style={styles.body} keyboardDismissMode="interactive">


//             <View style={styles.headerSection}>
//               <Text style={styles.sectionTitle}>Choose Game</Text>
//               <Text style={styles.sectionDescription}>
//                 Please select your game and time
//               </Text>
              
//             </View>



//         <View style={styles.contentSection}>
//         <View>
//             <FlatList style={styles.flatlist}
//             data={[
//                 {id: "1", time: '12:00 PM', game: 'Expedition Unknown'},
//                 {id: "2", time: '12:15 PM', game: 'The Black Widow'},
//                 {id: "3", time: '1:15 PM', game: 'Expedition Unknown'},
//                 {id: "4", time: '1:30 PM', game: 'The Black Widow'},
//                 {id: "5", time: '2:30 PM', game: 'Expedition Unknown'},
//                 {id: "6", time: '2:45 PM', game: 'The Black Widow'},
//                 {id: "7", time: '3:45 PM', game: 'Expedition Unknown'},
//                 {id: "8", time: '4:00 PM', game: 'The Black Widow'},
//                 {id: "9", time: '5:00 PM', game: 'Expedition Unknown'},
//                 {id: "10", time: '5:15 PM', game: 'The Black Widow'},
//                 {id: "11", time: '6:15 PM', game: 'Expedition Unknown'},
//                 {id: "12", time: '6:30 PM', game: 'The Black Widow'},
//                 {id: "13", time: '7:30 PM', game: 'Expedition Unknown'},
//                 {id: "14", time: '7:45 PM', game: 'The Black Widow'},
//                 {id: "15", time: '8:45 PM', game: 'Expedition Unknown'},
//                 {id: "16", time: '9:00 PM', game: 'The Black Widow'},
//             ]}
//             renderItem={this._renderItem}
//             keyExtractor={this._keyExtractor}
//             extraData={this.state}
//             />
//         </View>
//         </View>

//         <View style={styles.row}>

//     {isSelected ? (
//         <TouchableOpacity onPress={() => navigate('Waiver', {
//           data: data,
//           profile: profile,
//           uid: uid,
//           selected: this.state.selectedItem})}>
//         <Text style={styles.nextButton}>Continue</Text>
//     </TouchableOpacity>
//     ) : null}
          

//         </View>

//           </View>
//         </SafeAreaView>
//     </React.Fragment>
//         )
//     }
// }

const styles = StyleSheet.create({
    flatlist: {
        //marginTop: 30,
        //maxHeight: 350
    },
    row: {
        flexDirection: 'row',
    },
    body: {
      backgroundColor: "#1E1D23",
      height: "100%",
      justifyContent: "center",
      alignItems: "center"
    },
    headerSection: {
        paddingHorizontal: 24,
        marginTop:100,
        marginBottom: 30,
        width: "90%"
    },
    contentSection: {
        //paddingHorizontal: 24,
        marginTop: -50,
        width: 735
    },
    nextButton: {
        fontSize: 24,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: "#22B26A",
        color: "#fff",
        fontWeight: "500",
        borderRadius: 35
    },  
    sectionContainer: {
      paddingHorizontal: 24,
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
    selected: {
        backgroundColor: "#FA7B5F"
    },
  });

export default ChooseGame2
