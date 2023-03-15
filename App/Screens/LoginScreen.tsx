import React, { useState, useContext } from 'react';
import { 
    Pressable, 
    View, 
    Image,
    Text, 
    TextInput, 
    TouchableOpacity,  
    StyleSheet 
} from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import { NavigationProp } from '@react-navigation/native';


interface LoginScreenProps {
  navigation: NavigationProp<any>;
}

const LoginScreen = ({navigation}: LoginScreenProps) => {
  const [ICE, setICE] = useState<string>();
  const [password, setPassword] = useState<string>();
  const {isLoading, login} = useContext<any>(AuthContext);
  const img = require('../assets/register.png');

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <Image source={img} style={{width: 150, height: 150, marginBottom: 30}}/>
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          value={ICE}
          placeholder="Enter ICE"
          onChangeText={(text) => setICE(text)}
        />

        <TextInput
          style={styles.input}
          value={password}
          placeholder="Enter Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />

        <Pressable
          style={styles.Button}
          onPress={() => login(ICE, password)}
        >
          <Text style={{color: 'white', textAlign: 'center'}}>Login</Text>
        </Pressable>

        <View style={{flexDirection: 'row', marginTop: 20, justifyContent:"center"}}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        width:'80%',
        marginBottom: 20,
    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 100,
        paddingHorizontal: 20,
      
    },
    link: {
        color: '#8687b5',
    },
    Button: {
        borderRadius: 200,
        backgroundColor: '#8687b5',
        padding: 10
    }
});


export default LoginScreen;
