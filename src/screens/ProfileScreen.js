import React, { Component } from 'react';
import { View } from 'native-base';
import CardView from 'react-native-cardview';
import { Text, StyleSheet, Image, ActivityIndicator, TouchableHighlight, TextInput, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux';
import axios from '../store/axios';
import { getUserToken } from '../store/actions/auth';
import { MAIN_COLOR, BOLD_FONT_MEDIUM, REGULAR_FONT_SMALL, BOLD_FONT_SMALL, YELLOWCOLOR, GREYCOLOR, REGULAR_FONT_MEDIUM } from '../utls/layout';
import ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modal';
import { ScrollView } from 'react-native-gesture-handler';
import { saveUserData } from "../store/actions/user";


class ProfileScreen extends Component {
    static navigationOptions = {
        header: null,
        headerTintColor: "transparent",
        gesturesEnabled: false,
    };
    state = {
        name: '',
        fatherName: '',
        email: '',
        tj: '',
        phoneNumber: "",
        password: "",
        newPassword: "",
        image: '',
        isLoading: false
    };
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.setState({
            name: this.props.user.name,
            fatherName: this.props.user.father_name,
            email: this.props.user.email,
            phoneNumber: this.props.user.phone,
            image: {
                uri: this.props.user.image
            },
            tj: this.props.user.tj,
            imagechange: false,
            imageName: ""
        })
    }
    sendData = () => {
        const { name, fatherName, email, tj, password, newPassword, image, phoneNumber, imageName } = this.state;
        if (phoneNumber == null || phoneNumber.length == 0) { alert("يجب ادخال رقم الهاتف") }
        else if (name == null || name.length == 0) { alert("يجب ادخال الاسم") }
        else if (tj.length == 0 || email.length == 0) { alert("يجب ادخال رقم رق الهوية آو الايميل") }
        else {
            this.setState({
                isLoading: true
            })
            var data = new FormData();
            data.append('name', name);
            data.append('father_name', fatherName);
            data.append('email', email);
            data.append('tj', tj);
            data.append('phone', phoneNumber);
            if (newPassword.length > 0 && password.length > 6) {
                data.append('old_password', password);
                data.append('password', newPassword);
                data.append('confirm_password', newPassword);
            }
            if (this.state.imagechange) {
                data.append('image',
                    { uri: image.uri, name: imageName, type: 'image/jpg' });
            }
            const AuthStr = 'Bearer '.concat(this.props.token.token);
            axios.post("update_account", {
                data
            }, {
                    headers: { Authorization: AuthStr }
                })
                .then(response => {
                    console.log(response);
                    this.setState({
                        isLoading: false
                    })
                    if (response.data.message == "fail") {
                        if (response.data.data.global.title != null)
                            alert(response.data.data.global.user)
                        if (response.data.data.global.type != null)
                            alert(response.data.data.global.user)
                        if (response.data.data.global.details != null)
                            alert(response.data.data.global.user)
                        if (response.data.data.global.user != null)
                            alert(response.data.data.global.phone_number)
                        else alert("Error Try Again!")
                    } else {
                        saveUserData(response.data.data);
                        alert("تم الحفظ")
                    }
                })
                .catch(error => {
                    this.setState({
                        isLoading: false
                    })
                    console.log(error);
                    alert(error)
                })
        }
    };
    selectPhotoTapped = () => {
        const options = {
            quality: 1.0,
            maxWidth: 800,
            maxHeight: 800,
            storageOptions: {
                skipBackup: true,
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    image: source,
                    imagechange: true,
                    imageName: response.fileName
                });
            }
        });
    }


    render() {
        return (
            <View style={styles.main}>
                <View style={styles.main}>
                    <View style={styles.header}>
                        <View style={styles.backIcon}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Home')}>
                                <Image source={require('../img/add_orders/buttonB.png')}
                                    style={{ width: 24, height: 24 }} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.headerTitle}>
                            تعديل الملف الشخصي
                    </Text>
                    </View>
                    <View style={{ position: 'absolute', flex: 1, width: '100%', marginTop: 92, flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableHighlight onPress={this.selectPhotoTapped.bind(this)}>
                            <Image source={this.state.image} style={{
                                width: 64, height: 64,
                                borderRadius: 30, borderColor: 'white',
                            }} />
                        </TouchableHighlight>
                    </View>
                    <ScrollView style={{ flex: 1, flexDirection: 'column', width: '100%', height: '100%', padding: 16, marginTop: 22 }}>
                        <CardView cardElevation={5}
                            cardMaxElevation={5}
                            cornerRadius={5}
                            style={styles.cardViewStyle}>
                            <TextInput style={styles.textInputStyle} maxLength={50} textContentType='name' keyboardType='default' value={this.state.name}
                                onChangeText={val => {
                                    this.setState({
                                        name: val
                                    })
                                }}
                            />
                            <Text style={{ ...REGULAR_FONT_SMALL, color: 'black', marginEnd: 8 }}>الاسم الكامل:</Text>
                            <Image source={require('../img/signIn/username_ico.png')} style={{ width: 24, height: 24, resizeMode: 'stretch' }} />
                        </CardView>
                        <CardView cardElevation={5}
                            cardMaxElevation={5}
                            cornerRadius={5}
                            style={styles.cardViewStyle}>
                            <TextInput style={styles.textInputStyle} maxLength={50} textContentType='name' keyboardType='default' value={this.state.fatherName}
                                onChangeText={val => {
                                    this.setState({
                                        fatherName: val
                                    })
                                }}
                            />
                            <Text style={{ ...REGULAR_FONT_SMALL, color: 'black', marginEnd: 8 }}>اسم الاب: </Text>
                            <Image source={require('../img/signIn/username_ico.png')} style={{ width: 24, height: 24, resizeMode: 'stretch' }} />
                        </CardView>
                        <CardView cardElevation={5}
                            cardMaxElevation={5}
                            cornerRadius={5}
                            style={styles.cardViewStyle}>
                            <TextInput style={styles.textInputStyle} maxLength={50} textContentType='emailAddress' keyboardType='email-address' value={this.state.email}
                                onChangeText={val => {
                                    this.setState({
                                        email: val
                                    })
                                }}
                            />
                            <Text style={{ ...REGULAR_FONT_SMALL, color: 'black', marginEnd: 8 }}>البريد الالكتروني:</Text>
                            <Image source={require('../img/signIn/username.png')} style={{ width: 24, height: 24, resizeMode: 'stretch' }} />
                        </CardView>
                        <CardView cardElevation={5}
                            cardMaxElevation={5}
                            cornerRadius={5}
                            style={styles.cardViewStyle}>
                            <TextInput style={styles.textInputStyle} maxLength={50} textContentType='none' keyboardType='default' value={this.state.tj}
                                onChangeText={val => {
                                    this.setState({
                                        name: val
                                    })
                                }}
                            />
                            <Text style={{ ...REGULAR_FONT_SMALL, color: 'black', marginEnd: 8 }}>رقم الهوية:</Text>
                            <Image source={require('../img/drawer/a1.png')} style={{ width: 24, height: 24, resizeMode: 'stretch' }} />
                        </CardView>
                        <CardView cardElevation={5}
                            cardMaxElevation={5}
                            cornerRadius={5}
                            style={styles.cardViewStyle}>
                            <TextInput style={styles.textInputStyle} maxLength={50} textContentType='telephoneNumber' keyboardType='numeric' value={this.state.phoneNumber}
                                onChangeText={val => {
                                    this.setState({
                                        phoneNumber: val
                                    })
                                }}
                            />
                            <Text style={{ ...REGULAR_FONT_SMALL, color: 'black', marginEnd: 8 }}>رقم الهاتف:</Text>
                            <Image source={require('../img/drawer/a12.png')} style={{ width: 24, height: 24, resizeMode: 'stretch' }} />
                        </CardView>
                        <CardView cardElevation={5}
                            cardMaxElevation={5}
                            cornerRadius={5}
                            style={styles.cardViewStyle}>
                            <TextInput style={styles.textInputStyle} maxLength={50} textContentType='password' keyboardType='default' value={this.state.password}
                                onChangeText={val => {
                                    this.setState({
                                        password: val
                                    })
                                }}
                            />
                            <Text style={{ ...REGULAR_FONT_SMALL, color: 'black', marginEnd: 8 }}>كلمة المرور الحالية:</Text>
                            <Image source={require('../img/signIn/password.png')} style={{ width: 24, height: 24, resizeMode: 'stretch' }} />
                        </CardView>
                        <CardView cardElevation={5}
                            cardMaxElevation={5}
                            cornerRadius={5}
                            style={styles.cardViewStyle}>
                            <TextInput style={styles.textInputStyle} maxLength={50} textContentType='password' keyboardType='default' value={this.state.newPassword}
                                onChangeText={val => {
                                    this.setState({
                                        newPassword: val
                                    })
                                }}
                            />
                            <Text style={{ ...REGULAR_FONT_SMALL, color: 'black', marginEnd: 8 }}>كلمة المرور الجديدة:</Text>
                            <Image source={require('../img/signIn/password.png')} style={{ width: 24, height: 24, resizeMode: 'stretch' }} />
                        </CardView>
                        <TouchableOpacity
                            onPress={() => { this.sendData() }}
                            style={styles.sendButtonStyle}>
                            <Text style={styles.sendtextStyle}>تعديل الملف الشخصي</Text>
                        </TouchableOpacity>
                    </ScrollView>
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
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: GREYCOLOR,
    },
    sendtextStyle: {
        ...BOLD_FONT_MEDIUM,
        textAlign: 'center',
        color: '#fff'
    },
    sendButtonStyle: {
        width: '100%',
        height: 40,
        padding: 8,
        marginTop: 16,
        backgroundColor: MAIN_COLOR,
        borderRadius: 10,
    },
    textInputStyle: {
        ...REGULAR_FONT_SMALL,
        flex: 1,
        textAlign: 'right',
        padding: 8,
        backgroundColor: 'white',
        borderRadius: 6
    },
    cardViewStyle: {
        flex: 1,
        flexDirection: 'row',
        height: 60,
        padding: 16,
        marginTop: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        height: 124,
        justifyContent: 'center',
        backgroundColor: MAIN_COLOR
    },
    headerTitle: {
        ...BOLD_FONT_MEDIUM,
        marginTop: 50,
        color: '#fff'
    },
    backIcon: {
        left: 0,
        top: 0,
        position: 'absolute',
        marginTop: 50,
        marginStart: 20,
        width: 24,
        height: 24,
    }
})
const mapStateToProps = state => {
    return {
        user: state.user.user,
        token: state.token
    }
};


const mapDispatchToProps = dispatch => ({
    getUserToken: () => dispatch(getUserToken()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen) 