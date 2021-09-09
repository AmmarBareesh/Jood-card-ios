import React from "react";
import { TextInput, View, StyleSheet, Image } from "react-native";
import password from "../../img/signIn/password.png";
import userName from "../../img/signIn/username.png";
import userNameIcon from "../../img/signIn/username_ico.png"
const DefaultInput = (props) => {

    getIcon = (iconName)=>{
        switch(iconName){
            case "password":
            return password;
            case "email":
            return userName;
            case "username":
            return userNameIcon;
        }
    }
  return (
    <View style={styles.conatiner}>
      <View style={styles.searchSection}>
        <Image
          style={styles.imgStyle}
          source={this.getIcon(props.iconName)      }
        />
        <TextInput
          placeholderTextColor="#bbb"
          // onChangeText={searchString => {
          //   this.setState({ searchString });
          // }}
          underlineColorAndroid="transparent"
          {...props}
          style={[styles.input, props.style, !props.valid && props.touched ? styles.invalid : null]}
        />
      </View>
      <View style={styles.lineView} />
    </View>

  );
};

const styles = StyleSheet.create({

  conatiner: {
    width: "90%",
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    marginEnd: '5%'
  },
  searchSection: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    width: "100%",
    margin: 4,
    height: 50,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 0,
    paddingLeft: 10,
    fontSize: 15,
    margin: 4,
    width: "100%",
    marginTop: 2,
    marginEnd: 4,
    textAlign: 'right',
    fontFamily: 'Noor-Regular',
  },
  imgStyle: {
    width: 22,
    height: 22,
    resizeMode: 'contain'
  },
  lineView: {
    backgroundColor: "#bbb",
    height: 1,
    width: "100%"
  }

});
export default DefaultInput;

