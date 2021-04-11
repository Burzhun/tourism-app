import * as React from 'react';
import { View, Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Registration from './screens/Registration';
import Login from './screens/Login';
import Select from './screens/Select';
import Users from './screens/Users';
import DrawerComponent from './screens/DrawerComponent';
import Drawer from './screens/Drawer';

const Stack = createStackNavigator();

export default function App() {
  const show_menu = Platform.OS !== 'android';
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: show_menu }}/>
        <Stack.Screen name="Registration" component={Registration} options={{ headerShown: show_menu  }}/>
        <Stack.Screen name="Select" component={Select} options={{ headerShown: show_menu  }}/>
      
        <Stack.Screen name="User" component={Drawer} options={{ headerShown: show_menu  }} />
        <Stack.Screen name="Profile" component={Drawer} options={{ headerShown: show_menu  }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


