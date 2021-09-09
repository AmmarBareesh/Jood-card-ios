
import React from "react";
import { View, StyleSheet, Image, ImageBackground, Text, ActivityIndicator, TouchableHighlight } from "react-native";
import { Button, Avatar } from 'react-native-elements';
import DefaultInput from "../components/UI/DefaultInput2";
import { connect } from "react-redux";
import { tryAuth } from '../store/actions/auth'
import { MAIN_COLOR, YELLOWCOLOR, BOLD_FONT_SMALL, BOLD_FONT_MEDIUM, REGULAR_FONT_SMALL } from "../utls/layout";
import Modal from 'react-native-modal';


class SignUpScreen extends React.Component {
    static navigationOptions = {
        header: null,
        headerTintColor: "transparent",
        gesturesEnabled: false,
    }
    state = {
        isLoading: false,
        authMode: "signUp",

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
            },
            tj: {
                value: "",
                valid: false,
                touched: false
            },
            name: {
                value: "",
                valid: false,
                touched: false
            },
        }
    };
    constructor(props) {
        super(props);
    }

    authHandler = () => {

        if (this.state.controls.email.value.length == 0 && this.state.controls.tj.value.length == 0) { alert("يجب ادخال الايميل آو دقم الهوية ") }
        else if (this.state.controls.name.value == null || this.state.controls.name.value.length == 0) { alert("يجب ادخال الاسم ") }
        else if (this.state.controls.password.value == null || this.state.controls.password.value.length == 0) { alert("يجب ادخال كلمة المرور ") }
        else {
            this.setState({
                isLoading: true
            })
            let authData;
            if (this.state.controls.tj.value.length == 0) {
                authData = {
                    email: this.state.controls.email.value,
                    password: this.state.controls.password.value,
                    password_confirmation: this.state.controls.password.value,
                    name: this.state.controls.name.value,
                }
            }
            else {
                authData = {
                    password: this.state.controls.password.value,
                    password_confirmation: this.state.controls.password.value,
                    name: this.state.controls.name.value,
                    tj: this.state.controls.tj.value.length
                }
            }
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

    render() {

        return (
            <View style={styles.main}>
                <View style={styles.mainbackground}>
                    <View style={{ height: "75%", width: '100%', flexDirection: 'row', }}>
                        <Image source={require('../img/logo.png')} style={styles.backgroundLogo} />
                        <ImageBackground source={require('../img/signIn/tringle.png')}
                            imageStyle={{ resizeMode: 'stretch' }} style={styles.whiteBackground}>
                            <Text style={{
                                alignSelf: 'flex-start',
                                marginTop: '20%', marginLeft: '20%', ...BOLD_FONT_MEDIUM
                            }}>انشا حساب </Text>
                            <View style={{ marginEnd: '35%' }}>
                                <DefaultInput
                                    placeholder="الاسم"
                                    iconName="username"
                                    value={this.state.controls.name.value}
                                    onChangeText={val => this.updateInputState("name", val)}
                                    valid={this.state.controls.name.valid}
                                    touched={this.state.controls.name.touched}
                                />
                                <DefaultInput
                                    placeholder="البريد الإلكتروني"
                                    iconName="email"
                                    value={this.state.controls.email.value}
                                    onChangeText={val => this.updateInputState("email", val)}
                                    valid={this.state.controls.email.valid}
                                    touched={this.state.controls.email.touched}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    keyboardType="email-address"
                                />

                                <DefaultInput
                                    placeholder="رقم الهوية"
                                    iconName="username"
                                    value={this.state.controls.tj.value}
                                    onChangeText={val => this.updateInputState("tj", val)}
                                    valid={this.state.controls.tj.valid}
                                    touched={this.state.controls.tj.touched}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    keyboardType="number-pad"
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

                            <Avatar
                                containerStyle={{ position: 'absolute', backgroundColor: 'white', left: '45%', top: '73%' }}
                                size={50}
                                rounded
                                overlayContainerStyle={{ backgroundColor: '#F8C43A' }}
                                icon={{ name: 'angle-right', type: 'font-awesome' }}
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
                            <TouchableHighlight onPress={() => { this.props.navigation.navigate('Login') }} >
                                <View style={{ flex: 1, marginBottom: 32, flexDirection: 'row', alignItems: 'flex-end' }}>
                                    <Text style={{ color: YELLOWCOLOR, ...REGULAR_FONT_SMALL }}>سجل دخول </Text>
                                    <Text style={{ color: 'white', ...REGULAR_FONT_SMALL }}> لديك حساب؟</Text>
                                </View>
                            </TouchableHighlight>
                        </ImageBackground>
                    </View>


                </View>

                <Modal isVisible={this.state.isLoading}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
                        <ActivityIndicator style={{ flex: 1 }}
                            size="large" color={YELLOWCOLOR} />
                    </View>
                </Modal>
            </View>
        );
    }
};

const mapStateToProps = state => {
    return {
        token: state.token
    };
};

const mapDispatchToProps = dispatch => ({
    onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode)),
});

const styles = StyleSheet.create({
    mainbackground: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: MAIN_COLOR,
    },
    whiteBackground: {
        width: '100%',
        height: '100%',
        paddingLeft: '5%',
        marginRight: '5%',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
    },
    backgroundLogo: {
        width: 70,
        height: 70,
        right: 20,
        marginTop: 40,
        position: 'absolute'
    },
    main: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: MAIN_COLOR,
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);