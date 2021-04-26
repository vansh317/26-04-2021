import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import BookDonateScreen from '../screens/bookdonate';
import RecieverDetailsScreen from '../screens/recieverdetails.js';
export const AppStackNavigator = createStackNavigator     ({

        BookDonateList: {
            screen: BookDonateScreen, navigationOptions:
                { headerShown: false }
        },
        RecieverDetails: {
            screen: RecieverDetailsScreen, navigationOptions:
                { headerShown: false }
        }
    },
        { initialRouteName: 'BookDonateList' });