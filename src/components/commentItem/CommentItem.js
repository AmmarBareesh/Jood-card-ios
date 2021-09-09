import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import CardView from "react-native-cardview";
import { REGULAR_FONT_SMALL, YELLOWCOLOR, MAIN_COLOR, BOLD_FONT_SMALL, GREYCOLOR } from '../../utls/layout'
import logo from '../../img/logo.png'
const CommentItem = props => (
    <CardView
        style={styles.cardStyle}
        cardElevation={3}
        cardMaxElevation={3}
        cornerRadius={5}>
        <View style={{
            flex: 1,
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-end'
        }}>
            <View style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent:'flex-end'
            }}>
                <View style={{ flex: 1, flexDirection: 'column', margin: 8,alignItems:'flex-end' }}>
                    <Text style={{ ...BOLD_FONT_SMALL, color: 'black', flex: 1 }}>{props.is_admin=="no"?props.name:"جزداني"}</Text>
                    <Text style={{ ...BOLD_FONT_SMALL, color: GREYCOLOR, flex: 1 }}>{props.time}</Text>
                </View>

                <Image source={pickImage(props.is_admin, props.image)}
                    style={{ width: 48, height: 48, borderColor: MAIN_COLOR, borderRadius: 4, borderWidth: 1, resizeMode: 'stretch' }} />
            </View>
            <Text style={{width:'100%',margin:8,...REGULAR_FONT_SMALL,color:'black',flex:1,textAlign:'right'}}>{props.comment}</Text>
        </View>
    </CardView>

);
pickImage = (is_admin, image) => {
    if (is_admin == "no") {
        return { uri: image }
    } else {
        return logo
    }
}
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

export default CommentItem;