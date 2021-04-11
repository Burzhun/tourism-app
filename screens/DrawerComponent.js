// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import 'react-native-gesture-handler';

import * as React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


// Import Custom Sidebar
import CustomSidebarMenu from './CustomSidebarMenu'; 
import Users from './Users'; 
import Messages from './Messages'; 
import Profile from './Profile'; 
import Dialog from './Dialog'; 
import OtherUser from './OtherUser'; 
import Applications from './Applications';
import AddApp from './AddApp';
import Notifications from './Notifications';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

let initial_page='Users';
const NavigationDrawerStructure = (props) => {
  
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };


  

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={toggleDrawer}>
        {/*Donute Button Image */}
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          style={{ width: 25, height: 25, marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
};

function firstScreenStack() {
  return (
    <Stack.Navigator initialRouteName={initial_page}>
      <Stack.Screen
        name="Users"
        component={Users}
        options={{
          title: '', //Set Header Title
          headerLeft: () => null,
          hideStatusBar:true, 

          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
            height:0,
          },
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: '', //Set Header Title
          headerLeft: () => null,
          hideStatusBar:true, 

          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
            height:0,
          },
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <Stack.Screen
        name="Messages"
        component={Messages}
        options={{
          title: '', //Set Header Title
          headerLeft: () => null,
          hideStatusBar:true, 

          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
            height:0,
          },
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <Stack.Screen
        name="Dialog"
        component={Dialog}
        options={{
          title: '', //Set Header Title
          headerLeft: () => null,
          hideStatusBar:true, 

          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
            height:0,
          },
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <Stack.Screen
        name="OtherUser"
        component={OtherUser}
        options={{
          title: '', //Set Header Title
          headerLeft: () => null,
          hideStatusBar:true, 

          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
            height:0,
          },
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <Stack.Screen
        name="Applications"
        component={Applications}
        options={{
          title: '', //Set Header Title
          headerLeft: () => null,
          hideStatusBar:true, 
 
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
            height:0,
          },
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <Stack.Screen
        name="AddApplication"
        component={AddApp}
        options={{
          title: '', //Set Header Title
          headerLeft: () => null,
          hideStatusBar:true, 
 
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
            height:0,
          },
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          title: '', //Set Header Title
          headerLeft: () => null,
          hideStatusBar:true, 
 
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
            height:0,
          },
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
}

function DrawerComponent(props) {
  if(props.route && props.route.params && props.route.params.to_apps){
    initial_page = 'Applications';
  }else initial_page = 'Users';
  return (
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#ffffff',
          itemStyle: { marginVertical: 5 },
          headerMode: 'none'
        }}
        drawerContent={(props2) => <CustomSidebarMenu {...props2} />}>
        <Drawer.Screen
          name='FirstPage'
          options={{ drawerLabel: () => null}}
          component={firstScreenStack}
        />
      </Drawer.Navigator>
  );
}

export default DrawerComponent;
