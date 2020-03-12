import React, { Component } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    StatusBar,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity
  } from 'react-native';
var momentTZ = require('moment-timezone');
import moment from 'moment';

import ProgressBar from '../customElements/ProgressBar'
import HeaderTitle from '../customElements/HeaderTitle'
import BackForwardButtons from '../customElements/BackForwardButtons'
import ExitButton from '../customElements/ExitButton'
import SelectedGameWidget from '../customElements/SelectedGameWidget'
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export class PlayerDetails extends Component {
  //timer;

    constructor(props) {
        super(props);
        this.state = {
            firstName: null,
            lastName: '',
            email: '',
            minors: '',
            showMinors: false,
            details: false,
            validated: false,
            error: null
        };
      }

    static navigationOptions = {
        header: null,
    };

    
    componentDidMount(){
      const {navigate} = this.props.navigation;
      // this.timer = setTimeout(() => {
      //   navigate('Home')
      // }, 200000);
    }

    handleNextScreen = (uid, data, profile, selected) => {
      this.checkEmailValidation(uid, data, profile, selected)
    }

    validateEmail = (email) => {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    checkEmailValidation = (uid, data, profile, selected) => {
      if (!this.validateEmail(this.state.email)) {
        // not a valid email
        this.setState({
          error: "The email address is not valid."
        })
      } else {
        // valid email
      this.setState({error: null})

      clearTimeout(this.timer);
      const {navigate} = this.props.navigation;

        const minorsArray = [];
        if (this.state.minors !== null){
          const minors = this.state.minors.split(',');
          minors.map((minor) =>
            minorsArray.push(minor)
          );
        }
        
      

      navigate('Waiver', {
          uid: uid,
          data: data,
          profile: profile,
          selected: selected,
          minors: minorsArray })
      }
    }



    render() {
        const inputAccessoryViewID = "uniqueID";
        const { firstName, lastName, email, details } = this.state
        const {navigate} = this.props.navigation;
        const profile = this.props.navigation.getParam('profile', null);
        const uid = this.props.navigation.getParam('uid', null);
        const selected = this.props.navigation.getParam('selected', null);

        return (
    <React.Fragment>
      <StatusBar hidden={true} />
      <SafeAreaView style={{backgroundColor: "#1E1D23", width:"100%"}}>
        <View keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled">
      <View style={styles.body}>

        <ProgressBar position="2" />
        <ExitButton navigate={navigate} />
        <SelectedGameWidget selected={selected} />
     
      {/* <KeyboardAvoidingView 
      style={styles.contentSection} 
      behavior="padding" 
      enabled 
      keyboardVerticalOffset={50}> */}


      <KeyboardAwareScrollView 
        style={{width: 735, maxHeight: 500, marginTop: 10, marginBottom:20}}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
        extraScrollHeight={-75}
      >
<HeaderTitle header="Participant Details" subtitle="Please fill out your information" />


        {/* <ScrollView style={{maxHeight:350}}> */}
        <View style={styles.row}>
          <TextInput
              style={styles.input_half_first}
              onChangeText={text => this.setState({
                firstName: text,
                details: true
              })}
              placeholder="First Name"
              placeholderTextColor="#ccc"
            />

          <TextInput
              style={styles.input_half_end}
              onChangeText={text => this.setState({lastName: text})}
              placeholder="Last Name"
              placeholderTextColor="#ccc"
            />
        </View>

            <TextInput
              style={styles.input_full}
              onChangeText={text => this.setState({email: text})}
              placeholder="Email Address"
              placeholderTextColor="#ccc"
              autoCapitalize = 'none'
              keyboardType='email-address'
            />

            <Text style={{color:"#F55656", alignSelf:"center", marginTop:10}}>{this.state.error ? this.state.error : null}</Text>   

      <TouchableOpacity style={styles.minorButton} onPress={() => this.setState({showMinors:true})}>
          <Text style={{color: "#fff"}}>Add Minors</Text>
      </TouchableOpacity>

      {this.state.showMinors ? (
        <React.Fragment>
          <TextInput
            style={styles.input_full}
            onChangeText={text => this.setState({minors: text})}
            placeholder="Add Minors (List)"
            placeholderTextColor="#ccc"
            keyboardType='default'
          />  
          <Text style={{marginTop:10, marginLeft:30, color:"#ccc"}}>Separate names with a comma (Example: Amanda Anderson, James Anderson)</Text>  
        </React.Fragment>
      ):null}
  


      {/* </ScrollView> */}
      
        </KeyboardAwareScrollView>

        <BackForwardButtons navigate={navigate} ContinueText="Continue" destination='PlayerDetails' back='ChooseGame' profile={profile} uid={uid} onPress={() => this.handleNextScreen(uid, this.state, profile, selected)} />
          </View>
          </View>
        </SafeAreaView>
    </React.Fragment>
        )
    }
}


const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: "#fff",
    },
    engine: {
      position: 'absolute',
      right: 0,
    },
    row: {
        flexDirection: 'row',
        marginTop: 10
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
    minorButton: {
      marginTop: 10,
      width: 150,
      justifyContent: "center",
      alignItems: "center",
      fontSize: 12,
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: "#1062E5",
      color: "#fff",
      fontWeight: "500",
      borderRadius: 16,
      flex: 0.25
  },
    input_half_first: {
        padding: 20,
        paddingLeft: 35,
        marginRight: 10,
        fontSize: 22,
        color: "#eee",
        backgroundColor: "rgba(54, 50, 62, 0.5)",
        borderRadius: 50,
        borderColor: "rgba(112, 112, 112, 0.5)",
        borderWidth: 1,
        flex: 0.5
    },
    input_half_end: {
      padding: 20,
      paddingLeft: 35,
      marginLeft: 10,
      fontSize: 22,
      color: "#eee",
      backgroundColor: "rgba(54, 50, 62, 0.5)",
      borderRadius: 50,
      borderColor: "rgba(112, 112, 112, 0.5)",
      borderWidth: 1,
      flex: 0.5
  },
    input_full: {
        padding: 20,
        paddingLeft: 35,
        fontSize: 22,
        marginTop: 20,
        color: "#eee",
        backgroundColor: "rgba(54, 50, 62, 0.5)",
        borderRadius: 50,
        borderColor: "rgba(112, 112, 112, 0.5)",
        borderWidth: 1
    },
    sectionContainer: {
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 58,
      fontWeight: '600',
      color: "#eee",
    },
    sectionDescription: {
      marginTop: 5,
      fontSize: 32,
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

export default PlayerDetails
