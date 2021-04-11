import * as React from 'react';
import { ImageBackground, StyleSheet,TextInput, Text,Alert,ScrollView,
 View, Image, Button, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import new_ank from '../assets/new_ank.png';
import profile from '../assets/profile.png';
import messages from '../assets/messages.png';
import users from '../assets/users.png';
import home from '../assets/home.png';

export default function BottomTab({nav}){
	const img_style = {
		height:60,
		width:60,
		top:20
	}

	const back_styles={
	    left: 0,
	    right: 0,
	    top: 20,
	    position:'absolute',
	    height:60
	  };

	return (
		<View style={{flexDirection:'row', justifyContent:'space-evenly',flex:1}}>
			<LinearGradient
		        // Background Linear Gradient
		        colors={['#344642','#3d816f']}
		        style={back_styles}
		      />
		    <TouchableOpacity  onPress={()=>{nav.navigate('Notifications')}}> 
			<Image style={img_style}  source={home} />
		     </TouchableOpacity>
		     <TouchableOpacity  onPress={()=>{nav.navigate('Users')}}>
			<Image  style={img_style} source={users} />
		     </TouchableOpacity >
		     <TouchableOpacity onPress={()=>{nav.navigate('AddApplication')}} >
			<Image  style={img_style} source={new_ank} />
		     </TouchableOpacity >
		     <TouchableOpacity  onPress={()=>{nav.navigate('Messages')}}>
			<Image  style={img_style} source={messages} />
		     </TouchableOpacity >
		     <TouchableOpacity  onPress={()=>{nav.navigate('Profile')}}>
			<Image  style={img_style} source={profile} />
		     </TouchableOpacity >
		</View>
	)
	
}