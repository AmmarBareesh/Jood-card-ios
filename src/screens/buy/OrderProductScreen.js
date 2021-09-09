import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    MAIN_COLOR, BOLD_FONT_MEDIUM, REGULAR_FONT_SMALL, BOLD_FONT_SMALL,
    YELLOWCOLOR, REGULAR_FONT_MEDIUM, GREENCOLOR, PINKCOLOR, GREYCOLOR
} from '../../utls/layout';
import {
    Text, StyleSheet, Image, ActivityIndicator, TextInput,
    TouchableHighlight, View, Switch, ScrollView, TouchableOpacity
} from 'react-native';
import { getProducts } from '../../store/actions/productExample';
import { senOrderProduct, addOne, deleteOne, deleteAll } from '../../store/actions/orderProduct';
import Modal from 'react-native-modal';
import CardView from 'react-native-cardview';
import ProductList from '../../components/productExample/ProductList';
import ProducOrdertList from '../../components/productOrder/ProductOrderList';


class OrderProductScreen extends Component {
    static navigationOptions = {
        header: null,
        headerTintColor: "transparent",
        gesturesEnabled: false,
    };
    componentWillMount() {
        this.props.loadData('Bearer '.concat(this.props.token.token)).then(response => {
            this.setState({
                isLoading: false
            })
        });
    }
    sendData = () => {
        if (this.props.orderProducts.value.length < 1 || this.props.orderProducts.value == undefined) {

        } else {
            this.setState({
                isLoading: true
            })
            this.props.orderProduct('Bearer '.concat(this.props.token.token), this.props.orderProducts.value, this.state.mainRemark, "links").then(res => {
                if (res == true) {
                    alert('تم ارسال الطلبية');
                    this.props.deleteAll();
                } else {
                    alert('هناك مشكلة حاول ثانية؟')
                }
                this.setState({
                    isLoading: false
                })
            })
        }
    }
    addOne = () => {
        const { link, price, remark } = this.state
        if (link.trim().length < 1 || link == undefined) {
            alert('يجب وضع رابط للمنتج')
        } else if (price.trim().length < 1 || price == undefined) {
            alert('يجب وضع سعر')
        } else {
            this.props.addProduct({
                link: link,
                price: price,
                note: remark,
                id: ""
            })
            this.setState({
                link:"",
                remark:"",
                price:""
            })
        }
    }
    deleteOne = (link) => {
        this.props.deleteProduct(link)
    }
    chooseItem = (id) => {
        const f = this.props.productExample.cards.find(x => x.id === id);
        this.setState({
            productLoading: false,
            link: f.link,
            id: f.id,
            price: f.price,
        })
    }
    state = {
        id: "",
        page: 1,
        isLoading: true,
        link: "",
        price: "0",
        remark: '',
        mainRemark: '',
        productLoading: false,
    };
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
                                <Image source={require('../../img/add_orders/buttonB.png')}
                                    style={{ width: 24, height: 24 }} />
                            </TouchableHighlight>
                        </View>
                        <Text style={styles.headerTitle}>
                            اضافة طلبات
                        </Text>
                    </View>
                    <View style={styles.ViewStyle}>
                        <ScrollView>
                            <View style={{ width: '100%', flex: 1, flexDirection: 'column', alignItems: "center" }}>
                                <CardView
                                    cardElevation={5}
                                    cardMaxElevation={5}
                                    cornerRadius={5}
                                    style={{ flex: 1, width: '94%', height: 410, backgroundColor: 'white' }}>
                                    <View style={{ flexDirection: 'column', alignItems: 'flex-end', flex: 1 }}>
                                        <View style={{
                                            width: '100%', flexDirection: 'row', backgroundColor: GREYCOLOR, height: 40,
                                            justifyContent: 'flex-end', padding: 4,
                                            borderTopLeftRadius: 6, borderTopRightRadius: 6
                                        }}>
                                            <Text style={{
                                                ...REGULAR_FONT_SMALL, color: 'black', textAlign: 'right', marginTop: 8,
                                                marginRight: 8
                                            }}>اضافة منتج</Text>
                                        </View>
                                        <View style={{ padding: 8, borderRadius: 8, margin: 8, backgroundColor: GREYCOLOR, flexDirection: 'row', alignItems: 'center' }}>
                                            <TouchableOpacity onPress={() => { this.setState({ productLoading: true }) }}>
                                                <Image source={require('../../img/add_orders/add_sq.png')}
                                                    style={{ width: 30, height: 30, resizeMode: 'center', backgroundColor: YELLOWCOLOR, borderRadius: 5 }} />
                                            </TouchableOpacity>
                                            <TextInput multiline={false} maxLength={2000} value={this.state.link}
                                                textContentType='URL' placeholder="المنتج" style={{
                                                    height: 50, flex: 1, width: '100%', marginStart: 8,
                                                    textAlign: 'right', marginEnd: 8
                                                }}
                                                onChangeText={val => {
                                                    this.setState({
                                                        link: val
                                                    })
                                                }} />
                                            <Image source={require('../../img/add_orders/box_2.png')} style={{ width: 32, height: 32 }} />
                                        </View>
                                        <View style={{ padding: 8, borderRadius: 8, margin: 8, backgroundColor: GREYCOLOR, flexDirection: 'row', alignItems: 'center' }}>
                                            <TextInput multiline={false} maxLength={2000} value={this.state.price}
                                                textContentType='telephoneNumber' placeholder="السعر" style={{
                                                    height: 50, flex: 1, width: '100%', marginStart: 8,
                                                    textAlign: 'right', marginEnd: 8
                                                }}
                                                onChangeText={val => {
                                                    this.setState({
                                                        price: val
                                                    })
                                                }} />
                                            <Image source={require('../../img/add_orders/money_sq.png')} style={{ width: 32, height: 32 }} />
                                        </View>
                                        <View style={{ padding: 8, borderRadius: 8, margin: 8, backgroundColor: GREYCOLOR, flexDirection: 'row', alignItems: 'center' }}>
                                            <TextInput multiline={true} maxLength={2000} value={this.state.remark}
                                                textContentType='none' placeholder="اكتب ملاحظة" style={{
                                                    height: 100, flex: 1, width: '100%', marginStart: 8,
                                                    textAlign: 'right', marginEnd: 8
                                                }}
                                                onChangeText={val => {
                                                    this.setState({
                                                        remark: val
                                                    })
                                                }} />
                                            <Image source={require('../../img/add_orders/money_sq.png')} style={{ width: 32, height: 32 }} />
                                        </View>

