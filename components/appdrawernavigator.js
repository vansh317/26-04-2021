import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './apptabnavigator'
import Customsidebarmenu from './customsidebarmenu.js'
export const AppDrawerNavigator = createDrawerNavigator({
    Home : {
      screen : AppTabNavigator
      },
    
  },
    {
      contentComponent:Customsidebarmenu
    },
    {
      initialRouteName : 'Home'
    })