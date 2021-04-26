import React from 'react';
import {View ,  StyleSheet , Text , TextInput , TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import db from './config.js';
import WelcomeScreen from './screens/welcome.js'
import { createAppContainer, createSwitchNavigator,} from 'react-navigation';
import {AppDrawerNavigator} from './components/appdrawernavigator';
export default class App extends  React.Component {
  render(){
    return(
<AppContainer/>
    )
  }
}
const Switchnavigator=createSwitchNavigator({
  WelcomeScreen:{screen:WelcomeScreen},
  Drawer:{screen:AppDrawerNavigator}
})
const AppContainer=createAppContainer(Switchnavigator)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
