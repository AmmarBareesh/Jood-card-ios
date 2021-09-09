
import React from "react";
import {
  View, StyleSheet, TouchableHighlight,
  Image, ImageBackground, Text, ActivityIndicator, TouchableOpacity
} from "react-native";
import { Button, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Directions, TextInput } from "react-native-gesture-handler";
import DefaultInput from "../components/UI/DefaultInput";
import { connect } from "react-redux";
import { validate } from '../utls/validation'
import { tryAuth } from '../store/actions/auth'
import { returnLoadingSatus } from '../store/actions/ui'
import { REGULAR_FONT_MEDIUM, REGULAR_FONT_SMALL, YELLOWCOLOR, MAIN_COLOR, BOLD_FONT_SMALL } from '../utls/layout'
import axios from '../store/axios';
import Modal from 'react-native-modal';

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
    headerTintColor: "transparent",
    gesturesEnabled: false,
  }
  state = {
    forgateemail: "",
    forgatePassword: false,
    isLoading: false,
    authMode: "login",
    controls: {
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false
      }
    }
  };
  constructor(props) {
    super(props);
  }

  authHandler = () => {
    if (this.state.controls.email.value == "" || this.state.controls.email.value == undefined) {
      alert("الايميل مطلوب");
    }
    else if (this.state.controls.password.value == "" || this.state.controls.password.value == undefined) {
      alert("كلمة السر مطلوب");
    }
    else {
      this.setState({
        isLoading: true
      })
      const authData = {
        email: this.state.controls.email.value,
        password: this.state.controls.password.value
      };
      this.props.onTryAuth(authData, this.state.authMode).then(authData => {
        console.log(authData);
        if (authData) {
          setTimeout(() => {
            this.props.navigation.navigate('MainApp');
          }, 1000);
        }
      });
    }
  };
  updateInputState = (key, value) => {
    let connectedValue = {};
    if (key === "password") {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: true,
            touched: true
          }
        }
      };
    });
  };
  forgateEmail = () => {
    const FEmail = this.state.forgateemail
    if (FEmail.trim().length > 192 || FEmail.trim().length < 1)
      alert("")
    else {
      axios.get(`reset_password?email=${FEmail}`).
        then(response => {
          console.log(response);
          if (response.data.message == "fail") {
            alert("حدث خطآ ما")
          } else {
            alert("تم ارسال ايميل")
          }
          this.setState({
            forgatePassword: false,
            forgateemail: ""
          })
        })
        .catch(error => {
          console.log(error);
          alert("حدث خطآ ما")
          this.setState({
            forgatePassword: false,
            forgateemail: ""
          })
        })
    };
  }

  render() {

    return (
      <View style={styles.mainbackground}>
        <View style={styles.mainbackground}>
          <View style={{ height: "75%", width: '100%', flexDirection: 'row', }}>
            <Image source={require('../img/logo.png')} style={styles.backgroundLogo} />
            <ImageBackground source={require('../img/signIn/white_tringle.png')}
              imageStyle={{ resizeMode: 'stretch' }} style={styles.whiteBackground}>
              <Text style={{ alignSelf: 'flex-end', height: '4%', marginTop: '15%', marginEnd: '5%', fontFamily: 'Noor-Bold' }}>تسجيل الدخول </Text>
              <Text h6 style={{ alignSelf: 'flex-end', height: '4%', marginTop: 6, marginEnd: '5%', fontFamily: 'Noor-Regular' }}>سجل دخول الآن</Text>
              <View style={{ marginTop: '18%', height: '20%' }}>
                <DefaultInput
                  placeholder="البريد الإلكتروني"
                  value={this.state.controls.email.value}
                  onChangeText={val => this.updateInputState("email", val)}
                  valid={this.state.controls.email.valid}
                  touched={this.state.controls.email.touched}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                />
                <DefaultInput
                  secureTextEntry={true}
                  placeholder="كلمة المرور"
                  iconName="password"
                  value={this.state.controls.password.value}
                  onChangeText={val => this.updateInputState("password", val)}
                  valid={this.state.controls.password.valid}
                  touched={this.state.controls.password.touched}
                />
              </View>
              <TouchableOpacity onPress={() => { this.setState({ forgatePassword: true }) }}>
                <Text h6 style={{
                  alignSelf: 'flex-end', marginTop: '13%', marginEnd: '10%',
                  color: "#45996A", fontFamily: 'Noor-Regular'
                }}>هل نسيت كلمة المرور؟</Text>
              </TouchableOpacity>
              <Avatar
                containerStyle={{ position: 'absolute', backgroundColor: 'white', left: '50%', top: '75%' }}
                size={50}
                rounded
                overlayContainerStyle={{ backgroundColor: '#F8C43A' }}
                icon={{ name: 'angle-left', type: 'font-awesome' }}
                onPress={() => {
                  this.authHandler()
                }}
                activeOpacity={0.7}
              />
            </ImageBackground>
          </View>
          <View style={{ height: "25%", width: '100%', justifyContent: 'center' }} >
            <ImageBackground source={require('../img/signIn/background.png')} style={{
              flex: 1, width: '100%',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }} imageStyle={{ resizeMode: 'stretch' }} >
              <TouchableOpacity onPress={() => { this.props.navigation.navigate('SignUp') }} >
                <View style={{ flex: 1, marginBottom: 32, flexDirection: 'row', alignItems: 'flex-end' }}>
                  <Text style={{ color: YELLOWCOLOR, ...REGULAR_FONT_SMALL }}>سجل حساب الان</Text>
                  <Text style={{ color: 'white', ...REGULAR_FONT_SMALL }}>ليس لديك حساب؟</Text>
                </View>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>
        <Modal isVisible={this.state.isLoading}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
            <ActivityIndicator style={{ flex: 1 }}
              size="large" color={YELLOWCOLOR} />
          </View>
        </Modal>
        <Modal isVisible={this.state.forgatePassword}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
            <View style={{
              flex: 1, width: "80%", height: 100, padding: 16, flexDirection: 'column', justifyContent: 'center',
              alignItems: 'center', backgroundColor: 'white', borderRadius: 12
            }}>
              <TextInput
                placeholder="البريد الإلكتروني"
                value={this.state.forgateemail}
                onChangeText={val => {
                  this.setState({
                    forgateemail: val
                  })
                }}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                style={{ flex: 1, width: '100%', marginHorizontal: '5%', ...REGULAR_FONT_SMALL, color: 'black', textAlign: 'right' }}
              />
              <View style={{ flex: 1, flexDirection: 'row', width: '100%' }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      forgatePassword: false
                    })
                  }}
                  style={{ flex: 1, width: '100%', marginEnd: 16 }}>
                  <Text style={{
                    flex: 1,
                    width: '100%',
                    padding: 8,
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: YELLOWCOLOR,
                    ...BOLD_FONT_SMALL,
                    borderRadius: 10,
                  }}>إلغاء</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => { this.forgateEmail() }}
                  style={{ flex: 1, width: '100%' }}>
                  <Text style={{
                    flex: 1,
                    width: '100%',
                    padding: 8,
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: MAIN_COLOR,
                    ...BOLD_FONT_SMALL,
                    borderRadius: 10,
                  }}>ارسل</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
};

const mapStateToProps = state => {
  return {
    isLoading: state.isLoading,
    token: state.token
  };
};

const mapDispatchToProps = dispatch => ({
  onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode)),
  onLoadingStatus: () => dispatch(returnLoadingSatus()),
  getUserToken: () => dispatch(getUserToken()),
});

const styles = StyleSheet.create({
  mainbackground: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#45996A',
  },
  whiteBackground: {
    width: '100%',
    height: '100%',
    paddingRight: '5%',
    marginLeft: '5%',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  backgroundLogo: {
    width: 70,
    height: 70,
    marginLeft: 20,
    marginTop: 40,
    position: 'absolute'
  },

})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);