import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import CardView from "react-native-cardview";
import { REGULAR_FONT_SMALL, YELLOWCOLOR, MAIN_COLOR, GREENCOLOR } from '../../utls/layout'
const ProductItem = props => (
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
            <TouchableOpacity onPress={() => { props.choose(props.id)}}>
                <Image source={require('../../img/add_orders/add_sq.png')}
                    style={{ width: 30, height: 30, resizeMode: 'center', backgroundColor: YELLOWCOLOR, borderRadius: 5 }} />
            </TouchableOpacity>
            <View style={{flex:1,flexDirection:'column',alignItems:'flex-end',marginHorizontal:8}}>
            <Text style={{ width: '100%',  ...REGULAR_FONT_SMALL, color: 'black', flex: 1, textAlign: 'right' }}>{props.name}</Text>
            <Text style={{ width: '100%',  ...REGULAR_FONT_SMALL, color: GREENCOLOR, flex: 1, textAlign: 'right' }}>{props.price}</Text>
            </View>
            <Image source={{uri: props.image}}
                style={{ width: 48, height: 48, borderColor: 'black', borderRadius: 4, borderWidth: 1, resizeMode: 'stretch' }} />

        </View>
    </CardView>

);

const styles = StyleSheet.create({
    cardStyle: {
        width: '90%',
        flex: 1,
        marginBottom: 8,
        padding: 8,
        marginHorizontal: '5%',
        flexDirection: 'row',
        backgroundColor: 'white'
    },
});

export default ProductItem;