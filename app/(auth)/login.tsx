import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import React from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

const Login = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1">
            <View className="px-6 pt-4 mt-10">
              <TouchableOpacity>
                <Ionicons name="arrow-back-outline" size={28} color="black" />
              </TouchableOpacity>
            </View>

            <View className="flex-1 items-center justify-center px-6">
              <Image
                source={require("@/assets/images/icon.png")}
                className="w-72 h-72 mb-6"
                resizeMode="contain"
              />
              <Text className="text-5xl font-extrabold mb-2">Welcome back</Text>
              <Text className="text-gray-500 mb-6">Sign in to continue</Text>

              <View className="w-full mb-4">
                <View className="mb-4">
                  <TextInput
                    className="border border-gray-300 px-4 py-3 rounded-2xl"
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
                <View className="mb-4 relative">
                  <TextInput
                    className="border border-gray-300 px-4 py-3 rounded-2xl"
                    placeholder="Password"
                  />
                  <TouchableOpacity className="absolute right-4 top-3"></TouchableOpacity>
                </View>
                <TouchableOpacity className="bg-blue-500 py-3 rounded-2xl mb-4">
                  <Text className="text-white text-center font-semibold">
                    Login
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="flex-row items-center w-full mb-4">
                <View className="flex-1 h-[1px] bg-gray-300" />
                <Text className="mx-4 text-gray-500">or</Text>
                <View className="flex-1 h-[1px] bg-gray-300" />
              </View>

              <TouchableOpacity className="flex-row items-center border border-gray-300 px-4 py-3 rounded-2xl">
                <Ionicons name="logo-google" size={24} color="#4285F4" />
                <Text className="ml-2 text-blue-500 font-semibold">
                  Sign in with Google
                </Text>
              </TouchableOpacity>

              <View>
                <Text className="text-gray-500 mt-4">
                  Don&apos;t have an account?{" "}
                  <Link href="/(auth)/register">
                  <Text className="text-blue-500">Sign in</Text>
                </Link>
                </Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <Toast />
    </SafeAreaView>
  );
};

export default Login;
