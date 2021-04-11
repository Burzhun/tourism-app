import * as React from 'react';
import { ImageBackground, StyleSheet,TextInput, Text,Alert,Platform,
 View, Image, Button, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
 import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTab from './BottomTab'; 

import background from '../assets/background.jpg'; 
import photo1 from '../assets/photo_handshake.jpg'; 
import user_icon from '../assets/icon12.png'; 
import Constants from 'expo-constants';
import ham_icon from '../assets/ham_icon.png'; 
import gunib from '../assets/gunib.jpg'; 

export default function Profile(props) {
	const [user_id, setUserId] = React.useState([]);
	const [image, setImage] = React.useState(null);
	const [name, setName] = React.useState('');
	const [password, setPassword] = React.useState(null);
	const [phone, setPhone] = React.useState(null);
	const [info, setInfo] = React.useState(null);

   const url='https://kunakd.ru/rest/1/be528ypufcpc4n0b/mobile.profile.change/?user_id=';
  	React.useEffect(() => {
	  // Your code here
	  loadUserData();
	}, []);

	const loadUserData = async () => {
	    try {
	      const value = await AsyncStorage.getItem('user_id');
	      console.log('value');
	      if (value !== null) {
	      	setUserId(value);
	        // We have data!!
	        const url2 = 'https://kunakd.ru/rest/1/be528ypufcpc4n0b/mobile.profile.get/?user_id='+value;
	        fetch(url2, {
		      method: 'GET', // *GET, POST, PUT, DELETE, etc.
		      credentials: 'same-origin', // include, *same-origin, omit
		      headers: {
		        'Content-Type': 'application/json'
		      }
		    }).then(r=>r.json()).then(async data=>{
		    	//console.log(data);
		    	if(data.result){
        			setImage('https://kunakd.ru'+data.result.PERSONAL_PHOTO);
        			setName(data.result.NAME);
        			console.log('https://kunakd.ru'+data.result.PERSONAL_PHOTO);

		    	}
		    });
	      }
	    } catch (error) {
	      // Error retrieving data
	        console.log(error);
	    }
    };

  	const pickImage = async () => {
	    let result = await ImagePicker.launchImageLibraryAsync({
	      mediaTypes: ImagePicker.MediaTypeOptions.All,
	      allowsEditing: true,
	      aspect: [4, 3],
	      quality: 1,
	      base64:true
	    });
	  //  console.log(result);
	    savePhoto(result)
	}
  async function savePhoto(data){
    let format='jpg';
    switch(data[0]){
    	case '/': 
    		format = 'jpg';
    		break;
    	case 'i':
    		format = 'png';
    		break;
    	case 'R':
    		format = 'gif';
    		break;
    }

    const name = 'test.'+format;
    fetch(url+user_id, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({photo_name:name, photo:data.base64 })
    }).then(r=>r.json()).then(async data=>{
      if(data.result){
        setImage('https://kunakd.ru'+data.result.PERSONAL_PHOTO);
        console.log('https://kunakd.ru'+data.result.PERSONAL_PHOTO);
      }else{
        Alert.alert(
              "Ошибка",
              data.error_description ? data.error_description : 'Возникла ошибка при загрузке данных')
      }
    });
  }


	return (
		<View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#3C4B4D','#3C4B4D']}
        style={styles.background}
      />
      <View style={styles.container_form}>
        <View  style={styles.small_image}>
      		<ImageBackground source={gunib} style={{position:'absolute',height:'120%',marginTop:-50,top:0,left:0,width:'100%'}} />
          <View style={{justifyContent:'center'}}>
            <Image source={photo1} style={{resizeMode:'cover', alignSelf:'center', borderRadius:30, width:50, height:50}} />
            <View style={{flexDirection:'row',justifyContent:'space-between',padding:10}}>
              <TouchableOpacity onPress={()=>{props.navigation.toggleDrawer()}}>
              <Image source={ham_icon} style={{resizeMode:'cover', borderRadius:1, width:25, height:25}} />
              </TouchableOpacity>
              <Text style={{color:'#45FFCE', fontSize:19,top:10}}>Профиль</Text>
              <Image source={user_icon} style={{resizeMode:'cover', borderRadius:0, width:25, height:35}} />
            </View>
          </View>
        </View>
        <View style={{flex:5}}>
        	<View style={{alignSelf:'center',justifyContent:'center'}}>
		        <TouchableOpacity onPress={()=>{pickImage()}}>
		          {!image ? <Text>Load image</Text> : <Image source={{uri: image}} style={{resizeMode:'cover',marginBottom:30,borderRadius:60,alignSelf:'center',width:120,height:120}} />}
		        </TouchableOpacity>
		        {name!=='' && <Text style={{alignSelf:'center',top:-15,color:'white'}}>@{name}</Text>}
		        <TextInput
			      style={{ height: 40, width:280, borderColor: '#45FFCE',color:'#45FFCE',borderLeftWidth:0,borderBottomWidth:1,borderTopWidth:0,borderRightWidth:0, borderWidth: 1 }}
			      onChangeText={text => setPassword(text)}
			      secureTextEntry={true}
			      placeholder='Изменить пароль:'
			      placeholderTextColor="#45FFCE" 
			      value={password}
			    />
			    <View style={{marginBottom:10}}>
			    <TextInput
			      style={{ height: 40,top:5, width:280, borderColor: '#45FFCE',color:'#45FFCE',borderLeftWidth:0,borderBottomWidth:1,borderTopWidth:0,borderRightWidth:0, borderWidth: 1 }}
			      onChangeText={text => setPhone(text)}
			      placeholder='Изменить номер:'
			      placeholderTextColor="#45FFCE" 
			      value={phone}
			    />
			    </View>
			    <TouchableOpacity onPress={()=>{addUser()}} style={styles.login_button}>
	                <Text  style={styles.login_button_text}>Сохранить</Text>
	            </TouchableOpacity>
	            <TouchableOpacity onPress={()=>{props.navigation.navigate('AddApplication')}} style={styles.login_button}>
	                <Text  style={styles.login_button_text}>Редактировать анкету</Text>
	            </TouchableOpacity>
	        </View>

        </View>
      </View>
      <View style={{position:'absolute',bottom:20,flex:1,width:Dimensions.get("window").width}}>
        <BottomTab nav={props.navigation} />
      </View>
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
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get("window").height+Constants.statusBarHeight,
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
    marginTop:50
  },
  center_text:{
    flex:4,
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
    height:'10%'
  },
  login_button_text:{
    alignSelf:'center',
    textAlign:'center',
    color:'white'
  }
});
