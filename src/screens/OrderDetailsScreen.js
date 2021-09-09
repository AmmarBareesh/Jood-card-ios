import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MAIN_COLOR, BOLD_FONT_MEDIUM, REGULAR_FONT_SMALL, BOLD_FONT_SMALL, YELLOWCOLOR, GREENCOLOR, GREYCOLOR, REGULAR_FONT_MEDIUM } from '../utls/layout';
import {
    Text, StyleSheet, Image, ActivityIndicator, TextInput,
    TouchableHighlight, View, Switch, Alert, TouchableOpacity, ScrollView
} from 'react-native';
import CommentList from '../components/commentItem/CommentList';
import ProductList from '../components/productsItem/ProductsList';
import { getOrderDetails } from '../store/actions/orderDetails';
import comment from '../img/comment/comment.png';
import money from '../img/myOrders/money_1.png';
import clender from '../img/myOrders/calendar.png';
import details from '../img/details/details.png';
import box from '../img/details/box.png';
import message from '../img/details/message_open_3.png';

class OrderDetailsScreen extends Component {
    static navigationOptions = {
        header: null,
        headerTintColor: "transparent",
        gesturesEnabled: false,
    };
    // order_business_comments?id=10
    componentWillMount() {
        const { navigation } = this.props;
        this.props.loadData('Bearer '.concat(this.props.token.token), navigation.getParam('Id', 1)).then(response => {
            this.setState({
                isLoading: false,
                id: navigation.getParam('Id', 1)
            })
        })

    }
    state = {
        id: 1,
        isLoading: true,
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
                                onPress={() => this.props.navigation.goBack()}>
                                <Image source={require('../img/add_orders/buttonB.png')}
                                    style={{ width: 24, height: 24 }} />
                            </TouchableHighlight>
                        </View>
                        <Text style={styles.headerTitle}>
                            تفاصيل الطلب
                        </Text>
                    </View>
                    <View style={styles.ViewStyle}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', textAlign: 'right' }}>
                                <Text style={{ ...REGULAR_FONT_SMALL, color: 'white' }}>الاجمالي</Text>
                                <Text style={{ ...REGULAR_FONT_SMALL, color: 'white' }}>{this.props.orderDetails.price}</Text>
                            </View>
                            <Image source={money} style={{ width: 32, height: 32, borderColor: 'white', borderRadius: 16, borderWidth: 1, resizeMode: 'center', alignItems: 'flex-start' }} />
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', textAlign: 'right' }}>
                                <Text style={{ ...REGULAR_FONT_SMALL, color: 'white' }}>الشحن</Text>
                                <Text style={{ ...REGULAR_FONT_SMALL, color: 'white' }}>{this.props.orderDetails.shipping_price}</Text>
                            </View>
                            <Image source={clender} style={{ width: 32, height: 32, borderColor: 'white', borderRadius: 16, borderWidth: 1, resizeMode: 'center', alignItems: 'flex-start' }} />
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', textAlign: 'right' }}>
                                <Text style={{ ...REGULAR_FONT_SMALL, color: 'white' }}>التاريخ</Text>
                                <Text style={{ ...REGULAR_FONT_SMALL, color: 'white' }}>{this.props.orderDetails.date.split(" ")[0]}</Text>
                            </View>
                            <Image source={clender} style={{ width: 32, height: 32, borderColor: 'white', borderRadius: 16, borderWidth: 1, resizeMode: 'center', alignItems: 'flex-start' }} />
                        </View>
                    </View>
                    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        <View style={{ marginTop: 15, flex: 1, flexDirection: 'column', alignItems: 'flex-end',paddingTop:35 }}>
                            <View style={{ flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'flex-end',  textAlign: 'right' }}>
                                <Text style={{ ...REGULAR_FONT_SMALL, color: 'black', marginEnd: 6 }}>المنتجات</Text>
                                <Image source={box} style={{ width: 24, height: 24, resizeMode: 'stretch', marginRight: 16 }} />
                            </View>
                            <View style={{ flex: 1 ,width:'100%',}}>
                                <ProductList data={this.props.orderDetails.products} />
                            </View>
                            <View style={{ flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'flex-end', textAlign: 'right' }}>
                                <Text style={{ ...REGULAR_FONT_SMALL, color: 'black', marginEnd: 6 }}>التعليقات</Text>
                                <Image source={box} style={{ width: 24, height: 24, resizeMode: 'stretch', marginRight: 16 }} />
                            </View>
                            <View style={{ flex: 1 ,width:'100%',}}> 
                             <CommentList comments={this.props.orderDetails.comments.data} is_admin = {true} name={this.props.orderDetails.user_name} image={this.props.orderDetails.user_iamge}/>
                            </View>
                        </View>
                    </ScrollView>


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
        flex: 1,
        flexDirection: 'column',
        backgroundColor: GREYCOLOR,
    },
    sendtextStyle: {
        ...BOLD_FONT_MEDIUM,
        textAlign: 'center',
        color: '#fff'
    },
    textInputStyle2: {
        ...REGULAR_FONT_MEDIUM,
        textAlign: 'right',
        flex: 1,
        height: '100%',
    },
    ViewStyle: {
        flex: 1,
        padding: 2,
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        marginHorizontal: '5%',
        backgroundColor: '#2D2D39',
        borderRadius: 16,
        height: 70,
        top: 100,
        position: 'absolute',
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        height: 135,
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
})
const mapStateToProps = state => {
    return {
        orderDetails: state.orderDetails,
        token: state.token
    }
};


const mapDispatchToProps = dispatch => {
    return {
        loadData: (token, id) => dispatch(getOrderDetails(token, id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsScreen) 