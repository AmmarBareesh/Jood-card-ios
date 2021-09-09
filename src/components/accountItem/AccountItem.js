import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import CardView from "react-native-cardview";
import { REGULAR_FONT_SMALL, YELLOWCOLOR, BOLD_FONT_SMALL, PINKCOLOR, GREENCOLOR, BOLD_FONT_MEDIUM } from '../../utls/layout';
import investment from '../../img/register_account/investment.png';
import box from '../../img/register_account/investment.png';
import paper from '../../img/register_account/paper_2.png';
import money from '../../img/register_account/money_1.png';

const AccountItem = props => (
    <CardView
        style={styles.cardStyle}
        cardElevation={3}
        cardMaxElevation={3}
        cornerRadius={6}>
        <View style={{
            flex: 1,
            flexDirection: 'row',
            width: '100%',
            height: 120,
            alignItems: 'center',
        }}>



            <View style={{ flex: 1, flexGrow: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', }}>
                <Image source={money} style={{ width: 24, height: 24, marginBottom: 8, resizeMode: 'stretch' }} />
                <Text style={{ ...REGULAR_FONT_SMALL, color: PINKCOLOR, marginBottom: 8 }}>الاجمالي</Text>
                <Text style={{ ...REGULAR_FONT_SMALL, color: 'black' }}>{props.amount}</Text>
            </View>
            <View style={{ flex: 1, flexGrow: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', }}>
                <Image source={paper} style={{ width: 24, height: 24, marginBottom: 8, resizeMode: 'stretch' }} />
                <Text style={{ ...REGULAR_FONT_SMALL, color: YELLOWCOLOR, marginBottom: 8 }}>رقم العملية</Text>
                <Text style={{ ...REGULAR_FONT_SMALL, color: 'black' }}>{props.id}</Text>
            </View>
            <View style={{ flex: 1, flexGrow: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', }}>
                <Image source={props.type == "transfer" ? investment : box} style={{ width: 24, height: 24, marginBottom: 8, resizeMode: 'stretch' }} />
                <Text style={{ ...REGULAR_FONT_SMALL, color: GREENCOLOR, marginBottom: 8 }}>النوع</Text>
                <Text style={{ ...REGULAR_FONT_SMALL, color: 'black' }}>{props.type == "transfer" ? "حوالة" : "طلب شراء"}</Text>
            </View>
            <View style={{
                flex: 1, flexGrow: 1, flexDirection: 'column', alignItems: 'center', height: '100%', borderTopRightRadius: 8, borderBottomRightRadius: 8,
                justifyContent: 'center', backgroundColor: props.statement == "debtor" ? PINKCOLOR : GREENCOLOR
            }}>
                <Text style={{ ...BOLD_FONT_MEDIUM, color: 'white' }}>{props.date.getDate()}</Text>
                <Text style={{ ...BOLD_FONT_MEDIUM, color: 'white' }}>{getMonthName(props.date)}</Text>
                <Text style={{ ...BOLD_FONT_MEDIUM, color: 'white' }}>{props.date.getFullYear()}</Text>
            </View>
        </View>
    </CardView>

);
getMonthName = (date) => {
    const n = date.getMonth();
    switch (n) {
        case 0:
            return "يناير";
        case 1:
            return "فبراير";
        case 2:
            return "مارس";
        case 3:
            return "أبريل";
        case 4:
            return "مايو";
        case 5:
            return "يونيو";
        case 6:
            return "يوليو";
        case 7:
            return "أغسطس";
        case 8:
            return "سبتمبر";
        case 9:
            return "أكتوبر";
        case 10:
            return "نوفمبر";
        case 11:
            return "ديسمبر";
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
    },
    image: {
        width: 48,
        height: 48,
        marginHorizontal: 8,
    },
    text1: {
        width: '100%',
        color: 'green',
        ...REGULAR_FONT_SMALL
    },
    text2: {
        width: '100%',
        color: 'black',
        textAlign: 'right',
        ...REGULAR_FONT_SMALL
    }
});

export default AccountItem;