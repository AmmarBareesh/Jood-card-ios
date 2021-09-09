import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MAIN_COLOR, BOLD_FONT_MEDIUM, REGULAR_FONT_SMALL, BOLD_FONT_SMALL, YELLOWCOLOR, GREENCOLOR, GREYCOLOR, REGULAR_FONT_MEDIUM } from '../utls/layout';
import {
    Text, StyleSheet, Image, ActivityIndicator, TextInput,
    TouchableHighlight, View, Switch, Alert, TouchableOpacity
} from 'react-native';
import CommentList from '../components/commentItem/CommentList'
import { getComments, addComment } from '../store/actions/orderComment';
import comment from '../img/comment/comment.png'

class OrderCommentsScreen extends Component {
    static navigationOptions = {
        header: null,
        headerTintColor: "transparent",
        gesturesEnabled: false,
    };
    // order_business_comments?id=10
    componentWillMount() {
        const { navigation } = this.props;
        this.props.loadData('Bearer '.concat(this.props.token.token), navigation.getParam('Id', 1), this.state.page).then(response => {
            this.setState({
                isLoading: false,
                id: navigation.getParam('Id', 1)
            })
        })

    }
    state = {
        id: 1,
        page: 1,
        isLoading: true,
        text: ""
    };
    sendData() {

        if (this.state.text.trim() == "") {

        } else {
            this.setState({
                isLoading: true
            })
            this.props.addComment(this.state.text, 'Bearer '.concat(this.props.token.token), this.state.id).then(response => {
                if (response == true) {
                    this.setState({
                        isLoading: false,
                        text: ""
                    })
                } else {
                    this.setState({
                        isLoading: false,
                    })
                }
            })
        }
    }
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
                                onPress={() => this.props.navigation.goBack()}>
                                <Image source={require('../img/add_orders/buttonB.png')}
                                    style={{ width: 24, height: 24 }} />
                            </TouchableHighlight>
                        </View>
                        <Text style={styles.headerTitle}>
                            التعليقات
                        </Text>
                    </View>
                    <View style={styles.ViewStyle}>
                        <CommentList comments={this.props.comments.comments} is_admin = {this.props.comments.is_admin}
                        name={this.props.comments.user.name} image={this.props.comments.user.image}/>

                    </View>
                    <View style={styles.footer}>
                        <TouchableHighlight onPress={() => {
                            this.sendData()
                        }}>
                            <Image source={comment} />

                        </TouchableHighlight>
                        <TextInput multiline={true} maxLength={500} value={this.state.text}
                            textContentType='none' placeholder="اكتب هنا" style={styles.textInputStyle2}
                            onChangeText={val => {
                                this.setState({
                                    text: val
                                })
                            }}
                        />

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
        flex: 1,
        flexDirection: 'column',
        backgroundColor: GREYCOLOR,
    },
    sendtextStyle: {
        ...BOLD_FONT_MEDIUM,
        textAlign: 'center',
        color: '#fff'
    },
    textInputStyle2: {
        ...REGULAR_FONT_MEDIUM,
        textAlign: 'right',
        flex: 1,
        height: '100%',
    },
    ViewStyle: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: '85%',
        padding: 16,
        top: 100,
        marginBottom: '10%',
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
        backgroundColor: 'white',
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        height: '10%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 6,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
        borderBottomLeftRadius: 6
    }
})
const mapStateToProps = state => {
    return {
        comments: state.comments,
        token: state.token
    }
};


const mapDispatchToProps = dispatch => {
    return {
        loadData: (token, id, page) => dispatch(getComments(token, id, page)),
        addComment: (text, token, id) => dispatch(addComment(text, token, id))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderCommentsScreen) 