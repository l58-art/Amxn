import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const ChatListScreen = ({ navigation }) => {
  const [chats] = useState([
    { id: '1', name: 'John Doe', lastMessage: 'Hey, how are you?', time: '2:30 PM' },
    { id: '2', name: 'Jane Smith', lastMessage: 'See you tomorrow!', time: '1:15 PM' },
    { id: '3', name: 'Team Group', lastMessage: 'Meeting at 3 PM', time: '12:00 PM' },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Messages</Text>
      </View>
      <FlatList
        data={chats}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.chatItem}
            onPress={() => navigation.navigate('Chat', { chat: item })}
          >
            <View style={styles.chatItemContent}>
              <Text style={styles.chatName}>{item.name}</Text>
              <Text style={styles.chatPreview}>{item.lastMessage}</Text>
            </View>
            <Text style={styles.chatTime}>{item.time}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hey, how are you?', sender: 'other', time: '2:25 PM' },
    { id: '2', text: 'I\u0027m doing great! How about you?', sender: 'user', time: '2:26 PM' },
    { id: '3', text: 'All good here too!', sender: 'other', time: '2:30 PM' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const { chat } = route.params;

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: String(messages.length + 1),
        text: newMessage,
        sender: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setNewMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chatHeader}>
        <Text style={styles.chatHeaderName}>{chat.name}</Text>
      </View>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.sender === 'user' ? styles.userMessage : styles.otherMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.messageTime}>{item.time}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={setNewMessage}
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Settings</Text>
      </View>
      <View style={styles.settingsContent}>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Privacy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#ccc',
          headerShown: false,
        }}
      >
        <Tab.Screen name="Chats" component={ChatListScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} options={{ tabBarButton: () => null }} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  chatHeader: {
    backgroundColor: '#007AFF',
    padding: 15,
    alignItems: 'center',
  },
  chatHeaderName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  chatItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    justifyContent: 'space-between',
  },
  chatItemContent: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  chatPreview: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  chatTime: {
    fontSize: 12,
    color: '#999',
  },
  messageBubble: {
    margin: 10,
    padding: 12,
    borderRadius: 15,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#eee',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  messageTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  settingsContent: {
    padding: 20,
  },
  settingItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingText: {
    fontSize: 16,
    color: '#000',
  },
});