
import React from "react";
import { View, Text, ImageBackground, StyleSheet, Image } from "react-native";
import ImageSrc from "../img/signIn/background.png"
import { connect } from 'react-redux';
import { getUserToken } from '../store/actions/auth';
import { getUserData } from '../store/actions/user';

class Splash extends React.Component {
    static navigationOptions = {
        header: null,
        headerTintColor: "transparent",
    }
    constructor() {
        super();
    }
    componentWillMount() {
        setTimeout(() => {
            this._bootstrapAsync();
            // this.props.navigation.navigate('Login');
        }, 2000);
    }
    _bootstrapAsync = () => {
        this.props.getUserData().then(()=>{

        })
        this.props.getUserToken().then(() => {
            this.props.navigation.navigate(this.props.token.token !== null ? 'MainApp' : 'Auth');
        })
            .catch(error => {
                // this.setState({ error })
                alert(error);
            })
      
    };
    render() {
        return (
            <View style={styles.mainColor}>
                <View style={styles.logoSection}>
                    <Image source={require('../img/logo.png')} style={styles.backgroundLogo} />
                </View>
                <View style={styles.photoSection}>
                    <Image source={require('../img/signIn/background.png')} style={styles.backgroundImage} />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    mainbackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch' 
    },
    backgroundLogo: {
        width: 90,
        height: 90,
        alignSelf: 'center'
    },
    mainColor: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: '#45996A',
        flexWrap: 'wrap'
    },
    logoSection: {
        flex: 1,
        width: '100%',
        height: '30%',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    photoSection: {
        flex: 1,
        width: '90%',
        height: '70%',
        alignItems: 'flex-start',
        alignSelf: 'center',
    }
})
const mapStateToProps = state => ({
    user: state.user,
    token: state.token,
});


const mapDispatchToProps = dispatch => ({
    getUserData: () => dispatch(getUserData()),
    getUserToken: () => dispatch(getUserToken()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Splash);
