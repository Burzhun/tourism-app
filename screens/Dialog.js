import * as React from 'react';
import { ImageBackground, StyleSheet,TextInput, Text,Alert,ScrollView,
 View, Image, Button, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
 
import background from '../assets/background.jpg'; 
import photo1 from '../assets/photo_handshake.jpg'; 
import user_icon from '../assets/icon12.png'; 
import Constants from 'expo-constants';
import ham_icon from '../assets/ham_icon.png'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Dialog(props) {
  const [user_id, setUserId] = React.useState([]);
  const [messages, setMessages] = React.useState([]);
  const [text, setText] = React.useState('');

  const other_user_id = props.route.params.other_id;

  async function getMessages(){
    const user_id = await AsyncStorage.getItem('user_id');
    if(!user_id) return;
    setUserId(user_id);
    let url = 'https://kunakd.ru/rest/1/be528ypufcpc4n0b/mobile.message.get/';
    fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json' 
      }
    }).then(r=>r.json()).then(async data=>{
      if(data.result){
        const my_messages = Object.values(data.result).filter(item=>(item.PROPERTY_FROM_VALUE===user_id && item.PROPERTY_TO_VALUE===other_user_id)|| (item.PROPERTY_FROM_VALUE===other_user_id && item.PROPERTY_TO_VALUE===user_id));
        setMessages(my_messages);
      }else{
        Alert.alert(
              "Ошибка",
              data.error_description ? data.error_description : 'Возникла ошибка при загрузке')
      }
    }); 
  }

  async function sendMessage(){
    const user_id = await AsyncStorage.getItem('user_id');
    if(!user_id || !text) return;
    setUserId(user_id);
    let url = 'https://kunakd.ru/rest/1/be528ypufcpc4n0b/mobile.message.add/?';
    url += 'to='+other_user_id;
    url += '&from='+user_id;
    url += '&message='+text;
    fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json' 
      }
    }).then(r=>r.json()).then(async data=>{
      if(data.result){
        setText('');
        getMessages();
      }else{
        Alert.alert(
              "Ошибка",
              data.error_description ? data.error_description : 'Возникла ошибка при загрузке')
      }
    }); 
  }

  React.useEffect(()=>{
    getMessages();
  },[]);
	return (
		<View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#253334','#5B9474','#598F71']}
        style={styles.background}
      />
        <View  style={styles.small_image}>
          <View style={{justifyContent:'center'}}>
            <Image source={photo1} style={{resizeMode:'cover', alignSelf:'center', borderRadius:30, width:50, height:50}} />
            <View style={{flexDirection:'row',justifyContent:'space-between',padding:10}}>
              <TouchableOpacity onPress={()=>{props.navigation.toggleDrawer()}}>
              <Image source={ham_icon} style={{resizeMode:'cover', borderRadius:1, width:25, height:25}} />
              </TouchableOpacity>
              <Text style={{color:'#45FFCE', fontSize:19,top:10}}>Сообщения</Text>
              <Image source={user_icon} style={{resizeMode:'cover', borderRadius:0, width:26, height:38}} />
            </View>
          </View>
        </View> 
      <View>
      <ScrollView style={styles.container_form}>
        <View style={styles.center_text}>
          {messages.map((message,index)=>{
            const alsf = message.PROPERTY_FROM_VALUE===user_id ? 'flex-end' :'flex-start';
            return (
              <TouchableOpacity style={{borderWidth:0, marginBottom:5,alignSelf:alsf, paddingBottom:5,paddingTop:5, backgroundColor:'#339E82'}} key={'user_item'+index} onPress={()=>{}}>
                <View style={{flexDirection:'row',borderRadius:8}}>
                  <Text style={{fontSize:18,paddingLeft:8,paddingRight:8, color:'white'}}>{message.PREVIEW_TEXT}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
      </ScrollView>      
    </View>
    <View style={{flexDirection:'row'}}>
      <TextInput value={text} onChangeText={text1=>setText(text1)} style={{backgroundColor:'white',marginRight:13,marginLeft:13,flex:8,marginBottom:10,height:40,borderRadius:10}} />
      <TouchableOpacity style={{flex:1,top:-8,left:-5}} onPress={()=>sendMessage()}>
        <Image source={{uri:'https://www.searchpng.com/wp-content/uploads/2019/02/Send-Icon-PNG-1.png'}} style={{resizeMode:'cover',flex:1,backgroundColor:'transparent'}} />
      </TouchableOpacity>
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
    padding:3
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
