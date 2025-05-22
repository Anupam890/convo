import React from "react";
import { SafeAreaView, Text, View } from "react-native";

const chats = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 ">
      <View className=" flex border-b-2 border-gray-200">
          <Text className="text-4xl text-blue-500 p-10 font-bold">Convo</Text>
      </View>
      </View>
    </SafeAreaView>
  );
};

export default chats;
