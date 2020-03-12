import React, { Component } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    ActivityIndicator
  } from 'react-native';

export class UpdateList extends Component {

    handleReadUpdate = (e) => {
        console.log(e)
        this.props.readUpdate(e)
    }

    render() {

        const {updates} = this.props


        return (
            <View>

            {updates && updates.map(update => {
                return (
                    <div>

                    <div className="row" key={update.id} style={{margin:"30px 0px"}}>
                        <div className="col-10 update-card" style={{padding:"0", margin:"0"}}>
        
        
                            <Link to={update ? update.url_path : "/"}>
                                {/* <UpdateSingle update={update} key={update.id} /> */}
                                <Update update={update} />
                            </Link>


                        </div>

                        <div className="col-2">
                        <Button onClick={(e) => this.handleReadUpdate(update.id)} style={{borderRadius:"50%", padding:"1px 13px"}}>
                            <i style={{fontSize:"38px"}} className="icon ion-ios-checkmark"></i> 
                        </Button>
                        

                        </div>
                    </div>
                    </div>
                )
            })}

        </div>
        )
    }
}

export default UpdateList
