import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TouchableHighlight } from "react-native";
import CardView from "react-native-cardview";
import { REGULAR_FONT_SMALL, YELLOWCOLOR, BOLD_FONT_SMALL, PINKCOLOR, GREENCOLOR, BOLD_FONT_MEDIUM, MAIN_COLOR, LIGHTRED } from '../../utls/layout';
import calendar from '../../img/myOrders/calendar.png';
import money from '../../img/myOrders/money_1.png';
import no_cr from '../../img/myOrders/no_cr.png';
import message from '../../img/myOrders/message_open_3.png';
import memo from '../../img/myOrders/memo.png'

import pending from '../../img/stutus/pending.png';
import proceed from '../../img/stutus/proceed.png';
import approved from '../../img/stutus/approved.png';
import paid from '../../img/stutus/paid.png';
import shipping from '../../img/stutus/shipping.png';
import complete from '../../img/stutus/complete.png';
import cancel from '../../img/stutus/cancel.png';
import refused from '../../img/stutus/cancel.png';

const OrderItem = props => (
    <CardView
        style={styles.cardStyle}
        cardElevation={3}
        cardMaxElevation={3}
        cornerRadius={8}>
        <View style={{
            flex: 1,
            flexDirection: 'column',
            width: '100%',
            height: 160,
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 10
        }}>
            <View style={{
                width: '100%', height: 100, backgroundColor: PINKCOLOR, flex: 1,
                flexDirection: 'row', borderTopLeftRadius: 10, borderTopRightRadius: 10
            }}>
                <View style={{
                    backgroundColor: getImageAndColor(props.last_status).color, borderTopLeftRadius: 10, borderBottomRightRadius: 10, position: 'absolute', top: 0, left: 0,
                    padding: 4, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                }}>
                    <Text style={{ ...REGULAR_FONT_SMALL, color: 'white' }}>{getImageAndColor(props.last_status).text}</Text>
                    <Image source={getImageAndColor(props.last_status).image} style={{ marginStart: 5, width: 16, height: 16 }} />
                </View>
                <View style={{ flex: 1, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ textAlign: 'center', ...REGULAR_FONT_SMALL, color: 'white' }}>الاجمالي</Text>
                        <Text style={{ textAlign: 'center', ...BOLD_FONT_MEDIUM, color: 'white' }}>{props.total === null ? 0 : props.total} USD</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexGrow: 1, flexDirection: 'column', alignItems: 'flex-end', marginEnd: 10 }}>
                    <View style={{ flex: 1, flexGrow: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-end' }}>
                            <Text style={{ ...REGULAR_FONT_SMALL, color: 'white' }} >التاديخ</Text>

                            <Text style={{ ...REGULAR_FONT_SMALL, color: 'white' }} >{props.date.split(" ")[0]}</Text>
                        </View>
                        <Image source={calendar} style={{ marginStart: 8, width: 16, height: 16, borderColor: 'white', borderRadius: 8, borderWidth: 1, resizeMode: 'stretch' }} />
                    </View>
                    <View style={{ flex: 1, flexGrow: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-end' }}>
                            <Text style={{ ...REGULAR_FONT_SMALL, color: 'white' }} >قيمة الشحن</Text>
                            <Text style={{ ...REGULAR_FONT_SMALL, color: 'white' }} >{props.shipping_price} USD</Text>
                        </View>
                        <Image source={money} style={{ marginStart: 8, width: 16, height: 16, borderColor: 'white', borderRadius: 8, borderWidth: 1, resizeMode: 'stretch' }} />
                    </View>
                </View>

            </View>

            <View style={{ width: '100%', flexDirection: 'row', height: 60, backgroundColor: 'white', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                {(props.last_status === "pending" || props.last_status === "proceed") &&
                    <TouchableOpacity style={{ flex: 1, flexGrow: 1, flexDirection: 'column', alignItems: "center", justifyContent: 'center' }}
                        onPress={() => props.deleteById(props.id, 1)}>
                        <View style={{ flex: 1, flexGrow: 1, flexDirection: 'column', alignItems: "center", justifyContent: 'center' }}>
                            <Image source={no_cr} style={{ width: 24, height: 24 }} />
                            <Text style={{ ...REGULAR_FONT_SMALL, color: MAIN_COLOR }}>إلغاء</Text>
                        </View>
                    </TouchableOpacity>}
                <TouchableOpacity style={{ flex: 1, flexGrow: 1, flexDirection: 'column', alignItems: "center", justifyContent: 'center' }}
                    onPress={() => props.navigateTo(props.id, 1)}>
                    <View style={{ flex: 1, flexGrow: 1, flexDirection: 'column', alignItems: "center", justifyContent: 'center' }}>
                        <Image source={message} style={{ width: 24, height: 24 }} />
                        <Text style={{ ...REGULAR_FONT_SMALL, color: MAIN_COLOR }}>التعليقات</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, flexGrow: 1, flexDirection: 'column', alignItems: "center", justifyContent: 'center' }}
                    onPress={() => props.navigateTo(props.id, 2)}>
                    <View style={{ flex: 1, flexGrow: 1, flexDirection: 'column', alignItems: "center", justifyContent: 'center' }}>
                        <Image source={memo} style={{ width: 24, height: 24 }} />
                        <Text style={{ ...REGULAR_FONT_SMALL, color: MAIN_COLOR }}>التفاصيل</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    </CardView>

);
getImageAndColor = (status) => {
    switch (status) {
        case "pending":
            return { image: pending, color: YELLOWCOLOR, text: 'انتظار' };
        case "proceed":
            return { image: proceed, color: YELLOWCOLOR, text: 'معالجة' };
        case "approved":
            return { image: approved, color: GREENCOLOR, text: 'موافقة' };
        case "paid":
            return { image: paid, color: GREENCOLOR, text: 'دفع' };
        case "shipping":
            return { image: shipping, color: GREENCOLOR, text: 'شحن' };
        case "complete":
            return { image: complete, color: GREENCOLOR, text: 'تسليم' };
        case "refused":
            return { image: refused, color: LIGHTRED, text: 'رفض' };
        case "cancel":
            return { image: cancel, color: LIGHTRED, text: 'إلفاء' };
        default:
            return { image: pending, color: YELLOWCOLOR, text: status };
    }
}

const styles = StyleSheet.create({
    cardStyle: {
        width: '90%',
        flex: 1,
        marginBottom: 8,
        marginHorizontal: '5%',
        flexDirection: 'row',
        backgroundColor: 'white'
    }
})
export default OrderItem;