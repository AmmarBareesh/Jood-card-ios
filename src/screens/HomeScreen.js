import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  TouchableHighlight,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { MAIN_COLOR, GREYCOLOR, BOLD_FONT_MEDIUM, REGULAR_FONT_SMALL, YELLOWCOLOR, BOLD_FONT_LARGE, REGULAR_FONT_MEDIUM, BOLD_FONT_SMALL } from '../utls/layout'
import { connect } from 'react-redux';
import { getCard } from '../store/actions/userCard'
import Modal from 'react-native-modal';
import { TextInput } from 'react-native-gesture-handler';
import { updatestatus } from '../store/actions/BottomStatus'
import axios from '../store/axios'
import HomeList from '../components/homeList/HomeList';

class HomeScreen extends Component {
  componentDidMount() {
    this.props.getUserCard('Bearer '.concat(this.props.token.token)).then(response => {
      this.setState({
        isLoading: false
      })
    });
  }
  state = {
    isLoading: true,
    money: "0",
    number: "",
    remark: ""
  };
  // sendData = () => {
  //   this.closeBottom();
  //   const { money, number, remark } = this.state;
  //   if (money == null || phoneNumber.length == 0) { alert("يجب ادخال رقم المبلغ") }
  //   else if (number == null || address.length == 0) { alert("يجب ادخال رقم الحساب") }
  //   else {
  //     this.setState({
  //       isLoading: true
  //     })
  //     const AuthStr = 'Bearer '.concat(this.props.token.token);
  //     axios.get(`http://mascom-cards.vision-building.com/api/complaints?title=${address}&type=complaints&details=${remark}&phone_number=${phoneNumber}`, { headers: { Authorization: AuthStr } })
  //       .then(response => {
  //         console.log(response);
  //         this.setState({
  //           isLoading: false
  //         })
  //         if (response.data.message == "fail") {
  //           if (response.data.data.global.title != null)
  //             alert(response.data.data.global.user)
  //           if (response.data.data.global.type != null)
  //             alert(response.data.data.global.user)
  //           if (response.data.data.global.details != null)
  //             alert(response.data.data.global.user)
  //           if (response.data.data.global.user != null)
  //             alert(response.data.data.global.phone_number)
  //           else alert("Error Try Again!")
  //         } else {
  //           this.props.navigation.navigate('Home');
  //           alert("تم ارسال الرسالة")
  //         }
  //       })
  //       .catch(error => {
  //         this.setState({
  //           isLoading: false
  //         })
  //         console.log(error);
  //         alert(error)
  //       })
  //   }

