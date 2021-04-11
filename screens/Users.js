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
import gunib from '../assets/gunib.jpg'; 

export default function Users(props) {
  const [users, setUsers] = React.useState([]);
  const [images, setImages] = React.useState({});

  async function getUsers(){
    if(users.length) return;
    const url = 'https://kunakd.ru/rest/1/be528ypufcpc4n0b/mobile.ankety.get/';
    fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(r=>r.json()).then(async data=>{
      if(data.result){
        try {
          const users = Object.values(data.result).map(t=>{return {name:t.NAME, text:t.PREVIEW_TEXT, id:t.ID,user_id:t.PROPERTY_USER_ID_VALUE}; });
          setUsers(users);
          let links = {};
          users.forEach(user=>{
            const url2 = 'https://kunakd.ru/rest/1/be528ypufcpc4n0b/mobile.profile.get/?user_id='+user.user_id;
            fetch(url2, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(r=>r.json()).then(async data=>{
            //console.log(data);
            if(data.result && data.result.PERSONAL_PHOTO){
                links[user.id]='https://kunakd.ru'+data.result.PERSONAL_PHOTO;
                setImages(links);
                console.log('links');
                console.log(links);
            }
          });
          })
        } catch (e) {
            Alert.alert(
              "Ошибка",
              "Возникла ошибка при регистрации")
        }
      }else{
        Alert.alert(
              "Ошибка",
              data.error_description ? data.error_description : 'Возникла ошибка при регистрации')
      }
    });
  }

  React.useEffect(()=>{
    getUsers();
  },[]);
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
              <Text style={{color:'#45FFCE', fontSize:19,top:10}}>Анкеты</Text>
              <TouchableOpacity onPress={()=>{props.navigation.navigate('Profile')}}>
                <Image source={user_icon} style={{resizeMode:'cover', borderRadius:0, width:26, height:38}} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.center_text}>
          {users.map((user,index)=>{
            return (
              <TouchableOpacity style={{borderWidth:0, marginBottom:5, paddingBottom:5,paddingTop:5, backgroundColor:'#339E82'}} key={'user_item'+index} 
                onPress={()=>{props.navigation.navigate('OtherUser',{user_id:user.id})}}>
                <View style={{flexDirection:'row'}}>
                  <View style={{flexDirection:'column'}}>
                    <Image source={images[user.id] ? {uri: images[user.id]} : user_icon} style={{resizeMode:'cover', borderRadius:10, width:40, height:40,margin:5}} />
                    <Text>Жилье</Text>
                    <Text>Авто</Text>
                  </View>
                  <View style={{flexDirection:'column'}}>
                    <Text style={{maxWidth:50, height:30}}>{user.name}</Text>
                    <Text>25</Text>
                    <Text>Да</Text>
                    <Text>Да</Text>
                  </View>
                  <View style={{flexDirection:'column',flex:1}}>
                      <Text  style={{alignSelf:'center',color:'#BDC6B1'}}>О себе:</Text>
                      <Text style={{fontSize:18,color:'black', maxHeight:90,marginLeft:10}}>{user.text}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
        <View style={{marginBottom:20}}></View>
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
    marginBottom:20
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
