import * as React from 'react';
import { ImageBackground, StyleSheet,TextInput, Text,Alert,
 View, Image, Button, TouchableOpacity, Dimensions } from 'react-native';
import DrawerComponent from './DrawerComponent';
import Users from './Users';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Profile from './Profile';
import {useRoute} from '@react-navigation/native';
import { NavigationState } from '@react-navigation/native';

 export default function Drawer(props){
 	const comps = {
 		'Users':Users,
 		'Profile':Profile
 	}
 	return (
		<DrawerComponent navigation={props.navigation} comp={Users} />
	);
 }