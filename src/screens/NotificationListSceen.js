import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MAIN_COLOR, BOLD_FONT_MEDIUM, REGULAR_FONT_SMALL, BOLD_FONT_SMALL, YELLOWCOLOR } from '../utls/layout';
import {
    Text, StyleSheet, Image, ActivityIndicator, TextInput,
    TouchableHighlight, View, Switch, Alert, TouchableOpacity
} from 'react-native';
import NotificationList from '../components/ListItem/NotificationList'
import { getNotifications } from '../store/actions/notificationList';

class NotificationListScreen extends Component {
    static navigationOptions = {
        header: null,
        headerTintColor: "transparent",
        gesturesEnabled: false,
    };
    componentWillMount() {
        this.props.loadData('Bearer '.concat(this.props.token.token), this.state.page).then(response=>{
            if(response == true){
                this.setState({
                    isLoading:false
                })
            }
        });
    }
    state = {
        page: 1,
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
                                onPress={() => this.props.navigation.navigate('Home')}>
                                <Image source={require('../img/add_orders/buttonB.png')}
                                    style={{ width: 24, height: 24 }} />
                            </TouchableHighlight>
                        </View>
                        <Text style={styles.headerTitle}>
                            التنيهات
                        </Text>
                    </View>
                    <View style={styles.ViewStyle}>
                        <NotificationList notifications={this.props.notifications} />

                    </View>
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
        flex:1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    sendtextStyle: {
        ...BOLD_FONT_MEDIUM,
        textAlign: 'center',
        color: '#fff'
    },
    ViewStyle: {
        flex:1,
        flexDirection:'column',
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
})
const mapStateToProps = state => {
    return {
        notifications: state.notificationList.notifications,
        token: state.token
    }
};


const mapDispatchToProps = dispatch => {
    return {
        loadData: (token, page) => dispatch(getNotifications(token, page))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(NotificationListScreen) 