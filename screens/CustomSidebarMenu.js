// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,TouchableOpacity,
  Linking,Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import user_icon from '../assets/icon12.png'; 

const CustomSidebarMenu = (props) => {
  const [image, setImage] = React.useState(null);
  const [name, setName] = React.useState('');

  React.useEffect(()=>{
    loadUserData();
  },[]);

  const loadUserData = async () => {
      try {
        const value = await AsyncStorage.getItem('user_id');
        if (value !== null) {
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

          }
        });
        }
      } catch (error) {
        // Error retrieving data
          console.log(error);
      }
    };

  const BASE_PATH =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
  const proileImage = 'react_logo.png';
  const names = ['Profile', 'Users','Messages', 'Applications','Help','Support']
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/*Top Large Image */}
      <LinearGradient
        // Background Linear Gradient
        colors={['#253334','#5B9474','#598F71']}
        style={styles.background}  
      />
      <DrawerContentScrollView {...props}>
        <Image source={image ? {uri: image} : user_icon} style={{resizeMode:'cover', alignSelf:'center', borderRadius:34, width:68, height:68,margin:5}} />
        <Text style={{alignSelf:'center', color:'white',marginBottom:20}}>@{name}</Text>
        {['Профиль','Анкеты','Сообщения', 'Заявки', 'Помощь туристам', 'Закладки', 'Поддержка'].map((item,i)=>(
          <View key={'somekey1'+item} style={styles.customItem}>
            <TouchableOpacity onPress={()=>props.navigation.navigate(names[i])}>
            <Text style={styles.customItemText}>
              {item} 
            </Text>
            </TouchableOpacity>
          </View>
        ))}
        
      </DrawerContentScrollView>
      <Text style={{ fontSize: 16, textAlign: 'center', color: 'grey' }}>
        www.aboutreact.com
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get("window").height+Constants.statusBarHeight,
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    fontSize:18,
    borderBottomWidth:1
  },
  customItemText:{
    color:'white',

  }
});

export default CustomSidebarMenu;
