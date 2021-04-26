import React, { Component } from "react";
import { Animated, Dimensions, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { SwipeListView } from "react-native-swipe-list-view";
import db from "../config";

export default class SwipeableFlatlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allnotification: this.props.allnotification
        }
    }
    updateMarkAsread = notification => {
        db.collection("all_notifications")
            .doc(notification.doc_id)
            .update({ notification_status: "read" });
    };
    onSwipeValueChange = swipeData => {
        var allNotification = this.state.allNotification;
        const { key, value } = swipeData;
        if (value < -Dimensions.get("window").width) {
            const newData = [...allNotification];

            this.updateMarkAsread(allNotification[key]);
            newData.splice(key, 1);
            this.setState({ allNotification: newData });
        }
    };
    renderItem = data => (
        <Animated.View>
            <ListItem leftElement={<Icon name="book" type="font-awesome" color="#696969" />}
                title={data.item.book_name}
                titleStyle={{ color: "black", fontWeight: "bold" }}
                subtitle={data.item.message} bottomDivider />
        </Animated.View>);
    renderHiddenItem = () => (
        <View style={styles.rowBack}>
            <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
                <Text style={styles.backTextWhite}>Mark as read</Text>
            </View>
        </View>
    );

    render() {
        return (
            <View>
                <SwipeListView disableRightSwipe data={this.state.allnotification}
                    renderItem={this.renderItem}
                    renderHiddenItem={this.renderHiddenItem}
                    rightOpenValue={-Dimensions.get("window").width}
                    onSwipeValueChange={this.onSwipeValueChange}
                    keyExtractor={(item, index) => {
                        index.toString()
                    }}
                />

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:
    {
        backgroundColor: "white",
        flex: 1
    },
    backTextWhite:
    {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 15,
        textAlign: "center",
        alignSelf: "flex-start"
    },
    rowBack: {
        alignItems: "center",
        backgroundColor: "#29b6f6",
        flex: 1, flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 15
    },
    backRightBtn: {
        alignItems: "center",
        bottom: 0,
        position: "absolute",
        top: 0, width: 100
    },
    backRightBtnRight: {
        backgroundColor: "#29b6f6",
        right: 0
    }
});
