import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import CardView from "react-native-cardview";
import { REGULAR_FONT_SMALL, YELLOWCOLOR } from '../../utls/layout'

const ListItem = props => (
    <CardView
        style={styles.cardStyle}
        cardElevation={3}
        cardMaxElevation={3}
        cornerRadius={5}>
        <View style={{
            flex: 1,
            flexDirection:'row',
            width: '100%',
            height: 80,
            alignItems: 'center',
        }}>
            <View style={{
                flex:1,
                flexDirection:'column',
                marginHorizontal:8,
                justifyContent: 'center',
            }}>
                <Text style={styles.text2}>{props.text}</Text>
                <Text style={styles.text1}>{props.time}</Text>
            </View>
            <Image style={styles.image} source={require('../../img/logo.png')} />
        </View>
    </CardView>

);

const styles = StyleSheet.create({
    cardStyle: {
        width: '90%',
        flex: 1,
        marginBottom: 8,
        marginHorizontal:'5%',
        flexDirection: 'row',
        backgroundColor:'white'
    },
    image: {
        width: 48,
        height: 48,
        marginHorizontal: 8,
    },
    text1: {
        width: '100%',
        color:'green',
        ...REGULAR_FONT_SMALL
    },
    text2: {
        width: '100%',
        color:'black',
        textAlign:'right',
        ...REGULAR_FONT_SMALL
    }
});

export default ListItem;