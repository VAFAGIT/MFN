import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  ICE: string;
  author: string;
}

const CompanyCard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{user.name}</Text>
      <Text style={styles.info}>{user.ICE}</Text>
      <Text style={styles.info}>{user.author}</Text>
     
    </View>
  );
};

const CompanyList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function loadUsers(){
        try {
            const response = await axios.get('http://192.168.9.71:5000/api/auth/users');
            setUsers(response.data.data);
        }
        catch (error) {
            console.log(error)
        }
    }
    loadUsers();
    }, []);

  return (
    <FlatList
      data={users}
      renderItem={({ item }) => <CompanyCard user={item} />}
      keyExtractor={(item:any) => item._id}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default CompanyList;
