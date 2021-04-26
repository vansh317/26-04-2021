import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView, _ScrollView, Alert } from 'react-native';
import firebase from 'firebase';
import db from '../config'

export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailid: "",
      password: "",
      Fname: '',
      lname: '',
      address: "",
      mobile: '',
      confirmpassword: '',
      modalvisible: false
    }
  }
  showModals = () => {
    return (
      <Modal animationType='fade' transparent={true} visible={this.state.modalvisible}>
        <View style={styles.modalContainer}>
          <ScrollView style={{ width: '100%' }}>
          
           <KeyboardAvoidingView  style={styles.KeyboardAvoidingView}>
           
              <Text style={styles.modalTitle}>registration</Text>
              <TextInput style={styles.formTextInput}
                placeholder={"enter your  first name "}
                maxLength={10}
                onChangeText={(text) => { this.setState({ Fname: text }) }} />
              <TextInput style={styles.formTextInput}
                placeholder={"enter your last name "}
                maxLength={10}
                onChangeText={(text) => { this.setState({ lname: text }) }} />
              <TextInput style={styles.formTextInput}
                placeholder={"enter your mobile number "}
                maxLength={10}
                keyboardType={'numeric'}
                onChangeText={(text) => { this.setState({ mobile: text }) }} />
              <TextInput style={styles.formTextInput}
                placeholder={"enter your address"}
                multiline={true}
                onChangeText={(text) => { this.setState({ address: text }) }} />
              <TextInput style={styles.formTextInput}
                placeholder={"enter your emailid "}

                keyboardType={'email-address'}
                onChangeText={(text) => { this.setState({ emailid: text }) }} />
              <TextInput style={styles.formTextInput}
                placeholder={"enter your  password"}
                secureTextEntry={true}
                onChangeText={(text) => { this.setState({ password: text }) }} />
              <TextInput style={styles.formTextInput}
                placeholder={"confirm your password"}
                secureTextEntry={true}
                onChangeText={(text) => { this.setState({ confirmpassword: text }) }} />
  <View style={styles.button}>
<TouchableOpacity style={styles.button} onPress={()=>{this.signup(this.state.emailid , this.state.password , this.state.confirmpassword)}}>
  <Text style={styles.registerButtonText}>register</Text>
  </TouchableOpacity>
   </View>
                  <View style={styles.button}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => { this.setState({ modalvisible: false }) }}>
                  <Text>cancel</Text></TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>

    )
  }
  login = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate('Donatebooks')
        
      })
      .catch((error) => {
        return alert(error.code)
      })
  }
  signup = (emailid, password, confirmpassword) => {
    console.log(password + "" + confirmpassword+""+emailid)
    if (password !== confirmpassword) {
      return alert('password did not match ')
    }
    else {
      console.log("going to register")
      firebase.auth().createUserWithEmailAndPassword(emailid, password)
        .then(() => {
          db.collection('users').add({
            first_name: this.state.Fname,
            last_name: this.state.lname,
            contact: this.state.mobile,
            email_id: this.state.emailid,
            address: this.state.address
          })
          return Alert.alert
            (
              'user added successfully ', '', [{
                text: 'OK', onPress: () => this.setState({ modalvisible: false })

              }]
            )
        })
        .catch((error) => {
          return alert(error.code)
        })
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {this.showModals()}
        <TextInput placeholder="email" keyboardType="email-address" onChangeText={text => {
          this.setState({ emailid: text })
        }} value={this.state.emailid}></TextInput>
        <TextInput placeholder="password" secureTextEntry={true} onChangeText={text => {
          this.setState({ password: text })
        }} value={this.state.password}></TextInput>

        <TouchableOpacity onPress={() => {
          this.login(this.state.emailid, this.state.password)
        }}>
          <Text>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.setState({ modalvisible: true })}
        ><Text>Sign Up</Text></TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',

  },
  title: {
    fontSize: 65,
    
    paddingBottom: 30,
    color: "#ff3d00",

  },
  
  loginbox: {
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor: '#ff8a65',
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
  },
  button: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: "#ff9800",
    shadowColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8, },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText: {
    color: '#ffff',
    fontWeight: '200',
    fontSize: 20
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center'
  },
  modalTitle: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 30,
    color: '#ff5722',
    margin: 50
  },

  modalContainer: { flex: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: "#ffff", marginRight: 30, marginLeft: 30, marginTop: 80, marginBottom: 80, },
  registerButton: { width: 200, height: 40, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 10, marginTop: 30 }, registerButtonText: { color: '#ff5722', fontSize: 15, fontWeight: 'bold' }, ncelButtonca: { width: 200, height: 30, justifyContent: 'center', alignItems: 'center', marginTop: 5, },
  formTextInput: { width: "75%", height: 35, alignSelf: 'center', borderColor: '#ffab91', borderRadius: 10, borderWidth: 1, marginTop: 20, padding: 10 },

});

