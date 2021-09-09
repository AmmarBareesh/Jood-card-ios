import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import CardView from "react-native-cardview";
import { REGULAR_FONT_SMALL, YELLOWCOLOR, BOLD_FONT_SMALL, PINKCOLOR, GREENCOLOR, BOLD_FONT_MEDIUM, GREYCOLOR } from '../../utls/layout';
import pending from '../../img/stutus/pending.png';
import proceed from '../../img/stutus/proceed.png';
import approved from '../../img/stutus/approved.png';
import paid from '../../img/stutus/paid.png';
import shipping from '../../img/stutus/shipping.png';
import complete from '../../img/stutus/complete.png';
import cancel from '../../img/stutus/cancel.png';
import refused from '../../img/stutus/cancel.png';
import date from '../../img/main/calendar.png';
import number from '../../img/main/paper_2.png';

const HomeItem = props => (

    <View style={{ flex: 1, flexGrow: 1, flexDirection: 'row', height: 80, backgroundColor: GREYCOLOR,marginBottom:8 }}>
        <View style={{ flex: 1, flexGrow: 1, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1, flexGrow: 1, flexDirection: 'row',paddingTop:8,paddingBottom:8,justifyContent:'flex-end',
             backgroundColor: getImageAndColor(props.last_status).color }}>
                <Text style={{ ...REGULAR_FONT_SMALL, color: 'white', marginEnd: 4 }}>{this.getImageAndColor(props.last_status).text}</Text>
                <Image source={this.getImageAndColor(props.last_status).image}
                    style={{ width: 16, height: 16, resizeMode: 'stretch',marginEnd:8 }} />
            </View>
            <View style={{ flex: 1, flexGrow: 1, flexDirection: 'column', alignItems: 'center' }}>
                <Text style={{ ...REGULAR_FONT_SMALL, color: 'black', marginBottom: 2 }}>الاجمالي</Text>
                <Text style={{ ...REGULAR_FONT_SMALL, color: GREENCOLOR }}>{props.price}</Text>
            </View>
        </View>
        <View style={{ flex: 1, flexGrow: 1, flexDirection: 'column', alignItems: 'flex-end', marginEnd: 16,justifyContent:'center' }}>
            <View style={{  flexDirection: 'row',marginBottom:8 }}>
                <Text style={{ ...REGULAR_FONT_SMALL, color: 'black', marginEnd: 4 }}>{props.id}</Text>
                <Text style={{ ...REGULAR_FONT_SMALL, color: 'black',marginEnd: 4  }}>رقم الطلبية:</Text>
                <Image source={ number } style={{ width: 16, height: 16 }} />
            </View>
            <View style={{  flexDirection: 'row' }}>
                <Text style={{ ...REGULAR_FONT_SMALL, color: 'black', marginEnd: 4 }}>{props.date.split(" ")[0]}</Text>
                <Text style={{ ...REGULAR_FONT_SMALL, color: 'black',marginEnd: 4  }}>التاريخ:</Text>
                <Image source={ date } style={{ width: 16, height: 16 }} />
            </View>
        </View>
    </View>
        );
getImageAndColor = (status) => {
    switch (status) {
        case "pending":
            return { image: pending, color: YELLOWCOLOR,text:'انتظار' };
        case "proceed":
            return { image: proceed, color: YELLOWCOLOR,text:'معالجة' };
        case "approved":
            return { image: approved, color: GREENCOLOR,text:'موافقة' };
        case "paid":
            return { image: paid, color: GREENCOLOR,text:'دفع' };
        case "shipping":
            return { image: shipping, color: GREENCOLOR,text:'شحن' };
        case "complete":
            return { image: complete, color: GREENCOLOR,text:'تسليم' };
        case "refused":
            return { image: refused, color: PINKCOLOR,text:'رفض' };
        case "cancel":
            return { image: cancel, color: PINKCOLOR,text:'إلفاء' };
        default:
            return { image: pending, color: YELLOWCOLOR,text:status };
    }
}

export default HomeItem;