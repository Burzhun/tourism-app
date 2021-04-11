import * as React from 'react';
import { ImageBackground, StyleSheet,TextInput, Text,Alert, 
	View, Image, Button, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import background from '../assets/background.jpg'; 
import photo1 from '../assets/photo_handshake.jpg'; 
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
const background_x = 50;

export default function Login({navigation, route}) {
  	const [email, setEmail] = React.useState('');
  	const [password, setPassword] = React.useState('');

  	function checkUser(){
  		const url = 'https://kunakd.ru/rest/1/be528ypufcpc4n0b/mobile.user.isset/';
		const data = {
			login:email,
			pass:password
		}
		fetch(url, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(data) 
		}).then(r=>r.json()).then(async data=>{
			if(data.result){
				try {
				    await AsyncStorage.setItem('user_id', data.result)
				    navigation.navigate('Select');
				} catch (e) {
				    Alert.alert(
				      "Ошибка",
				      "Возникла ошибка при входе на сайт")
				}
			}else{
				Alert.alert(
				      "Ошибка",
				      "Вы ввели нправильный логин или пароль")
			}
		});
  	}

	return (
	<View style={styles.container}>
      <ImageBackground source={background} style={styles.image} imageStyle={{
    resizeMode: "cover",
    left: background_x, 
    top: 0
  }}>
        <View style={styles.container_form}>
          <View  style={styles.small_image}>
          <Image source={photo1} style={{resizeMode:'cover', borderRadius:30, width:50, height:50}} />
          <Text style={{color:'#45FFCE', fontSize:19,top:10}}>Вход</Text>
          </View>
          <View style={styles.center_text}>
          	<TextInput
		      style={{ height: 40, width:280, borderColor: '#45FFCE',color:'#45FFCE',borderLeftWidth:0,borderBottomWidth:1,borderTopWidth:0,borderRightWidth:0, borderWidth: 1 }}
		      onChangeText={text => setEmail(text)}
		      placeholder='Email Address'
		      placeholderTextColor="#45FFCE" 
		      value={email}
		    />
		    <TextInput
		      style={{ height: 40, width:280, borderColor: '#45FFCE',color:'#45FFCE',borderLeftWidth:0,borderBottomWidth:1,borderTopWidth:0,borderRightWidth:0, borderWidth: 1 }}
		      onChangeText={text => setPassword(text)}
		      placeholder='Password'
		      placeholderTextColor="#45FFCE" 
		      value={password}
		    />
          </View>
          <View>
            <TouchableOpacity onPress={()=>{checkUser()}} style={styles.login_button}>
                <Text  style={styles.login_button_text}>Вход</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      
    </View>
	)

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
    height:100,
    top:10,
    height: Dimensions.get("window").height,
    flexDirection: 'column',
    left:background_x,
    width: Dimensions.get("window").width,
    justifyContent: 'space-around',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: Dimensions.get("window").width+background_x,
    justifyContent: 'center',
    left:-background_x
  },
  small_image:{
    flex:0.2,
    marginLeft:40,
    justifyContent:'flex-start'
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
    height:'25%'
  },
  login_button_text:{
    alignSelf:'center',
    textAlign:'center',
    color:'white'
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
    top:15
  }
});
