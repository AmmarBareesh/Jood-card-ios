import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MAIN_COLOR, BOLD_FONT_MEDIUM, REGULAR_FONT_SMALL, BOLD_FONT_SMALL, YELLOWCOLOR, REGULAR_FONT_MEDIUM, GREENCOLOR, PINKCOLOR } from '../utls/layout';
import {
    Text, StyleSheet, Image, ActivityIndicator, TextInput,
    TouchableHighlight, View, Switch, Alert, TouchableOpacity
} from 'react-native';
import OrderList from '../components/orderList/OrderList'
import { getOrders, deleteOrder } from '../store/actions/orders';
import Modal from 'react-native-modal';

class MyOrdersScreen extends Component {
    static navigationOptions = {
        header: null,
        headerTintColor: "transparent",
        gesturesEnabled: false,
    };
    componentWillMount() {
        if (!this.props.orders.is_last_page) {
            this.props.loadData('Bearer '.concat(this.props.token.token), this.state.page).then(response => {
                this.setState({
                    isLoading: false
                })
            });
        } else {
            this.setState({
                isLoading: false
            })
        }
    }
    state = {
        page: 1,
        isLoading: true,
    };
    loadMore = () => {
        this.setState(prevState => {
            return { page: prevState.page + 1 }
        })

        this.props.loadData('Bearer '.concat(this.props.token.token), this.state.page).then(response => {
            this.setState({
                isLoading: false
            })
        });
    }
    deleteOrder = (id) => {
        Alert.alert('حذف طلب', 'هل آنت متآكد من حذف الطلب؟',
            [
                {
                    text: 'إلغاء',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'تأكيد', onPress: () => {
                        this.setState({
                            isLoading: true
                        })
                        this.props.deleteone('Bearer '.concat(this.props.token.token),id).then(response => {
                            this.setState({
                                isLoading: false
                            })
                        })
                    }
                },
            ],
            { cancelable: false })

    }
    navigateto = (id, type) => {
        if (type === 1) {
            this.props.navigation.navigate({
                routeName: 'OrderComment', params: {
                    Id: id
                }
            })
        }
        else {
            this.props.navigation.navigate({
                routeName: 'OrderDetail', params: {
                    Id: id
                }
            })
        }
    }
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.main}>
                <View style={styles.main}>
                    <View style={styles.header}>
                        <View style={styles.backIcon}>
                            <TouchableHighlight
                                onPress={() => this.props.navigation.navigate('Home')}>
                                <Image source={require('../img/add_orders/buttonB.png')}
                                    style={{ width: 24, height: 24 }} />
                            </TouchableHighlight>
                        </View>
                        <Text style={styles.headerTitle}>
                            طلباتي
                        </Text>
                    </View>
                    <View style={styles.ViewStyle}>
                        <OrderList orders={this.props.orders.orders}
                            is_last_page={this.props.orders.is_last_page}
                            loadMore={this.loadMore}
                            deleteById={this.deleteOrder}
                            navigateTo={this.navigateto}
                        />

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
    ViewStyle: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: '85%',
        padding: 16,
        top: 100,
        backgroundColor: 'transparent',
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
    footer: {
        position: 'absolute',
        width: '100%',
        height: '8%',
        flexDirection: 'row',
        bottom: 0,
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
        backgroundColor: MAIN_COLOR,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
const mapStateToProps = state => {
    return {
        orders: state.orders,
        token: state.token,
    }
};


const mapDispatchToProps = dispatch => {
    return {
        loadData: (token, page) => dispatch(getOrders(token, page)),
        deleteone: (token,id) => dispatch(deleteOrder(token,id))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyOrdersScreen) 