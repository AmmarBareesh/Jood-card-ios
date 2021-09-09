import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MAIN_COLOR, BOLD_FONT_MEDIUM, REGULAR_FONT_SMALL, BOLD_FONT_SMALL, YELLOWCOLOR, REGULAR_FONT_MEDIUM, GREENCOLOR, PINKCOLOR } from '../utls/layout';
import {
    Text, StyleSheet, Image, ActivityIndicator, TextInput,
    TouchableHighlight, View, Switch, Alert, TouchableOpacity
} from 'react-native';
import AccountList from '../components/accountItem/AccountList'
import { getAccountStatements } from '../store/actions/accountStatement';
import Modal from 'react-native-modal';

class AccountStatementScreen extends Component {
    static navigationOptions = {
        header: null,
        headerTintColor: "transparent",
        gesturesEnabled: false,
    };
    componentWillMount() {
        if (!this.props.accountStatements.transaction.is_last_page) {
            this.props.loadData('Bearer '.concat(this.props.token.token), this.state.page, this.props.userCard.data.code).then(response => {
                this.setState({
                    isLoading: false
                })
            });
        }else{
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

        this.props.loadData('Bearer '.concat(this.props.token.token), this.state.page, this.props.userCard.data.code).then(response => {
            this.setState({
                isLoading: false
            })
        });
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
                            كشف الحساب
                        </Text>
                    </View>
                    <View style={styles.ViewStyle}>
                        <AccountList accounts={this.props.accountStatements.transaction.data}
                            is_last_page={this.props.accountStatements.transaction.is_last_page}
                            loadMore={this.loadMore}
                        />

                    </View>
                    <View style={styles.footer}>
                        <View style={{ flex: 1, flexGrow: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <Text style={{ ...REGULAR_FONT_MEDIUM, color: 'white' }}>الصندوق</Text>
                            <Text style={{ ...REGULAR_FONT_MEDIUM, color: 'white' }}>{this.props.accountStatements.card_balance}</Text>
                        </View>
                        <View style={{ flex: 1, flexGrow: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <Text style={{ ...REGULAR_FONT_MEDIUM, color: GREENCOLOR }}>الوارد</Text>
                            <Text style={{ ...REGULAR_FONT_MEDIUM, color: GREENCOLOR }}>{this.props.accountStatements.total_to}</Text>
                        </View>
                        <View style={{ flex: 1, flexGrow: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <Text style={{ ...REGULAR_FONT_MEDIUM, color: PINKCOLOR }}>الصادر</Text>
                            <Text style={{ ...REGULAR_FONT_MEDIUM, color: PINKCOLOR }}>{this.props.accountStatements.total_from}</Text>
                        </View>
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
        accountStatements: state.accountStatements,
        token: state.token,
        userCard: state.userCard
    }
};


const mapDispatchToProps = dispatch => {
    return {
        loadData: (token, page, code) => dispatch(getAccountStatements(token, page, code))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AccountStatementScreen) 