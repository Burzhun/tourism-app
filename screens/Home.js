import React from 'react';
import { ImageBackground, StyleSheet, Text, View, Image, Button, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import background from '../assets/background.jpg'; 
import photo1 from '../assets/photo_handshake.jpg'; 
const background_x = 250;

export default function Home({navigation}) {

  const checkUser = async () => {
    try {
      const value = await AsyncStorage.getItem('user_id');
      if (value !== null && value!==undefined) {
        // We have data!!
        navigation.navigate('Select',{user_id:value});
      }
    } catch (error) {
      // Error retrieving data
        console.log(error);
    }
  };
  checkUser();

  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.image} imageStyle={{
    resizeMode: "cover",
    left: background_x, 
    top: 0
  }}>
        <View style={styles.container_form}>
          <View></View>
          <Image source={photo1}  style={styles.small_image} />
          <View style={styles.center_text}>
            <Text style={styles.text1}>Кунак</Text>
            <Text style={styles.text2}>Мы обьединяем народы !</Text>
          </View>
          <View>
            <TouchableOpacity onPress={()=>{navigation.navigate('Login')}} style={styles.login_button}>
                <Text  style={styles.login_button_text}>Вход</Text>
            </TouchableOpacity>
            <View style={styles.register_link_view}>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.login_button_text2}>У вас нет аккаунта ? </Text>
                <TouchableOpacity onPress={()=>{navigation.navigate('Registration')}} ><Text  style={styles.login_button_text3}>Зарегистрироваться</Text></TouchableOpacity>
              </View> 
            </View>
          </View>
        </View>
      </ImageBackground>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get("window").height,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  container_form: {
    flex: 1,
    top:-40,
    height: Dimensions.get("window").height,
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: Dimensions.get("window").width,
    left:background_x
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
    width: Dimensions.get("window").width+background_x,
    left:-background_x
  },
  small_image:{
    flex:0.3,
    resizeMode: 'contain',
    width:'60%',
    borderRadius:55,
    alignSelf:'center'
  },
  text: {
    color: 'grey',
    fontSize: 30,
    fontWeight: 'bold',
  },
  center_text:{
    alignSelf:'center',
    color:'white'
  },
  text1:{
    fontSize:28,
    alignSelf:'center',
    color:'white',
   // fontWeight:'alegreya'
  },
  text2:{
    fontSize:14,
    alignSelf:'center',
    color:'white'
  },
  login_button:{
    width:'80%',
    alignSelf:'center',
    borderRadius:5,
    justifyContent: 'center',
    textAlign:'center',
    backgroundColor:'#5B9485',
    height:40,
  },
  login_button_text:{
    alignSelf:'center',
    textAlign:'center',
    color:'white',
  },
  register_link_view:{
    flexDirection:'row',
    justifyContent: 'space-evenly'
  },
  login_button_text2:{
    alignSelf:'center',
    textAlign:'center',
    color:'white',
    marginTop:15
  },
  login_button_text3:{
    color:'white',
    marginTop:15
  }
});
