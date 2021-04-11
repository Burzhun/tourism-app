import * as React from 'react';
import { ImageBackground, StyleSheet,TextInput, Text,Alert,ScrollView,
 View, Image, Button, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import BottomTab from './BottomTab'; 
 
import background from '../assets/background.jpg'; 
import photo1 from '../assets/photo_handshake.jpg'; 
import user_icon from '../assets/icon12.png'; 
import Constants from 'expo-constants';
import ham_icon from '../assets/ham_icon.png'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import gunib from '../assets/gunib.jpg'; 

export default function Messages(props) {
  const [users, setUsers] = React.useState([]);
  const [messages, setMessages] = React.useState([]);
  const [lastMessages, setLastMessages] = React.useState({});

  async function getMessages(){
    const user_id = await AsyncStorage.getItem('user_id');
    if(!user_id) return;
    const url = 'https://kunakd.ru/rest/1/be528ypufcpc4n0b/mobile.message.get/';
    fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json' 
      }
    }).then(r=>r.json()).then(async data=>{
      if(data.result){
        const my_messages = Object.values(data.result).filter(item=>item.PROPERTY_FROM_VALUE===user_id || item.PROPERTY_TO_VALUE===user_id);
        let l_messages = {};
        my_messages.forEach(m=>{
          l_messages[m.PROPERTY_TO_VALUE===user_id ? m.PROPERTY_FROM_VALUE : m.PROPERTY_TO_VALUE] = m;
        });
        Object.keys(l_messages).forEach(u_id=>{
          const url2 = 'https://kunakd.ru/rest/1/be528ypufcpc4n0b/mobile.profile.get/?user_id='+u_id;
          fetch(url2, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(r=>r.json()).then(async data=>{
            if(data.result && !l_messages[u_id].user_name){
              l_messages[u_id].image = 'https://kunakd.ru'+data.result.PERSONAL_PHOTO;
              l_messages[u_id].user_name = data.result.NAME;
              setLastMessages({...l_messages});
            }
          });
        })
        //setLastMessages(l_messages);
      }else{
        Alert.alert(
              "Ошибка",
              data.error_description ? data.error_description : 'Возникла ошибка при загрузке')
      }
    }); 
  }
        //console.log(lastMessages);
  React.useEffect(()=>{
    getMessages();
  },[]);
  React.useEffect(()=>{
    console.log('update')
            //  console.log(Object.values(lastMessages));
  },[lastMessages]);
	return (
		<View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#253334','#5B9474','#598F71']}
        style={styles.background}
      />
      <ScrollView style={styles.container_form}>
        <View  style={styles.small_image}>
          <ImageBackground source={gunib} style={{position:'absolute',height:'120%',marginTop:-50,top:0,left:0,width:'100%'}} />
          <View style={{justifyContent:'center'}}>
            <Image source={photo1} style={{resizeMode:'cover', alignSelf:'center', borderRadius:30, width:50, height:50}} />
            <View style={{flexDirection:'row',justifyContent:'space-between',padding:10}}>
              <TouchableOpacity onPress={()=>{props.navigation.toggleDrawer()}}>
              <Image source={ham_icon} style={{resizeMode:'cover', borderRadius:1, width:25, height:25}} />
              </TouchableOpacity>
              <Text style={{color:'#45FFCE', fontSize:19,top:10}}>Сообщения</Text>
              <TouchableOpacity onPress={()=>{props.navigation.navigate('Profile')}}>
                <Image source={user_icon} style={{resizeMode:'cover', borderRadius:0, width:26, height:38}} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.center_text}>
          {Object.keys(lastMessages).map((other_user_id,index)=>{
            const message = lastMessages[other_user_id];
            return (
              <TouchableOpacity style={{borderWidth:0, marginBottom:5, paddingBottom:5,paddingTop:5}} key={'user_item'+index} onPress={()=>{props.navigation.navigate('Dialog',{other_id:other_user_id})}}>
                <View style={{flexDirection:'row'}}>
                  <Image source={message.image ? {uri:message.image} : user_icon} style={{resizeMode:'cover', borderRadius:30, width:30, height:45}} />
                  <View style={{flexDirection:'row',borderBottomWidth:1,borderColor:'#59D0B1',width:300}}>

                    <View style={{flexDirection:'column'}}>
                      <Text style={{fontSize:18, color:'white', top:-7,left:10, color:'#BDC6B1'}}>@{message.user_name}</Text>
                      <Text style={{fontSize:18, color:'white',left:10, color:'#7A7A7A'}}>{message.PREVIEW_TEXT}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
      </ScrollView>
      <View style={{position:'absolute',bottom:20,flex:1,width:Dimensions.get("window").width}}>
        <BottomTab nav={props.navigation} />
      </View>
    </View>
	)

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow:'hidden',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get("window").height+Constants.statusBarHeight,
  },
  container_form: {
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  small_image:{
    flex:1,
    marginTop:50
  },
  center_text:{
    flex:3,
    paddingLeft:25,
    paddingRight:25,
    marginTop:20,
    marginBottom:20
  }
});
