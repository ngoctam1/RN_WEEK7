import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState({});

  const fetchTasks = () => {
    axios.get('https://66ff37092b9aac9c997e8a42.mockapi.io/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error(error));
  };

  const fetchUserData = () => {
    axios.get('https://66ff37092b9aac9c997e8a42.mockapi.io/user/1') // Adjust with your actual user endpoint
      .then(response => setUser(response.data))
      .catch(error => console.error(error));
  };

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
      fetchUserData();
    }, [])
  );

  const renderTask = ({ item }) => (
    <View style={styles.taskContainer}>
      <Ionicons
        name="checkbox-outline"
        size={24}
        color="green"
      />
      <Text style={styles.taskText}>{item.name}</Text>
      <TouchableOpacity>
        <Ionicons name="create" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <Image source={require('./sw.png')} style={styles.avatar} />
          <View>
            <Text style={styles.welcomeText}>Hi Twinkle{user.name}!</Text>
            <Text style={styles.subText}>Have a great day ahead!</Text>
          </View>
        </View>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        placeholderTextColor="gray"
      />
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddTask')}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 14,
    color: 'gray',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: 'white',
    elevation: 3,
  },
  list: {
    paddingBottom: 100,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 25,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  taskText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#00b4d8',
    padding: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;