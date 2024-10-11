import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Các màn hình tab khác
import HomeScreen from './HomeScreen'; // Import màn hình HomeScreen
import AddTaskScreen from './AddTaskScreen'; // Import màn hình AddTaskScreen

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Màn hình khởi động đầu tiên (trước khi vào các tab)
const WelcomeScreen = ({ navigation }) => {
  const goToControlTab = () => {
    navigation.navigate('MainTabs'); // Điều hướng đến Tab
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MANAGE YOUR TASK</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor="gray"
      />
      <TouchableOpacity style={styles.button} onPress={goToControlTab}>
        <Text style={styles.buttonText}>GET STARTED ➔</Text>
      </TouchableOpacity>
    </View>
  );
};

// Tạo Tab Navigator chứa các tab màn hình
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'AddTask') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00b4d8',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="AddTask" component={AddTaskScreen} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
};

// App.js chính
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Màn hình đầu tiên */}
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
          options={{ headerShown: false }} // Ẩn tiêu đề màn hình
        />
        {/* Điều hướng sang các tab */}
        <Stack.Screen 
          name="MainTabs" 
          component={MainTabs} 
          options={{ headerShown: false }} // Ẩn tiêu đề màn hình
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8a4af3',
    marginBottom: 40,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: '80%',
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00b4d8',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default App;
