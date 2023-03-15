import React, { useState, useEffect, useContext } from "react";
import { LocationObject, requestForegroundPermissionsAsync, getCurrentPositionAsync } from "expo-location";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../context/AuthContext";
import * as Location from "expo-location";

import {
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Pressable 
} from 'react-native';

const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const [name, setName] = useState<string>("");
  const [ICE, setICE] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const imgj = require("../assets/ff.png");
  const [location, setLocation] = useState<LocationObject>();
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    (async () => {
      let { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location1 = await getCurrentPositionAsync({});
      setLocation(location1);
      setLatitude(location1.coords.latitude);
      setLongitude(location1.coords.longitude);
      // console.log("latitude    ",location.coords.latitude," longitude ",location.coords.longitude)
    })();
  }, []);

  const { isLoading, register, errorMessage } = useContext<any>(AuthContext);

  return location ? (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <Image source={imgj} style={{ width: 200, height: 150, marginBottom: 40 }} />
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          value={name}
          placeholder="Campany"
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          value={latitude.toString()}
          placeholder="latitude"
          onChangeText={(text) => setLatitude(Number(text))}
        />
        <TextInput
          style={styles.input}
          value={longitude.toString()}
          placeholder="longitude"
          onChangeText={(text) => setLongitude(Number(text))}
        />
        <TextInput
          style={styles.input}
          value={ICE}
          placeholder="ICE"
          onChangeText={(text) => setICE(text)}
        />
        <TextInput
          style={styles.input}
          value={author}
          placeholder="Author"
          onChangeText={(text) => setAuthor(text)}
        />
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        <Pressable
          style={styles.Button}
          onPress={() => {
            register(name, ICE, author, password, latitude, longitude);
            navigation.navigate('MAP');
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Register</Text>
        </Pressable>

        <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "center" }}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("login")}>
            <Text style={styles.link}>Login</Text>
            {errorMessage && <Text>{errorMessage}</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  ) : (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    wrapper: {
      width: '80%',
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

export default RegisterScreen;
