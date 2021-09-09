import React, { Component } from 'react';
import { View } from 'native-base';
import CardView from 'react-native-cardview';
import { Text, StyleSheet, Image, ActivityIndicator, TouchableHighlight, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import axios from '../store/axios';
import { getUserToken } from '../store/actions/auth';
import { MAIN_COLOR, BOLD_FONT_MEDIUM, REGULAR_FONT_SMALL, BOLD_FONT_SMALL, YELLOWCOLOR } from '../utls/layout';

class ConnectUsScreen extends Component {
    static navigationOptions = {
        header: null,
        headerTintColor: "transparent",
        gesturesEnabled: false,
    };
    state = {
        phoneNumber: "",
        address: '',
        remark: '',
        isLoading: false
    };
    sendData = () => {
        const { phoneNumber, address, remark } = this.state;
        if (phoneNumber == null || phoneNumber.length == 0) { alert("يجب ادخال رقم الهاتف") }
        else if (address == null || address.length == 0) { alert("يجب ادخال العنوان") }
        else if (remark == null || remark.length == 0) { alert("يجب ادخال ملاحظة") }
        else {
            this.setState({
                isLoading: true
            })
            const AuthStr = 'Bearer '.concat(this.props.token.token);
            axios.get(`http://mascom-cards.vision-building.com/api/complaints?title=${address}&type=complaints&details=${remark}&phone_number=${phoneNumber}`, { headers: { Authorization: AuthStr } })
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
                        this.props.navigation.navigate('Home');
                        alert("تم ارسال الرسالة")
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
    constructor(props) {
        super(props);
    }
    render() {
        const { isLoading } = this.state;
        return (
            <View style={styles.main}>
                {!isLoading && (<View style={styles.main}>
                    <View style={styles.header}>
                        <View style={styles.backIcon}>
                            <TouchableHighlight
                                onPress={() => this.props.navigation.navigate('Home')}>
                                <Image source={require('../img/add_orders/buttonB.png')}
                                    style={{ width: 24, height: 24 }} />
                            </TouchableHighlight>
                        </View>
                        <Text style={styles.headerTitle}>
                            تواصل معنا
                    </Text>
                    </View>
                    <CardView
                        cardElevation={5}
                        cardMaxElevation={5}
                        cornerRadius={5}
                        style={styles.cardViewStyle}>
                        <View>
                            <TextInput multiline={false} maxLength={20} value={this.state.phoneNumber}
                                textContentType='telephoneNumber' placeholder="رقم الهاتف" style={styles.textInputStyle}
                                onChangeText={val => {
                                    this.setState({
                                        phoneNumber: val
                                    })
                                }} />
                            <TextInput multiline={false} maxLength={150} value={this.state.address}
                                textContentType='fullStreetAddress' placeholder="العنوان" style={styles.textInputStyle}
                                onChangeText={val => {
                                    this.setState({
                                        address: val
                                    })
                                }}
                            />
                            <TextInput multiline={true} maxLength={500} value={this.state.remark}
                                textContentType='none' placeholder="اكتب ملاحظاتك هنا" style={styles.textInputStyle2}
                                onChangeText={val => {
                                    this.setState({
                                        remark: val
                                    })
                                }}
                            />
                            {/* <TouchableOpacity style={styles.buttonStyle} color='#fff' title="ارسل" /> */}
                            <TouchableOpacity
                                onPress={() => { this.sendData() }}
                                style={styles.sendButtonStyle}>
                                <Text style={styles.sendtextStyle}>ارسل</Text>
                            </TouchableOpacity>
                        </View>
                    </CardView>
                </View>)}

                {isLoading && (
                    <ActivityIndicator style={{ flex: 1, position: 'absolute', top: "45%", left: '45%' }}
                        size="large" color={YELLOWCOLOR} hidesWhenStopped={this.state.isLoading} />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
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
        textAlign: 'right',
        width: '100%',
        height: 50,
        padding: 8,
        marginTop: 8,
        backgroundColor: '#dad7d9',
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
        borderBottomLeftRadius: 6
    },
    textInputStyle2: {
        ...REGULAR_FONT_SMALL,
        textAlign: 'right',
        width: '100%',
        height: 120,
        padding: 8,
        marginTop: 16,
        backgroundColor: '#dad7d9',
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
        borderBottomLeftRadius: 6
    },
    cardViewStyle: {
        width: '90%',
        height: 400,
        padding: 16,
        left: '5%',
        top: 100,
        backgroundColor: 'white',
        position: 'absolute',
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        height: 150,
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
        token: state.token
    }
};


const mapDispatchToProps = dispatch => ({
    getUserToken: () => dispatch(getUserToken()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ConnectUsScreen) 