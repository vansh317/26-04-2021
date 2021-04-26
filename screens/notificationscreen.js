import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import firebase from "firebase";
import MyHeader from "../components/MyHeader";
import SwipeableFlatlist from "../components/swipableflatlist";
import db from "../config";

export default class NotificationScreen extends Component {
    constructor() {
        super();
        this.state = {
            userid: firebase.auth().currentUser.email,
            allnotification: []
        }
        this.notificationref = null
    }
    getnotification = () => {
        this.notificationref = db.collection("all_notifications").where('targeted_user_id', '==', this.state.userid)
            .where("notification_status", "==", "unread")
            .onSnapshot(Snapshot => {
                var notifications = []
                Snapshot.docs.map(doc => {
                    var n = doc.data()
                    n["doc_id"] = doc.id
                    notifications.push(n)
                })
                this.setState({ allnotification: notifications })
            })
    }
    componentDidMount = () => {
        this.getnotification();
    }
    componentWillUnmount = () => {
        this.notificationref();
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.1 }}>
                    <Text>vansh</Text>
                </View>
                <View style={{ flex: 0.9 }}>
                    {
                        this.state.allnotification.length === 0
                            ? (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Text> you have no notifications </Text>  </View>)

                            : (<View>
                                <Text>
                                    *swipe left to mark the notification as read*
                        </Text>
                                <SwipeableFlatlist allnotification={this.state.allnotification} />
                            </View>)
                    }
                </View>
            </View>

        )
    }
}
