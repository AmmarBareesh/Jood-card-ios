import React,{Component} from 'react';
import{
    View,
    Text,
    Button,
    StyleSheet
} from "react-native";


class BuyProductsScreen extends React.Component {
  // static navigationOptions = {
  //   header: null,
  //   gesturesEnabled: false,
  // }
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <Text>Buy Products</Text>
        </View>
      );
    }
  }

export default BuyProductsScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
