
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './SideMenu.style';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, Image, TouchableHighlight, Alert } from 'react-native';
import { YELLOWCOLOR } from '../utls/layout'
import { getUserData, removeUser } from '../store/actions/user';
import { updatestatus } from '../store/actions/BottomStatus';
import { removeUserToken } from '../store/actions/auth';
import Share from 'react-native-share';
class SideMenu extends Component {
    constructor() {
        super();
    }
    componentWillMount() {
        this._bootstrapAsync();
    }
    _bootstrapAsync = () => {
        this.props.getUserData().then(() => {
            this.props.user
        })
            .catch(error => {
                // this.setState({ error })
                alert(error);
            })

    };
    navigateToScreen = (route, param = 1) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route,
            params: {
                pageId: param
            }
        });
        this.props.navigation.dispatch(navigateAction);
    }
    openBottom = () => {
        this.props.navigation.closeDrawer();
        this.props.updatestatus(true);
    }
    logout = () => () => {
        Alert.alert(
            'تسجيل خروج',
            'هل تريد بالفعل تسجيل الخروج؟',
            [
                {
                    text: 'إلغاء',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'تأكيد', onPress: () => {
                        this.props.deleteUser();
                        this.props.deleteToken();
                        this.props.navigation.navigate('Login');
                    }
                },
            ],
            { cancelable: false },
        );
    }

    render() {
        let shareOptions = {
            title: "مشاركة رقم الحساب",
            message: `تمت المشاركة عبر جزداني
            الاسم : ${this.props.userCard.data.user_name}
            رقم الحساب : ${this.props.userCard.data.code}`,

        };
        return (
            <View style={styles.container}>
                <ScrollView>
                    <TouchableHighlight onPress={this.navigateToScreen('profile')}>
                        <View style={styles.HeaderContainer}>
                            <View style={{
                                height: 100,
                                width: 20,
                                marginStart: 10,
                                alignContent: 'center',
                                justifyContent: 'center'
                            }} >
                                <Image source={require('../img/drawer/a16.png')} style={{ width: 20, height: 20 }} />
                            </View>
                            <View style={styles.HeaderTextBackground} >
                                <Text numberOfLines={1}
                                    style={styles.HeaderTextMain} >
                                    {this.props.user.user.name}
                                </Text>
                                <Text numberOfLines={2} style={styles.HeaderTextSecond} >
                                    {this.props.user.user.email}
                                </Text>
                            </View>
                            <View style={{
                                height: 100,
                                width: 70,
                                alignContent: 'center',
                                justifyContent: 'center'
                            }} >
                                <Image source={{ uri: this.props.user.user.image }}
                                    style={styles.profileImg} />
                            </View>
                        </View>
                    </TouchableHighlight>
                    <View style={{ height: 2, width: '100%', backgroundColor: YELLOWCOLOR, marginBottom: 16 }}>

                    </View>
                    <View>
                        <View style={styles.navSectionStyle}>
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Home')}>
                                الرئيسية
                                   </Text>
                            <Image source={require('../img/drawer/a14.png')} style={{ width: 20, height: 20 }} />
                        </View>
                    </View>
                    <View>
                        <View style={styles.navSectionStyle}>
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('orderProduct')}>
                                شراء منتجات
              </Text>
                            <Image source={require('../img/drawer/a3.png')} style={{ width: 20, height: 20 }} />
                        </View>
                    </View>
                    <View>
                        <View style={styles.navSectionStyle}>
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('orderCard')}>
                                شراء بطاقات الكترونية
              </Text>
                            <Image source={require('../img/drawer/a1.png')} style={{ width: 20, height: 20 }} />
                        </View>
                    </View>
                    <View>
                        <View style={styles.navSectionStyle}>
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('MyOrders')}>
                                طلباتي
              </Text>
                            <Image source={require('../img/drawer/a2.png')} style={{ width: 20, height: 20 }} />
                        </View>
                    </View>
                    <View>
                        <View style={styles.navSectionStyle}>
                            <Text style={styles.navItemStyle} onPress={() => { this.openBottom() }}>
                                تحويل رصيد
              </Text>
                            <Image source={require('../img/drawer/a6.png')} style={{ width: 20, height: 20 }} />
                        </View>
                    </View>
                    <View>
                        <View style={styles.navSectionStyle}>
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('AccountStatement')}>
                                كشف حساب مالي
              </Text>
                            <Image source={require('../img/drawer/a9.png')} style={{ width: 20, height: 20 }} />
                        </View>
                    </View>
                    <View>
                        <View style={styles.navSectionStyle}>
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Notifications')}>
                                التنبيهات
              </Text>
                            <Image source={require('../img/drawer/a4.png')} style={{ width: 20, height: 20 }} />
                        </View>
                    </View>
                    <View>
                        <View style={styles.navSectionStyle}>
                            <Text style={styles.navItemStyle} onPress={() => { Share.open(shareOptions) }}>
                                مشاركة رقم حسابي
              </Text>
                            <Image source={require('../img/drawer/a8.png')} style={{ width: 20, height: 20 }} />
                        </View>
                    </View>
                    <View>
                        <View style={styles.navSectionStyle}>
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('setting')}>
                                الاعدادات
              </Text>
                            <Image source={require('../img/drawer/a5.png')} style={{ width: 20, height: 20 }} />
                        </View>
                    </View>
                    <View>
                        <View style={styles.navSectionStyle}>
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Page', 1)}>
                                لينكات مفيدة
              </Text>
                            <Image source={require('../img/drawer/a13.png')} style={{ width: 20, height: 20 }} />
                        </View>
                    </View>
                    <View>
                        <View style={styles.navSectionStyle}>
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Page', 2)}>
                                حول التطبيق
              </Text>
                            <Image source={require('../img/drawer/a11.png')} style={{ width: 20, height: 20 }} />
                        </View>
                    </View>
                    <View>
                        <View style={styles.navSectionStyle}>
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Page', 3)}>
                                سياسة الخصوصية
              </Text>
                            <Image source={require('../img/drawer/a15.png')} style={{ width: 20, height: 20 }} />
                        </View>
                    </View>
                    <View>
                        <View style={styles.navSectionStyle}>
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Page', 4)}>
                                شروط الاستخدام
              </Text>
                            <Image source={require('../img/drawer/a10.png')} style={{ width: 20, height: 20 }} />
                        </View>
                    </View>
                    <View>
                        <View style={styles.navSectionStyle}>
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Connect')}>
                                تواصل معنا
              </Text>
                            <Image source={require('../img/drawer/a12.png')} style={{ width: 20, height: 20 }} />
                        </View>
                    </View>
                    <View>
                        <View style={styles.navSectionStyle}>
                            <Text style={styles.navItemStyle} onPress={this.logout()}>
                                تسجيل الخروج
              </Text>
                            <Image source={require('../img/drawer/a7.png')} style={{ width: 20, height: 20 }} />
                        </View>
                    </View>
                </ScrollView>
                {/* <View style={styles.footerContainer}>
                    <Text>This is my fixed footer</Text>
                </View> */}
            </View>
        );
    }
}

SideMenu.propTypes = {
    navigation: PropTypes.object
};
const mapStateToProps = state => {
    return {
        user: state.user,
        userCard: state.userCard,
        bottomStatus: state.bottomStatus
    }
};


const mapDispatchToProps = dispatch => ({
    getUserData: () => dispatch(getUserData()),
    updatestatus: (data) => dispatch(updatestatus(data)),
    deleteUser: () => dispatch(removeUser()),
    deleteToken: () => dispatch(removeUserToken())
});
export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);