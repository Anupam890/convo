
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
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
  View
} from "react-native";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [UserData, setUserData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1">
            <View className="px-6 pt-4 mt-10">
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back-outline" size={28} color="black" />
              </TouchableOpacity>
            </View>

            <View className="flex-1 items-center justify-center px-6">
              <Image
                source={require("@/assets/images/createaccount.png")}
                className="w-72 h-72 mb-6"
                resizeMode="contain"
              />
              <Text className="text-5xl font-extrabold mb-2">
                Create Account
              </Text>
              <Text className="text-gray-500 mb-6">
                Create an account to get started
              </Text>
              <View className="w-full mb-4">
                <View className="mb-4">
                  <TextInput
                    className="border border-gray-300 px-4 py-3 rounded-2xl"
                    placeholder="Full Name"
                    value={UserData.name}
                    onChangeText={(text) =>
                      setUserData({ ...UserData, name: text })
                    }
                  />
                </View>
                <View className="mb-4">
                  <TextInput
                    className="border border-gray-300 px-4 py-3 rounded-2xl"
                    placeholder="Email"
                    value={UserData.email}
                    onChangeText={(text) =>
                      setUserData({ ...UserData, email: text })
                    }
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
                <View className="mb-4 relative">
                  <TextInput
                    className="border border-gray-300 px-4 py-3 rounded-2xl"
                    placeholder="Password"
                    value={UserData.password}
                    onChangeText={(text) =>
                      setUserData({ ...UserData, password: text })
                    }
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    className="absolute right-4 top-3"
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={24}
                      color="gray"
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity 
                  className="bg-blue-500 py-3 rounded-2xl mb-4"
                  onPress={handleRegister}
                  
                >
                  <Text className="text-white text-center font-semibold">
                  Create Account
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
                  Already have an account?{" "}
                  <Text
                    className="text-blue-500"
                    onPress={() => router.push("/(auth)/login")}
                  >
                    Sign in
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;