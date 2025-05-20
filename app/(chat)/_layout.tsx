import { MaterialCommunityIcons } from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from "expo-router";
import React from "react";

const ChatLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="chats"
        options={{
          title: "Chats",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chat" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: "Groups",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="groups" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default ChatLayout;
