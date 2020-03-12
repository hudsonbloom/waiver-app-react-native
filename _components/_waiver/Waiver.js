import React, { Component } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    ActivityIndicator
  } from 'react-native';
import HTML from 'react-native-render-html';
import firebase from 'react-native-firebase';
import moment from 'moment';

import ProgressBar from '../customElements/ProgressBar'
import HeaderTitle from '../customElements/HeaderTitle'
import BackForwardButtons from '../customElements/BackForwardButtons'
import ExitButton from '../customElements/ExitButton'
import SelectedGameWidget from '../customElements/SelectedGameWidget'

export class Waiver extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoading: false
        }
      }

    static navigationOptions = {
        header: null,
    };


    handleCreateCheckin = () => {
      this.setState({isLoading: true})

      const data = this.props.navigation.getParam('data', null);
      const profile = this.props.navigation.getParam('profile', null);
      const uid = this.props.navigation.getParam('uid', null);
      const selected = this.props.navigation.getParam('selected', null);
      
      const minorsArray = this.props.navigation.getParam('minors', null);


      var duedate = new Date();
      duedate.setMinutes( duedate.getMinutes() + 30 )

      return firebase.firestore().collection('checkins').add({
        action_title: "checked in for",
        company: profile.account ? profile.account : null,
        device: Platform.OS === "ios" ? "iOS" : "Android",
        email: data.email.trim(),
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        minors: minorsArray ? minorsArray : null,
        product: selected.game ? selected.game : "Unknown Game",
        product_duedate: selected.time ? selected.time : null,
        product_duedate_full: selected.timestamp ? selected.timestamp : "Unknown",
        product_id: selected.game_id,
        type: "New Check-In",
        user_id: uid,
        timestamp: new Date()
    }).then(() => {
        this.props.navigation.navigate('ThankYou', {
          data: data,
          selected: selected,
          timestamp: moment(new Date()).format('LT')
        })
    }).catch((error) =>{
        console.log(error)
        this.setState({error: error})
    })
    }


    render() {
        const {navigate} = this.props.navigation;
        const htmlContent = `
        <p class="para">&nbsp;<strong>RELEASE OF LIABILITY WAIVER</strong></p><p class="ql-align-center"><strong>&nbsp;</strong></p><p>I HEREBY ASSUME ALL OF THE RISKS OF PARTICIPATING IN ANY/ALL ACTIVITIES ASSOCIATED WITH THIS EVENT, RELEASE, and DISCHARGE ESCAPE QUEST LLC, its owners, officers, directors, employees, members, agents, assigns, legal representatives and successors, and all business associates and partners involved in the presentation of the above noted activity and each of them their owners, officers and employees, from all liability for or by reason of any damage, loss or injury to person and property, even injury resulting in the death of the Participant, which has been or may be sustained in consequence of the Participant’s participation in the activities conducted by this business, and notwithstanding that such damage, loss or injury may have been caused solely or partly by the negligence of ESCAPE QUEST LLC.</p><p>&nbsp;</p><p>I acknowledge that while I am participating in the above noted activity, I will be monitored by video camera and may be photographed after participating in the activity described above. I hereby consent to give ESCAPE QUEST LLC, permission to allow my photograph to be displayed, published or distributed.&nbsp;I understand that if I do not wish for my picture to be posted on Facebook or any other media outlet, I will simply choose not to participate in the group photo.</p><p>&nbsp;</p><p>I acknowledge that I am liable for intentionally damaging any items at ESCAPE QUEST LLC.&nbsp;</p><p>I acknowledge that I am not permitted to take photos while participating in the activity described above.&nbsp;</p><p>I acknowledge that I am at least 18 years old. (If the participant is under 18 years old, a <strong>Parent/Guardian</strong> must sign this agreement.)</p><p><br></p><p>I ACKNOWLEDGE THAT I HAVE READ THIS DOCUMENT AND I FULLY UNDERSTAND ITS CONTENTS. I AM AWARE THAT THIS IS A RELEASE OF LIABILITY AND A CONTRACT BETWEEN MYSELF AND ESCAPE QUEST LLC, AND SIGN IT OF MY OWN FREE WILL.</p><br><br>`;

    const {navigation} = this.props;
    const data = navigation.getParam('data', null);
    const selected = navigation.getParam('selected', null);
    const minorsArray = navigation.getParam('minors', null);
    const profile = this.props.navigation.getParam('profile', null);
    const waiver_content = profile.settings_app.waiver_content;

    const minors = data.minors.split(',');
    const minor = minors.map((minor) =>
      <Text key={minor}>{minor}</Text>
    );

        return (
    <React.Fragment>
      <StatusBar hidden={true} />
      <SafeAreaView style={{backgroundColor: "#1E1D23"}}>

        <View style={styles.body} keyboardDismissMode="interactive">
        
        <ProgressBar position="3" />
        <ExitButton navigate={navigate} />
        <SelectedGameWidget selected={selected} player={data} minors={minorsArray} />
        <HeaderTitle header="Release of Liability Waiver" subtitle="Please read and agree to our waiver" />
        <ScrollView style={styles.waiverSection}>
            <HTML 
                html={waiver_content}
                tagsStyles = {{ 
                    p: {
                         color: '#eee',
                         fontSize: 22
                        } 
                }}
             />
        </ScrollView>

        <View style={styles.row}>
          {this.state.error ? <Text style={{color:"white"}}>{this.state.error}</Text> : null}
          
        

        </View>

        {this.state.isLoading ? (
      <ActivityIndicator size="large" color="#fff" />
    ) : (
      <BackForwardButtons navigate={navigate} ContinueText="I Agree & Submit" destination='ThankYou' back='PlayerDetails' onPress={this.handleCreateCheckin} />
    )} 

        </View>
      </SafeAreaView>
    </React.Fragment>
        )
    }
}

const classes = { 
    p: {
         color: 'white'
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
        marginBottom: 100,
        width: "90%",
    },
    contentSection: {
        paddingHorizontal: 24,
        marginBottom: 100,
        width: "90%",
        marginTop: -50
    },
    waiverSection: {
        paddingHorizontal: 24,
        width: 735,
        maxHeight: 350,
        marginBottom: 50,
        borderColor: "rgba(255, 255, 255, 0.3)",
        borderWidth: 1,
        padding: 10
    },
    nextButton: {
        fontSize: 24,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: "#22B26A",
        color: "#fff",
        fontWeight: "700",
        borderRadius: 35
    },  
    input_half: {
        padding: 25,
        margin: 20,
        fontSize: 22,
        color: "#eee",
        backgroundColor: "#192338",
        borderRadius: 50,
        flex: 0.5
    },
    input_full: {
        padding: 25,
        margin: 20,
        fontSize: 22,
        color: "#eee",
        // backgroundColor: "#36343d",
        backgroundColor: "#192338",
        borderRadius: 50
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

export default Waiver
