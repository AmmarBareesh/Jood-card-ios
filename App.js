/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */


import React from 'react';
import { Provider } from "react-redux";
import {Text,Dimensions} from "react-native";
import { createStackNavigator, createAppContainer, createSwitchNavigator, createDrawerNavigator } from 'react-navigation'; // Version can be specified in package.json
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import SpalshScreen from './src/screens/SplashScreen';
import BuyProductsScreen from './src/screens/BuyProductsScreen';
import ConnectUsScreen from './src/screens/connectUsScreen';
import configureStore from './src/store/configureStore';
import SideBar from './src/screens/SideBar';
import { MAIN_COLOR, YELLOWCOLOR, PINKCOLOR } from './src/utls/layout';
import WebViewScreen from './src/screens/WebViewScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import NotificationListSceen from './src/screens/NotificationListSceen';
import SignUpScreen from './src/screens/SignUpScreen';
import AccountStatementScreen from './src/screens/AccountStatementScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import MyOrdersScreen from './src/screens/MyOrdersScreen';
import OrderCommentsScreen from './src/screens/OrderCommentsScreen';
import OrderDetailsScreen from './src/screens/OrderDetailsScreen';
import OrderProductScreen from './src/screens/buy/OrderProductScreen';
import OrderCardScreen from './src/screens/buy/OrderCardScreen';

const DEVICE_WIDTH = Dimensions.get('window').width;
const AppDrawerStack = createDrawerNavigator({ "Home": HomeScreen }, {
  drawerPosition: 'right',
  // initialRouteName: 'Home',
  drawerWidth: DEVICE_WIDTH - 100,
  contentComponent: props => <SideBar {...props} />
},
);
const OtherStack = createStackNavigator({BuyProduct: BuyProductsScreen,
  Connect:ConnectUsScreen,
  Page:WebViewScreen,
  setting:SettingsScreen,
  Notifications: NotificationListSceen,
  AccountStatement: AccountStatementScreen,
  profile:ProfileScreen,
  MyOrders:MyOrdersScreen,
  OrderComment:OrderCommentsScreen,
  OrderDetail:OrderDetailsScreen,
  orderProduct:OrderProductScreen,
  orderCard:OrderCardScreen
})
const DrawerNavigation = createStackNavigator({AppDrawerStack},{
  headerMode: 'none',})
const AuthStack = createStackNavigator({ Login: LoginScreen,SignUp:SignUpScreen });
const store = configureStore();

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    Splash: SpalshScreen,
    MainApp: DrawerNavigation,
    Auth: AuthStack,
    Other:OtherStack
  },
  {
    initialRouteName: 'Splash',
  }, {
    mode: 'modal',
    headerMode: 'none',
  }
));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