                                        <View style={{
                                            padding: 8, borderRadius: 8, margin: 8, backgroundColor: YELLOWCOLOR,
                                            flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }} onPress={() => { this.addOne()}}>
                                                <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", justifyContent: 'center' }}>
                                                    <Text style={{ ...BOLD_FONT_MEDIUM, color: 'white', height: 32, }}>حفظ المنتج</Text>
                                                    <Image source={require('../../img/add_orders/add_sq.png')} style={{ width: 32, height: 32, marginLeft: 8 }} />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </CardView>
                                <ProducOrdertList style={{flex:1,width:'100%'}} value={this.props.orderProducts.value} deleteOne={this.deleteOne} />
                                <CardView
                                    cardElevation={5}
                                    cardMaxElevation={5}
                                    cornerRadius={5}
                                    style={{ flex: 1, width: "94%", height: 70, backgroundColor: 'white', padding: 8, marginTop: 16 }}>
                                    <View style={{ flex: 1 }}>
                                        <TextInput multiline={true} maxLength={500} value={this.state.mainRemark}
                                            textContentType='none' placeholder="اكتب هنا...." style={{ height: 54, flex: 1, textAlign: 'right' }}
                                            onChangeText={val => {
                                                this.setState({
                                                    mainRemark: val
                                                })
                                            }} />
                                    </View>
                                </CardView>
                            </View>

                        </ScrollView>
                    </View>
                    <TouchableOpacity style={styles.footer} onPress={() => { this.sendData()}}>
                        <Text style={{ ...BOLD_FONT_MEDIUM, color: 'white', marginTop: 8 }}>تآكيد الطلب</Text>
                    </TouchableOpacity>
                </View>
                <Modal isVisible={this.state.isLoading}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
                        <ActivityIndicator style={{ flex: 1 }}
                            size="large" color={YELLOWCOLOR} />
                    </View>
                </Modal>
                <Modal
                    isVisible={this.state.productLoading}
                    style={styles.bottomModal}>
                    <View style={{
                        backgroundColor: 'white', borderTopRightRadius: 16, borderTopLeftRadius: 16,
                        height: "50%", width: '100%', flex: 1, flexDirection: 'column', marginTop: '50%'
                    }}>
                        <View style={{ flexDirection: "row", height: 60, alignItems: 'center' }}>
                            <TouchableHighlight style={{ width: 16, height: 16, marginStart: 25 }}
                                onPress={() => { this.setState({ productLoading: false }) }}>
                                <Image source={require('../../img/translate/close.png')} style={{ width: 16, height: 16 }} />
                            </TouchableHighlight>
                            <View style={{ flex: 1, width: '100%', flexDirection: 'column', alignItems: 'flex-end', marginEnd: 16 }}>
                                <Text style={{ ...BOLD_FONT_SMALL, color: 'black' }}>المنتجات</Text>
                                <Text style={{ ...REGULAR_FONT_SMALL, color: 'black' }}>اختر منتج</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <ProductList cards={this.props.productExample.cards} chooseItem={this.chooseItem} />
                        </View>
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
    bottomModal: {
        justifyContent: "flex-end",
        margin: 0,
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
        marginBottom: '10%',
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
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: MAIN_COLOR,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
})
const mapStateToProps = state => {
    return {
        token: state.token,
        productExample: state.productExample,
        orderProducts: state.orderProduct
    }
};


const mapDispatchToProps = dispatch => {
    return {
        loadData: (token) => dispatch(getProducts(token, "product")),
        orderProduct: (token, value, comment, type) => dispatch(senOrderProduct(token, value, comment, type)),
        addProduct: (order) => dispatch(addOne(order)),
        deleteProduct: (text) => dispatch(deleteOne(text)),
        deleteAll: () => dispatch(deleteAll())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderProductScreen) 