  // }
  openDrawer = () => {
    this.props.navigation.toggleDrawer();
  }
  closeBottom = () => {
    this.props.updatesta(false);
  }
  render() {
    return (
      <View style={styles.main}>
        <View style={styles.main}>
          <View style={styles.header}>
            <TouchableOpacity style={{ flex: 1, padding: 8, width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 12, marginEnd: 40 }}
            onPress={()=>{this.props.navigation.navigate('profile')}} >
              <View style={{ flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={{ uri: this.props.user.user.image }} style={{ width: 32, height: 32, borderRadius: 16, borderColor: 'white', borderWidth: 1 }} />
                <View style={{ width: '100%', flex: 1, flexDirection: 'column', marginLeft: 10 }} >
                  <Text style={{ ...REGULAR_FONT_SMALL, color: 'white' }}>{this.props.user.user.name}</Text>
                  <Text style={{ ...REGULAR_FONT_SMALL, color: 'white' }}>{this.props.user.user.email}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignSelf: 'center',padding:4 ,width: 16, height: 16, marginEnd: 25, marginTop: 20 }} onPress={() => this.openDrawer()}>
              <Image source={require('../img/main/main_home.png')} style={{ width: 16, height: 16 }} />
            </TouchableOpacity>
          </View>
          <View style={styles.accountHeader}>
            <Text style={{ ...REGULAR_FONT_SMALL, color: 'white', marginBottom: 8 }}>المبلغ الحالي</Text>
            <Text style={{ ...BOLD_FONT_LARGE, color: 'white', marginBottom: 8 }}>{this.props.userCard.data.balance} USD</Text>
            <TouchableHighlight onPress={() => { this.props.navigation.navigate('AccountStatement'); }}>
              <View style={{
                borderRadius: 12, borderWidth: 1, borderColor: 'white', paddingRight: 12, paddingLeft: 12,
                paddingTop: 4, paddingBottom: 3
              }}>
                <Text style={{
                  ...REGULAR_FONT_SMALL, color: 'white'
                }}>كشف حساب</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={{ backgroundColor: GREYCOLOR, width: '100%', height: '13%' }} />
          <ImageBackground source={require('../img/main/card.png')} style={{ width: '92%', height: '50%', marginLeft: '8%', position: 'absolute', top: '26%', borderRadius: 12 }}
            imageStyle={{ borderRadius: 12 }}>
            <View style={{ flex: 1, flexDirection: 'column', marginTop: '3%' }}>
              <View style={{ width: '92%', flexDirection: 'row', height: '12%', alignItems: 'center' }}>
                <Image source={require('../img/logo.png')} style={{ width: 42, height: 42, marginStart: '5%' }} />
                <Text style={{ ...REGULAR_FONT_SMALL, color: 'white', textAlign: 'right', width: '78%' }}>تجارية</Text>
              </View>
              <View style={{ width: '92%', flexDirection: 'row', height: "20%", alignItems: 'center' }}>
                <Text style={{ ...BOLD_FONT_MEDIUM, fontSize: 20, color: 'white', textAlign: 'center', width: '100%' }}>
                  {this.props.userCard.data.code.slice(12, 16)}-{this.props.userCard.data.code.slice(8, 12)}-{this.props.userCard.data.code.slice(4, 8)}-{this.props.userCard.data.code.slice(0, 4)}
                </Text>
              </View>
              <View style={{ width: '92%', flexDirection: 'row', justifyContent: 'space-between', height: '15%', alignItems: 'flex-start', marginTop: '5%' }}>
                <View style={{ flex: 1, flexDirection: 'column', paddingLeft: '5%' }} >

                  <Text style={{ ...REGULAR_FONT_SMALL, color: 'white', textAlign: 'left', }}>التاريخ</Text>

                  <Text style={{ ...REGULAR_FONT_SMALL, color: 'white', textAlign: 'left', }}>{this.props.userCard.data.end_date}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', paddingRight: '5%' }} >

                  <Text style={{ ...REGULAR_FONT_SMALL, color: 'white', textAlign: 'right', }}>الاسم</Text>

                  <Text style={{ ...REGULAR_FONT_SMALL, color: 'white', textAlign: 'right', }}>{this.props.userCard.data.user_name}</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
          <View style={{
            width: '100%', height: "37%", backgroundColor: 'white', borderTopLeftRadius: 30,
            flexDirection:'column',
            borderTopRightRadius: 30,
          }}>
            <Text style={{ ...BOLD_FONT_MEDIUM, width: '100%', color: 'black', textAlign: 'right',paddingRight:16 ,marginTop: 8}}>
              سجل الحساب
          </Text>
          <HomeList orders={this.props.userCard.data.orders}/>
          </View>
          <View style={{ width: '100%', height: '10%', flexDirection: 'row', alignItems: 'center', backgroundColor: MAIN_COLOR }}
          onPress={()=>{
              this.props.navigation.navigate('setting'); 
            }}>
            <TouchableOpacity style={{ flex: 1, flexGrow: 1, flexDirection: 'column', alignItems: 'center' }}>
              <Image source={require('../img/main/home.png')} style={{ width: 24, height: 24 }} />
              <Text style={{ ...BOLD_FONT_SMALL, color: 'white' }}>الرئيسية</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, flexGrow: 1, flexDirection: 'column', alignItems: 'center' }}
            onPress={()=>{
              this.props.navigation.navigate('Notifications'); 
            }}>
              <Image source={require('../img/main/noti.png')} style={{ width: 24, height: 24 }} />
              <Text style={{ ...BOLD_FONT_SMALL, color: 'white' }}>التنبهات</Text>
            </TouchableOpacity>
            <View style={{ flex: 1, flexGrow: 1, flexDirection: 'column', alignItems: 'center' }}>
            </View>
            <TouchableOpacity style={{ flex: 1, flexGrow: 1, flexDirection: 'column', alignItems: 'center' }}
            onPress={()=>{
              this.props.navigation.navigate('MyOrders'); 
            }}>
              <Image source={require('../img/main/order.png')} style={{ width: 24, height: 24 }} />
              <Text style={{ ...BOLD_FONT_SMALL, color: 'white' }}>طلباتي</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, flexGrow: 1, flexDirection: 'column', alignItems: 'center' }}
            onPress={()=>{
              this.props.navigation.navigate('setting'); 
            }}>
              <Image source={require('../img/main/setting.png')} style={{ width: 24, height: 24 }} />
              <Text style={{ ...BOLD_FONT_SMALL, color: 'white' }}>الاعدادات</Text>
            </TouchableOpacity>
          </View>
        </View>
       
        <View style={{ position: 'absolute', top: '87.5%', left: '44%', right: '44%',transform: [{ rotate: '45deg'}],
         bottom: '7%',alignItems: 'center',justifyContent:'center' ,backgroundColor:YELLOWCOLOR,borderColor:'white',borderRadius:5,borderWidth:1}}>
       <Image source={require('../img/main/plus.png')} style={{ width:24,height:24,transform: [{ rotate: '45deg'}]}}/>
        </View>
        <Modal isVisible={this.state.isLoading}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
            <ActivityIndicator style={{ flex: 1 }}
              size="large" color={YELLOWCOLOR} />
          </View>
        </Modal>
        <Modal
          isVisible={this.props.bottomStatus.bottomStatus}
          style={styles.bottomModal}
        >
          <View style={styles.modalContent}>

            {/* 1 */}
            <View style={styles.bottomHeader}>
              <TouchableHighlight style={{ alignSelf: 'center', width: 16, height: 16, marginEnd: 25, marginTop: 20 }}
                onPress={() => { this.closeBottom(true) }}>
                <Image source={require('../img/translate/close.png')} style={{ width: 16, height: 16 }} />
              </TouchableHighlight>
              <TouchableHighlight style={{ flex: 1, padding: 8, width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 10 }} >
                <View style={{ flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ width: '100%', flex: 1, flexDirection: 'column', alignItems: 'flex-end', marginEnd: 8 }} >
                    <Text style={{ ...REGULAR_FONT_SMALL, color: 'black' }}>{this.props.user.user.name}</Text>
                    <Text style={{ ...REGULAR_FONT_SMALL, color: 'black' }}>{this.props.user.user.email}</Text>
                  </View>
                  <Image source={{ uri: this.props.user.user.image }} style={{
                    width: 32, height: 32, borderRadius: 16,
                    borderColor: MAIN_COLOR, borderWidth: 1
                  }} />
                </View>
              </TouchableHighlight>
            </View>

            {/* 2 */}
            <View style={{
              height: 50, flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'flex-end',
              marginEnd: 16, marginTop: 20, alignItems: 'center'
            }}>
              <Text style={{ ...REGULAR_FONT_MEDIUM, marginEnd: 8 }}>رقم الحساب</Text>
              <Image source={require('../img/translate/card_1.png')} style={{ width: 16, height: 16, resizeMode: 'stretch' }} />
            </View>
            {/* 3 */}
            <View style={{
              flex: 1, flexDirection: 'row', backgroundColor: GREYCOLOR, borderRadius: 8, height: 40, marginLeft: 32, marginRight: 32,
              padding: 8, alignItems: 'center', marginTop: 10
            }}>
              <View style={{ flexDirection: 'row', width: 24, height: 24, justifyContent: 'flex-start' }}>
                <Image source={require('../img/translate/blackberry.png')} style={{ width: 24, height: 24 }} />
              </View>
              <View style={{ flexDirection: 'row', width: '100%', marginLeft: 24, justifyContent: 'flex-end' }}>
                <TextInput multiline={false} maxLength={50} value={this.state.number}
                  textContentType='fullStreetAddress' placeholder="" style={styles.textInputStyle}
                  onChangeText={val => {
                    this.setState({
                      number: val
                    })
                  }}
                />
              </View>
            </View>

            {/* 4 */}
            <View style={{
              flex: 1, width: '100%', height: 50, flexDirection: 'row', justifyContent: 'flex-end',
              marginRight: 10, marginTop: 5, alignItems: 'center'
            }}>
              <Text style={{ ...REGULAR_FONT_MEDIUM, marginEnd: 8 }}>المبلغ</Text>
              <Image source={require('../img/translate/money_sq.png')} style={{ width: 16, height: 16, resizeMode: 'stretch' }} />
            </View>

            {/* 5 */}
            <View style={{
              flex: 1, flexDirection: 'row', backgroundColor: GREYCOLOR, borderRadius: 8, height: 40, marginLeft: 8, marginRight: 8,
              padding: 8, alignItems: 'center', marginTop: 5
            }}>
              <View style={{ flexDirection: 'row', flex: 1, flexGrow: 1, justifyContent: 'center' }}>
                <TouchableHighlight onPress={() => {
                  if (parseInt(this.state.money, 10) < 99994)
                    this.setState(prevState => {
                      return { money: (parseInt(prevState.money, 10) + 5).toString() }
                    })
                }}>
                  <Image source={require('../img/translate/add_sq.png')} style={{ width: 24, height: 24 }}
                  />
                </TouchableHighlight>
              </View>
              <View style={{ flexDirection: 'row', flex: 1, flexGrow: 1, justifyContent: 'center' }}>
                <TextInput multiline={false} maxLength={7} value={this.state.money} keyboardType='number-pad'
                  onChangeText={val => {
                    this.setState({
                      money: val
                    })
                  }}
                />
              </View>
              <View style={{ flexDirection: 'row', flex: 1, flexGrow: 1, justifyContent: 'center' }}>
                <TouchableHighlight
                  onPress={() => {
                    if (parseInt(this.state.money, 10) > 5)
                      this.setState(prevState => {
                        return { money: (parseInt(prevState.money, 10) - 5).toString() }
                      })
                  }}>
                  <Image source={require('../img/translate/no_cr.png')}
                    style={{ width: 24, height: 24 }}

                  />
                </TouchableHighlight>
              </View>
            </View>

            {/* 6 */}
            <View style={{
              height: 40, flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'flex-end',
              marginEnd: 32, marginTop: 5, alignItems: 'center'
            }}>
              <Text style={{ ...REGULAR_FONT_MEDIUM, }}>ملاحظات</Text>
              <Image source={require('../img/translate/card_1.png')} style={{ width: 16, height: 16, resizeMode: 'stretch' }} />
            </View>
            {/* 7 */}
            <View style={{
              flex: 1, flexDirection: 'row', backgroundColor: GREYCOLOR, borderRadius: 8, height: 120, marginLeft: 8, marginRight: 8,
              padding: 8, alignItems: 'center', marginTop: 5, justifyContent: "center"
            }}>
              <View style={{ flexDirection: 'row', width: '100%', height: 120, justifyContent: 'flex-end' }}>
                <TextInput multiline={true} maxLength={500} value={this.state.remark} placeholder="اكتب هنا... "
                  textContentType='fullStreetAddress' style={{
                    ...REGULAR_FONT_SMALL,
                    textAlign: 'right',
                    width: '100%',
                    height: 80,
                    paddingTop: 40
                  }}
                  onChangeText={val => {
                    this.setState({
                      remark: val
                    })
                  }}
                />
              </View>
            </View>
            <View style={{
              height: 40, flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'flex-end',
              marginLeft: 8, marginRight: 8, marginTop: 5, alignItems: 'center'
            }}>
              <TouchableOpacity
                onPress={() => { this.sendData() }}
                style={styles.sendButtonStyle}>
                <Text style={styles.sendtextStyle}>ارسل</Text>
              </TouchableOpacity>
            </View>

          </View>
        </Modal>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  sendButtonStyle: {
    width: '100%',
    height: 40,
    padding: 8,
    marginTop: 16,
    backgroundColor: MAIN_COLOR,
    borderRadius: 10,
  },
  sendtextStyle: {
    ...BOLD_FONT_MEDIUM,
    textAlign: 'center',
    color: '#fff'
  },
  textInputStyle: {
    ...REGULAR_FONT_SMALL,
    textAlign: 'right',
    width: '100%',
    height: 30,
  },
  modalContent: {
    flexDirection: 'column',
    backgroundColor: "white",
    height: 600,
    padding: 22,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  accountHeader: {
    flexDirection: 'column',
    height: '28%',
    alignItems: 'center',
    backgroundColor: MAIN_COLOR
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: 10,
    height: '12%',
    backgroundColor: MAIN_COLOR
  },
  bottomHeader: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    backgroundColor: "white"
  },
  headerTitle: {
    ...BOLD_FONT_MEDIUM,
    marginTop: 50,
    color: '#fff'
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: GREYCOLOR,
  },
})
const mapStateToProps = state => {
  return {
    user: state.user,
    token: state.token,
    userCard: state.userCard,
    bottomStatus: state.bottomStatus
  }
};


const mapDispatchToProps = dispatch => ({
  getUserCard: (token) => dispatch(getCard(token)),
  updatesta: (data) => dispatch(updatestatus(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen) 