import React, { Component } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Image,
    View,
    Text,
    StatusBar,
    ActivityIndicator
  } from 'react-native';
  import firebase from 'react-native-firebase'
  import Icon from "react-native-vector-icons/Ionicons";

  import Login from '../login/Login'


export class HomeScreen extends Component {
  constructor() {
    super();
      this.unsubscriber = null;
      this.state = {
        user: null,
        uid: null,
        user_account: '',
        profile: null,
        homescreen_header: '',
        homescreen_subtitle: '',
        error: null
      };
  }

  static navigationOptions = {
            header: null,
        };

  componentDidMount() {
    StatusBar.setHidden(true);
    this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
      if (user){
      this.setState({ 
        user: user,
        uid: user.uid
      });
      
        this.fetchData(user.uid)
      }
      
      
    });
    
  }

  fetchData = (uid) => {
    
      firebase.firestore().collection('users').doc(uid).get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
          this.setState({error: "No document found"})
        } else {
          console.log('Document data:', doc.data());
          this.setState({
            profile: doc.data(),
            homescreen_header: doc.data().settings_app.homescreen_header,
            homescreen_subtitle: doc.data().settings_app.homescreen_subtitle
          })
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
        this.setState({error: err})
      });

  }

  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }

        
    render() {
        const {navigate} = this.props.navigation;
        const { homescreen_header, homescreen_subtitle } = this.state;

        if (!this.state.user) {
          return <Login />;
        }

        return (
        <React.Fragment>
      <StatusBar hidden={true} />
      <SafeAreaView style={{backgroundColor: "#1E1D23"}}>
      <View style={styles.body} onTouchEnd={() => navigate('ChooseGame', {
            uid: this.state.uid,
            profile: this.state.profile
            })}>
        {this.state.profile ? (
          
            <View style={styles.sectionHomescreen}>
              {/* <Image
          style={{width: "50%", height: 120, resizeMode: 'cover'}}
          source={{uri: 'https://chalkstripe-assets.s3.amazonaws.com/EscapeQuestWhite.png'}}
        /> */}
              <Text style={styles.sectionTitle}>{homescreen_header}</Text>
              <Text style={styles.sectionDescription}>
                {homescreen_subtitle}
              </Text>
              <Text style={styles.sectionDescription2}>
                All participants must check in
              </Text>
              <Text style={styles.sectionDescription}>
                {/* {this.state.error ? this.state.error : null} */}
              </Text>
            </View>
        ) : (
          <ActivityIndicator size="large" color="#fff" />
        )}
      
      </View>
          <View style={styles.settings}>
              <Icon
                name={Platform.OS === "ios" ? "ios-cog" : "md-cog"}
                color="#ccc"
                size={25}
                onPress={() => navigate('Settings')}
              />
            </View>
        </SafeAreaView>
    </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    settings: {
      position: "absolute",
      bottom: 0,
      left: 0,
      padding: 20
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
      fontSize: 80,
      fontWeight: '600',
      color: "#eee",
    },
    sectionDescription: {
      marginTop: 5,
      fontSize: 48,
      fontWeight: '400',
      color: "#eee",
    },
    sectionDescription2: {
      marginTop: 15,
      fontSize: 28,
      fontWeight: '400',
      color: "#eee",
      opacity: 0.5
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

export default HomeScreen
