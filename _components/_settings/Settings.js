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
    ActivityIndicator,
    TouchableOpacity
  } from 'react-native';
  import firebase from 'react-native-firebase';

export class Settings extends Component {
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


    handleLogout = () => {
        const {navigate} = this.props.navigation;
        firebase.auth().signOut().then(() => {
            this.setState({isLoading: true})
            setTimeout(() => {
                navigate('Home')
              }, 2000);
          }).catch((error) => {
            this.setState({error: error})
          });
      }
    render() {
        return (
            <React.Fragment>
      <StatusBar hidden={true} />
      <SafeAreaView style={{backgroundColor: "#1E1D23"}}>
            <View style={styles.body} keyboardDismissMode="interactive">

        <KeyboardAvoidingView style={styles.contentSection} behavior="position" enabled keyboardVerticalOffset={50}>
        <View style={styles.headerSection}>
                <Text style={styles.sectionTitle}>Settings</Text>
                <Text style={{color:"red"}}>{this.state.error ? this.state.error : null}</Text>
          </View>

        </KeyboardAvoidingView>

        <View style={styles.row}>


        <TouchableOpacity onPress={this.handleLogout}>
        {this.state.isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text style={styles.nextButton}>Logout</Text>}
           
       </TouchableOpacity>

          

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
        paddingHorizontal: 24,
        marginBottom: 100,
        width: "90%",
        marginTop: -50
    },
    nextButton: {
        fontSize: 24,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: "#22B26A",
        color: "#fff",
        fontWeight: "500"
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

export default Settings
