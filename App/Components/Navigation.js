import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { 
  Pressable, 
  View, 
  Image,
  Text, 
  TextInput, 
  TouchableOpacity,  
  StyleSheet, 
  Button
} from "react-native";
import HomeScreen from '../Screens/HomeScreen';
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import WelcomeScreen from '../Screens/WelcomeScreen';
import CompaniesScreen from '../Screens/CompaniesScreen';
import SplashScreen from '../Screens/SplashScreen';
import { AuthContext } from '../context/AuthContext';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();





const Navigation = () => {
  const { userInfo, splashLoading } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator 
         screenOptions={{
          headerStyle: {
            backgroundColor: '#d1daee',
          },
         }}
      >
       

        <Stack.Screen 
          name="/"
          component={WelcomeScreen}
          options={{ 
            title: 'MFN' 
          }}
        />

        <Stack.Screen 
          name="MAP"
          component={HomeScreen}
        />
        
        <Stack.Screen 
          name="Companies"
          component={CompaniesScreen}
          options={{
            title: 'Companies'
          }}
        />

        <Stack.Screen 
          name="login"
          component={LoginScreen}
        />

        <Stack.Screen 
          name="Register"
          component={RegisterScreen}
        />




        {/* {splashLoading ? (
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
        ) : userInfo.data ? (
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'MAP',
              headerRight: () => {
                <Button title={"LogOut"} 
                  onPress={() => alert("by")}
                />
              }
            }}
          />
        ) : (
          <>
            <Stack.Screen
              name="login"
              component={LoginScreen}
              
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
