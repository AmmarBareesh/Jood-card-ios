import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import CardView from "react-native-cardview";
import { REGULAR_FONT_SMALL, YELLOWCOLOR, MAIN_COLOR, GREENCOLOR } from '../../utls/layout'
const ProductOrderItem = props => (
    <CardView
        style={styles.cardStyle}
        cardElevation={3}
        cardMaxElevation={3}
        cornerRadius={5}>
        <View style={{
            flex: 1,
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
        }}>
            <TouchableOpacity onPress={() => { props.deleteOne(props.link)}}>
                <Image source={require('../../img/add_orders/del.png')}
                    style={{ width: 30, height: 30, resizeMode: 'stretch'}} />
            </TouchableOpacity>
            <View style={{flex:1,flexDirection:'column',alignItems:'flex-end'}}>
            <Text style={{ width: '100%',  ...REGULAR_FONT_SMALL, color: 'black', flex: 1, textAlign: 'right' }}>الاسم: {props.link}</Text>
            <Text style={{ width: '100%',  ...REGULAR_FONT_SMALL, color: GREENCOLOR, flex: 1, textAlign: 'right' }}>السعر: {props.price}</Text>
            <Text style={{ width: '100%',  ...REGULAR_FONT_SMALL, color: GREENCOLOR, flex: 1, textAlign: 'right' }}>الملاحظات:{props.note}</Text>
            </View>

        </View>
    </CardView>

);

const styles = StyleSheet.create({
    cardStyle: {
        width: '90%',
        flex: 1,
        marginBottom: 8,
        padding: 16,
        marginHorizontal: '5%',
        flexDirection: 'row',
        backgroundColor: 'white'
    },
});

export default ProductOrderItem;