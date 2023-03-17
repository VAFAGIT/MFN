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




interface WelcomeScreenProps {
  navigation: NavigationProp<any>;
}

const WelcomeScreen = ({navigation}: WelcomeScreenProps) => {
  // const [ICE, setICE] = useState<string>();
  // const [password, setPassword] = useState<string>();
  const {isLoading} = useContext<any>(AuthContext);
  const img = require('../assets/Bgg.png');

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <Image source={img} style={{width: 300, height: 250, marginBottom: 30}}/>
      <View style={styles.wrapper}>
       

       
        <Pressable
          style={styles.Button}
          onPress={() => navigation.navigate('Register')}
        >
        <Text style={{color: 'white', textAlign: 'center'}}>Join MFN Network</Text>
        </Pressable>

        <Pressable
          style={styles.Button}
          onPress={() => navigation.navigate('MAP')}
        >
        <Text style={{color: 'white', textAlign: 'center'}}>MAP</Text>
        </Pressable>


        
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
        padding: 10,
        marginTop: 20,
    }
});


export default WelcomeScreen;
