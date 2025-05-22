import Ionicons from "@expo/vector-icons/Ionicons";
import * as Haptics from 'expo-haptics';
import { Link } from "expo-router";
import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
    
        <View className="flex-1 items-center justify-center">
          <Image
            source={require("@/assets/images/icon.png")}
            className="w-72 h-72 mb-8"
            resizeMode="contain"
          />
          <Text className="text-2xl font-bold text-center mb-2">
            Connect with Friends
          </Text>
          <Text className="text-gray-500 text-center mb-8">
            Chat, share moments, and stay connected with your loved ones
          </Text>

          <View className="w-full space-y-4 mb-8">
            <View className="flex-row items-center bg-gray-50 p-4 rounded-2xl">
              <View className="bg-blue-100 p-3 rounded-xl mr-4">
                <Ionicons name="chatbubbles-outline" size={24} color="#3b82f6" />
              </View>
              <View>
                <Text className="font-semibold text-lg">Real-time Chat</Text>
                <Text className="text-gray-500">Instant messaging with friends</Text>
              </View>
            </View>

            <View className="flex-row items-center bg-gray-50 p-4 rounded-2xl">
              <View className="bg-purple-100 p-3 rounded-xl mr-4">
                <Ionicons name="images-outline" size={24} color="#a855f7" />
              </View>
              <View>
                <Text className="font-semibold text-lg">Share Media</Text>
                <Text className="text-gray-500">Share photos and videos easily</Text>
              </View>
            </View>

            <View className="flex-row items-center bg-gray-50 p-4 rounded-2xl">
              <View className="bg-green-100 p-3 rounded-xl mr-4">
                <Ionicons name="people-outline" size={24} color="#22c55e" />
              </View>
              <View>
                <Text className="font-semibold text-lg">Group Chats</Text>
                <Text className="text-gray-500">Create and join group conversations</Text>
              </View>
            </View>
          </View>

          <View className="w-full space-y-4 gap-2">
            <Link href="/(chat)/chats" asChild>
              <TouchableOpacity className="bg-blue-500 py-4 rounded-2xl">
                <Text className="text-white text-center font-semibold text-lg">
                  Get Started
                </Text>
              </TouchableOpacity>
            </Link>
            <Link href="/(auth)/register" asChild>
              <TouchableOpacity className="border border-blue-500 py-4 rounded-2xl" onPress={()=>Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              )}>
                <Text className="text-blue-500 text-center font-semibold text-lg">
                  Create Account
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
