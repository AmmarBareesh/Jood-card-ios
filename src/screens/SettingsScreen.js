import React, { Component } from 'react';
import CardView from 'react-native-cardview';
import { connect } from 'react-redux';
import axios from '../store/axios';
import { MAIN_COLOR, BOLD_FONT_MEDIUM, REGULAR_FONT_SMALL, BOLD_FONT_SMALL, YELLOWCOLOR } from '../utls/layout';
import {
    Text, StyleSheet, Image, ActivityIndicator, TextInput,
    TouchableHighlight, View, Switch, Alert, TouchableOpacity
} from 'react-native';
import { WebView } from 'react-native-webview';
import { saveNotificationStatus } from '../store/actions/notification'
import { removeUserToken } from '../store/actions/auth';
import { removeUserData } from '../store/actions/user'
import Modal from 'react-native-modal';

class SettingsScreen extends Component {
    static navigationOptions = {
        header: null,
        headerTintColor: "transparent",
        gesturesEnabled: false,
    };
    componentWillMount() {
        // const { navigation } = this.props;
        // const pageId = navigation.getParam('pageId', 1);
        // this.getData(pageId);
    }
    state = {
        oldPassword: "",
        newPassword: "",
        isLoading: false,
        modalVisable: false,
    };
    changePassword() {
        const { oldPassword, newPassword } = this.state;
        if (oldPassword == null || oldPassword.length == 0) { alert("يجب ادخال كلمة السر القديمة") }
        else if (newPassword == null || newPassword.length < 5) { alert("يجب ادخال كلمة السر الجديدة و آن تكون آكبر من ٦") }
        else {
            this.setState({
                isLoading: true
            })
            const AuthStr = 'Bearer '.concat(this.props.token.token);

            axios.post('update_account', {
                old_password: oldPassword,
                password: newPassword,
                confirm_password: newPassword
            }, {
                    headers: { Authorization: AuthStr }
                })
                .then(response => {
                    console.log(response);
                    this.setState({
                        isLoading: false
                    })
                    if (response.data.message == "fail") {
                        alert("Error Try Again!")
                    } else {
                        alert("تم تغيير كلمة السر")
                        this.setState({
                            modalVisable: false
                        })
                    }
                })
                .catch(error => {
                    this.setState({
                        isLoading: false,
                        modalVisable: false
                    })
                    console.log(error);
                    alert(error)
                })
        }

    }
    deleteAccount() {
        Alert.alert("تأكيد حذف الحساب", "تأكيد حذف الحساب", [
            {
                text: "تأكيد", style: 'default', onPress: () => {
                    this.setState({
                        isLoading: true
                    })
                    const AuthStr = 'Bearer '.concat(this.props.token.token);

                    axios.post('cancel_account', null, {
                        headers: { Authorization: AuthStr }
                    })
                        .then(response => {
                            console.log(response);
                            if (response.data.message == "fail") {
                                alert("Error Try Again!")
                                this.setState({
                                    isLoading: false
                                })
                            } else {
                                this.props.removeUser().then(()=>{
                                    this.props.removeToken().then(()=>{

                                        this.setState({
                                            modalVisable: false,
                                            isLoading: false
                                        });
                                        alert("تم حذف الحساب");
                                        this.props.navigation.navigate("Auth");
                                    })
                                });
                                // this.props.removeUser().then(() => {
                                // })

                            }
                        })
                        .catch(error => {
                            this.setState({
                                isLoading: false,
                                modalVisable: false
                            })
                            console.log(error);
                            alert(error)
                        })
                }
            },
            {
                text: 'إلغاء', style: 'cancel', onPress: () => {
                    console.log('Cancel Pressed')
                }
            }],
            { cancelable: false })
    }
    changeNotificationStatus(data) {
        this.setState({
            isLoading: true
        })
        this.props.setNotificationStatus(data).then(
            this.setState({
                isLoading: false
            })
        )
    }
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
                            الاعدادات
                        </Text>
                    </View>
                    <CardView
                        cardElevation={5}
                        cardMaxElevation={5}
                        cornerRadius={5}
                        style={styles.cardViewStyle}>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                height: 50,
                            }}>
                                <View style={{
                                    justifyContent: 'center',
                                    width: '50%',
                                }}>
                                    <Switch onValueChange={(value) => { this.changeNotificationStatus(value) }}
                                        value={this.props.notificationStatus} />
                                </View>
                                <View style={{
                                    width: '50%',
                                    justifyContent: 'center',
                                }}>
                                    <Text style={{ color: 'black', alignSelf: 'flex-end', fontFamily: 'Noor-Bold' }}>التنبيهات</Text>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                backgroundColor: 'black',
                                height: 0.5
                            }} />
                            <TouchableHighlight onPress={()=>{
                                this.deleteAccount();
                            }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                height: 50,
                            }}>
                                <View style={{
                                    justifyContent: 'center',
                                    width: '50%',
                                }}>
                                </View>
                                <View style={{
                                    width: '50%',
                                    justifyContent: 'center',
                                }}>
                                    <Text style={{ color: 'black', alignSelf: 'flex-end', fontFamily: 'Noor-Bold' }}>حذف الحساب</Text>
                                </View>
                            </View>
                            </TouchableHighlight>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                backgroundColor: 'black',
                                height: 0.5
                            }} />

                            <TouchableHighlight onPress={() => {
                                this.setState({
                                    modalVisable: true
                                })
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    height: 50,
                                }}>
                                    <View style={{
                                        justifyContent: 'center',
                                        width: '50%',
                                    }}>
                                    </View>
                                    <View style={{
                                        width: '50%',
                                        justifyContent: 'center',
                                    }}>
                                        <Text style={{ color: 'black', alignSelf: 'flex-end', fontFamily: 'Noor-Bold' }}>تغيير كلمة السر</Text>
                                    </View>
                                </View>
                            </TouchableHighlight>
                            <Modal isVisible={this.state.modalVisable}>
                                <View style={{
                                    height: 300, flexDirection: 'column', borderRadius: 6, alignItems: 'center',
                                    padding: 20, backgroundColor: 'white', alignItems: 'center'
                                }}>
                                    <Text style={{ color: 'black', alignSelf: 'center', ...BOLD_FONT_MEDIUM, marginBottom: 10 }}>تغيير كلمة السر</Text>
                                    <Text style={{ color: 'black', alignSelf: 'flex-end', ...REGULAR_FONT_SMALL }}>كلمة المرور الحالية</Text>
                                    <TextInput maxLength={20} value={this.state.oldPassword}
                                        secureTextEntry={true} style={styles.textInputStyle}
                                        onChangeText={val => {
                                            this.setState({
                                                oldPassword: val
                                            })
                                        }} />
                                    <Text style={{ color: 'black', alignSelf: 'flex-end', ...REGULAR_FONT_SMALL }}>كلمة المرور الجديدة</Text>
                                    <TextInput maxLength={20} value={this.state.newPassword}
                                        secureTextEntry={true} style={styles.textInputStyle}
                                        onChangeText={val => {
                                            this.setState({
                                                newPassword: val
                                            })
                                        }} />
                                    <View style={{ flex: 1, flexDirection: 'row', width: '100%', height: 40 }}>
                                        <TouchableOpacity
                                            onPress={() => { this.changePassword() }}
                                            style={styles.okButtonStyle}>
                                            <Text style={styles.sendtextStyle}>موافق</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({
                                                    modalVisable: false
                                                })
                                            }}
                                            style={styles.cancelButtonStyle}>
                                            <Text style={styles.sendtextStyle}>إلغاء</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                    </CardView>
                </View>)}

                {isLoading && (
                    <ActivityIndicator style={{ flex: 1, position: 'absolute', top: "47%", left: '47%' }}
                        size="large" color={YELLOWCOLOR} hidesWhenStopped={this.state.isLoading} />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    sendtextStyle: {
        ...BOLD_FONT_MEDIUM,
        textAlign: 'center',
        color: '#fff'
    },
    okButtonStyle: {
        width: '50%',
        height: 40,
        padding: 8,
        backgroundColor: MAIN_COLOR,
        borderRadius: 10,
    },
    cancelButtonStyle: {
        width: '50%',
        height: 40,
        padding: 8,
        backgroundColor: YELLOWCOLOR,
        borderRadius: 10,
    },
    cardViewStyle: {
        width: '90%',
        height: 185,
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
    },
    textInputStyle: {
        ...REGULAR_FONT_SMALL,
        textAlign: 'right',
        width: '100%',
        height: 50,
        padding: 8,
        marginTop: 8,
        marginBottom: 8,
        backgroundColor: '#dad7d9',
        borderRadius: 6,
    }
})
const mapStateToProps = state => {
    return {
        notificationStatus: state.notification.notificationStatus,
        token: state.token
    }
};


const mapDispatchToProps = dispatch => ({
    setNotificationStatus: (data) => dispatch(saveNotificationStatus(data)),
    removeUser: () => dispatch(removeUserToken()),
    removeToken:()=> dispatch(removeUserData())
});
export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen) 