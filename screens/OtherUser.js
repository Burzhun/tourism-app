import * as React from 'react';
import { ImageBackground, StyleSheet,TextInput, Text,Alert,Platform,ScrollView,
 View, Image, Button, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
 import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import MapView from 'react-native-maps';
import background from '../assets/background.jpg'; 
import photo1 from '../assets/photo_handshake.jpg'; 
import user_icon from '../assets/icon12.png'; 
import Constants from 'expo-constants';
import ham_icon from '../assets/ham_icon.png'; 
import gunib from '../assets/gunib.jpg';  

export default function OtherUser(props) {
	const [image, setImage] = React.useState(null);
	const [name, setName] = React.useState('');
	const [password, setPassword] = React.useState(null);
  const [text, setText] = React.useState(null);
	const [phone, setPhone] = React.useState(null);
	const [info, setInfo] = React.useState(null);

  const user_id = props.route.params.user_id;
   const url='https://kunakd.ru/rest/1/be528ypufcpc4n0b/mobile.profile.change/?user_id=';
  	React.useEffect(() => {
	  // Your code here
	  loadUserData();
    getData();
	}, []);

	const loadUserData = async () => {
      // We have data!!
      const url2 = 'https://kunakd.ru/rest/1/be528ypufcpc4n0b/mobile.profile.get/?user_id='+user_id;
      fetch(url2, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(r=>r.json()).then(async data=>{
    	if(data.result){
          console.log('data.result12');
    			console.log(data.result);
          setImage('https://kunakd.ru'+data.result.PERSONAL_PHOTO);
          setName(data.result.NAME);
    		//	setText(data.result.PREVIEW_TEXT);

    	}
    });
    };

  	
  async function getData(){
    const url = 'https://kunakd.ru/rest/1/be528ypufcpc4n0b/mobile.ankety.get/?user_id='+user_id;
    fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(r=>r.json()).then(async data=>{
      if(data.result){
        try {
          console.log('data.result3');
          console.log(data.result);
          setText(Object.values(data.result)[0].PREVIEW_TEXT);
          //setImage('https://kunakd.ru'+Object.values(data.result)[0].PERSONAL_PHOTO);
         // setName(Object.values(data.result)[0].NAME); 
        //  setText(data.result.PREVIEW_TEXT);
        } catch (e) {
            //Alert.alert("Ошибка","Возникла ошибка при загрузке данных")
        }
      }else{
        Alert.alert(
              "Ошибка",
              data.error_description ? data.error_description : 'Возникла ошибка при загрузке данных')
      }
    });
  }

  async function sendApplication(){
    let url = 'https://kunakd.ru/rest/1/be528ypufcpc4n0b/mobile.zayavka.add/?to='+user_id+'&from=';
    const value = await AsyncStorage.getItem('user_id');
    if (value !== null) {
      url += value;
      fetch(url, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(r=>r.json()).then(async data=>{
          //console.log(data);
          if(data.result){
            Alert.alert('Заявка отправлена');
          }
        });
    }
  }
 

	return (
		<View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#3C4B4D','#3C4B4D']}
        style={styles.background}
      />
      <ScrollView  contentContainerStyle={{flexGrow:1}} style={styles.container_form}>
        <View  style={styles.small_image}>
          <ImageBackground source={gunib} style={{position:'absolute',height:'120%',marginTop:-50,top:0,left:0,width:'100%'}} />
          <View style={{justifyContent:'center'}}>
            <Image source={photo1} style={{resizeMode:'cover', alignSelf:'center', borderRadius:30, width:50, height:50}} />
            <View style={{flexDirection:'row',justifyContent:'space-between',padding:10}}>
              <TouchableOpacity onPress={()=>{props.navigation.toggleDrawer()}}>
              <Image source={ham_icon} style={{resizeMode:'cover', borderRadius:1, width:25, height:25}} />
              </TouchableOpacity>
              <Text style={{color:'#45FFCE', fontSize:19,top:10}}>Профиль</Text>
              <TouchableOpacity onPress={()=>{props.navigation.navigate('Profile')}}>
                <Image source={user_icon} style={{resizeMode:'cover', borderRadius:0, width:26, height:38}} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{flex:6}}>
        	<View style={{alignSelf:'center',justifyContent:'center'}}>
		        {!image ? <Text></Text> : <Image source={{uri: image}} style={{resizeMode:'cover',marginBottom:30,borderRadius:60,alignSelf:'center',width:120,height:120}} />}
		        {name!=='' && <Text style={{alignSelf:'center',top:-15,color:'white'}}>@{name}</Text>}
  			    <View style={{marginBottom:10}}>
              <Text>{phone}</Text>
    			    <Text style={{color:'white',padding:10,overflow:'hidden'}}>{text}</Text>
              {false && <div 
                style={styles.map} 
                region={{
                  latitude: 42.069170,
                  longitude: 48.295830,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              />}
            </View>
	        </View>
          <TouchableOpacity onPress={()=>{props.navigation.navigate('Dialog',{other_id:user_id})}} style={styles.login_button}>
            <Text  style={styles.login_button_text}>Написать сообщение</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{sendApplication()}} style={styles.login_button}>
            <Text  style={styles.login_button_text}>Оставить заявку</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
    </View>
	)

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow:'hidden',
    height: Dimensions.get("window").height,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width*0.8,
    alignSelf:'center',
    height: 80,
    top:20,
    marginTop:60
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get("window").height+Constants.statusBarHeight,
  },
  container_form: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  small_image:{
    flex:0.1,
    marginTop:50
  },
  center_text:{
    flex:8,
    paddingLeft:25,
    paddingRight:25,
  },
  login_button:{
    width:280,
    top:30,
    marginTop:20,
    alignSelf:'center',
    borderRadius:15,
    justifyContent: 'center',
    textAlign:'center',
    backgroundColor:'#5B9485',
    height:'15%'
  },
  login_button_text:{
    alignSelf:'center',
    textAlign:'center',
    color:'white'
  }
});
