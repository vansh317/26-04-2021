import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView, _ScrollView, Alert } from 'react-native';
import firebase from 'firebase';
import db from '../config'

export default class BookRequest extends React.Component {
    constructor() {
        super();
        this.state = {
            userid: firebase.auth().currentUser.email,
            bookname: "",
            reason: "",
        }
    }
    createid() {
        return Math.random().toString(23).substring(7)

    }
    addrequest(){
        db.collection("requested_books").add({
            userid:this.state.userid,
            bookname:this.state.bookname,
            reason:this.state.reason,
            requestid:this.createid()
        })
        this.setState({bookname:'',reason:''})
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <KeyboardAvoidingView style={styles.keyBoardStyle}>
                    <TextInput style={styles.formTextInput}
                        placeholder={"enter your  book name "}

                        onChangeText={(text) => { this.setState({ bookname: text }) }}
                        value={this.state.bookname}
                    />
                    <TextInput style={[styles.formTextInput, { height: 250 }]}
                        placeholder={"reason"}
                        multiline
                        numberOfLines={10}
                        onChangeText={(text) => { this.setState({ reason: text }) }}
                        value={this.state.reason}
                    />
                    <TouchableOpacity style={styles.button} onPress={()=>{
                        this.addrequest()
                    }}>
                        <Text>submit request</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    keyBoardStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    formTextInput: {
        width: "75%",
        height: 35,
        alignSelf: 'center',
        borderColor: '#ffab91',
        borderRadius: 10,
        borderWidth: 1, marginTop: 20,
        padding: 10,
    },
    button: {
        width: "75%",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: "#ff5722",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        }, shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop: 20
    },
})