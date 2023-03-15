import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, LatLng } from "react-native-maps";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
// import Icon from 'react-native-vector-icons/Ionicons';



interface User {
  _id: string;
  name: string;
  latitude: number;
  longitude: number;
}

const App: React.FC = () => {
  const [Users, setUsers] = useState<User[] | null>(null);
  const { logout } = useContext<any>(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await axios.get(
          "http://192.168.9.71:5000/api/auth/users"
        );
        setUsers(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    loadUsers();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 32.3123,
          longitude: -9.2311,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* <Marker
                coordinate={{ latitude: 32.2931003, longitude: -9.2349777 }}
                title="TEST"
            /> */}

        {Users &&
          Users.map((User) => (
            <Marker
              key={User._id}
              coordinate={{
                latitude: Number(User.latitude),
                longitude: Number(User.longitude),
              }}
              title={User.name}
            />
          ))}
      </MapView>
      <TouchableOpacity
        onPress={() => navigation.navigate('Companies')}
        style={{
            marginBottom: 50,
            padding: 10,
            width: "100%",
         
        }}
      >
      {/* <Icon name="company-icon-name" size={10} color="#000" /> */}

        <Text
            style={styles.Text}
        >
            List Of companies
        </Text>
            </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  Button: {
    marginEnd: 10,
    backgroundColor: "#8687b5",
    padding: 10,
    width: "100%",
    marginTop: 50,
    marginLeft: 1,
  },
  Text: {
        color: "#000",
        textAlign: "center",
        fontSize: 15,
  }
});

export default App;
