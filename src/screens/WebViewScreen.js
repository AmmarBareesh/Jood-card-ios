import React, { Component } from 'react';
import CardView from 'react-native-cardview';
import { connect } from 'react-redux';
import axios from '../store/axios';
import { MAIN_COLOR, BOLD_FONT_MEDIUM, REGULAR_FONT_SMALL, BOLD_FONT_SMALL, YELLOWCOLOR } from '../utls/layout';
import { Text, StyleSheet, Image, ActivityIndicator, TouchableHighlight, View } from 'react-native';
import { WebView } from 'react-native-webview';

class WebViewScreen extends Component {
    static navigationOptions = {
        header: null,
        headerTintColor: "transparent",
        gesturesEnabled: false,
    };
    componentWillMount() {
        const { navigation } = this.props;
        const pageId = navigation.getParam('pageId', 1);
        this.getData(pageId);
    }
    state = {
        base_title: "",
        details: '',
        isLoading: false
    };
    getData = (pageId) => {
        let pageUrl = "privacy";
        switch (pageId) {
            case 1: {
                pageUrl = "useful_links"
                break;
            }
            case 2: {
                pageUrl = "about"
                break;
            }
            case 3: {
                pageUrl = "privacy"
                break;
            }
            case 4: {
                pageUrl = "how_to_use"
                break;
            }
        }
        this.setState({
            isLoading: true
        })
        const AuthStr = 'Bearer '.concat(this.props.token.token);
        axios.get(`http://mascom-cards.vision-building.com/api/pages?type=${pageUrl}`, { headers: { Authorization: AuthStr } })
            .then(response => {
                console.log(response);
                this.setState({
                    isLoading: false
                })
                if (response.data.message == "fail") {
                    alert("Error Try Again!")
                } else {
                    this.setState({
                        base_title: response.data.data.page.base_title,
                        details : response.data.data.page.details
                    })
                }
            })
            .catch(error => {
                this.setState({
                    isLoading: false
                })
                console.log(error);
                alert(error)
            })
    };
    constructor(props) {
        super(props);
    }
    render() {
        const { isLoading, base_title, details } = this.state;
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
                            {base_title}
                        </Text>
                    </View>
                    <CardView
                        cardElevation={5}
                        cardMaxElevation={5}
                        cornerRadius={5}
                        style={styles.cardViewStyle}>
                        <View style={{flex:1 }}>
                            <WebView style={{ width: '100%', height: '100%'  }} 
                            originWhitelist={['*']} source={{ html: details }} 
                            />
                        </View>
                    </CardView>
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
        backgroundColor: 'white',
    },
    cardViewStyle: {
        width: '90%',
        height: "85%",
        padding: 16,
        left: '5%',
        top: 100,
        backgroundColor: 'white',
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
    }
})
const mapStateToProps = state => {
    return {
        token: state.token
    }
};


const mapDispatchToProps = dispatch => ({
    getUserToken: () => dispatch(getUserToken()),
});
export default connect(mapStateToProps, mapDispatchToProps)(WebViewScreen) 