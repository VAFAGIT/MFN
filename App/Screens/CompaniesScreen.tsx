import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';
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
      <Text style={styles.info}>ICE: {user.ICE}</Text>
      <Text style={styles.info}>Author: {user.author}</Text>
     
    </View>
  );
};

const CompanyList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [searchResult, setSearchResult] = useState<User[]>([]);

  useEffect(() => {
    async function loadUsers(){
        try {
            const response = await axios.get('http://192.168.9.71:5000/api/auth/users');
            setUsers(response.data.data);
            setSearchResult(response.data.data)
        }
        catch (error) {
            console.log(error)
        }
    }
    loadUsers();   
    } , []);

    function searchUsers(query:any){
      if(query === ''){
        setSearchText(query)
        setSearchResult(users)
      }else{
        setSearchText(query)
        const filteredUsers = users.filter((user:any) => user.name.toLowerCase().includes(query.toLowerCase()))
        setSearchResult(filteredUsers)
      }
      
    }

  return (
    <>
          <TextInput
        style={styles.input}
        onChangeText={text => searchUsers(text)}
        value={searchText}
        placeholder="Search..."
      />


    
    <FlatList
      data={searchResult}
      renderItem={({ item }) => <CompanyCard user={item} />}
      keyExtractor={(item:any) => item._id}
    />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
    // shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  info: {
    fontSize: 10,
    marginBottom: 8,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default CompanyList;
