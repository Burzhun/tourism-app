import * as React from 'react';
import { ImageBackground, StyleSheet,TextInput, Text, View, Image, Button, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import background from '../assets/background.jpg'; 
import photo1 from '../assets/photo_handshake.jpg'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Select({navigation, route}) {
  const user_id = route.params.user_id;


	return (
		<View style={styles.container}>
      <ImageBackground source={background} style={styles.image}>
        <View style={styles.container_form}>
          <View  style={styles.small_image}>
            <View>
              <Image source={photo1} style={{resizeMode:'cover', borderRadius:30, width:50, height:50}} />
              <Text style={{color:'#45FFCE', fontSize:19,top:10}}>Кто вы ?</Text>
            </View>
          </View>
          <View style={styles.center_text}>
          	<TouchableOpacity onPress={()=>{AsyncStorage.setItem('user_type', 'tourist');navigation.navigate('User',{user_id:user_id})}} style={styles.login_button}>
                <Text  style={styles.login_button_text}>Турист</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{AsyncStorage.setItem('user_type', 'guide');navigation.navigate('User',{to_apps:1})}} style={styles.login_button}>
                <Text  style={styles.login_button_text}>Гид</Text>
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
    height: Dimensions.get("window").height,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  small_image:{
    flex:1,
    marginLeft:40,
    justifyContent:'space-around'
  },
  text: {
    color: 'grey',
    fontSize: 30,
    fontWeight: 'bold',
  },
  center_text:{
    alignSelf:'center',
    color:'white',
    flex:2,
    width:Dimensions.get("window").width*0.6
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
    width:'100%',
    alignSelf:'center',
    borderRadius:5,
    justifyContent: 'center',
    textAlign:'center',
    backgroundColor:'#5B9485',
    height:'8%',
    marginBottom:30,
    marginTop:30
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
