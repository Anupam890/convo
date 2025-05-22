import { useSSO } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
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
  View,
} from "react-native";
import Toast from "react-native-toast-message";

WebBrowser.maybeCompleteAuthSession();

type FormData = {
  fullName: string;
  email: string;
  password: string;
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { startSSOFlow, setActive } = useSSO();

  const handleRegister = async () => {
    try {
      setLoading(true);
      const { createdSessionId } = await startSSOFlow({
        strategy: "oauth_google",
      });
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Registration failed",
        text2: "Please try again",
      });
    } finally {
      setLoading(false);
    }
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
                source={require("@/assets/images/icon.png")}
                className="w-72 h-72 mb-6"
                resizeMode="contain"
              />
              <Text className="text-5xl font-extrabold mb-2">Create Account</Text>
              <Text className="text-gray-500 mb-6">
                Create an account to get started
              </Text>

              <View className="w-full mb-4">
                <TextInput
                  className="border border-gray-300 px-4 py-3 rounded-2xl mb-4"
                  placeholder="Full Name"
                  value={userData.fullName}
                  onChangeText={(text) =>
                    setUserData({ ...userData, fullName: text })
                  }
                />
                <TextInput
                  className="border border-gray-300 px-4 py-3 rounded-2xl mb-4"
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={userData.email}
                  onChangeText={(text) =>
                    setUserData({ ...userData, email: text })
                  }
                />
                <View className="mb-4 relative">
                  <TextInput
                    className="border border-gray-300 px-4 py-3 rounded-2xl"
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    value={userData.password}
                    onChangeText={(text) =>
                      setUserData({ ...userData, password: text })
                    }
                  />
                  <TouchableOpacity
                    className="absolute right-4 top-3"
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off" : "eye"}
                      size={24}
                      color="gray"
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                 className="bg-blue-500 py-3 rounded-2xl mb-4"
                >
                  <Text className="text-white text-center font-semibold">
                    {loading ? "Creating Account..." : "Create Account"}
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="flex-row items-center w-full mb-4">
                <View className="flex-1 h-[1px] bg-gray-300" />
                <Text className="mx-4 text-gray-500">or</Text>
                <View className="flex-1 h-[1px] bg-gray-300" />
              </View>

              <TouchableOpacity
                className="flex-row items-center border border-gray-300 px-4 py-3 rounded-2xl"
                onPress={handleRegister}
                disabled={loading}
              >
                <Ionicons name="logo-google" size={24} color="#4285F4" />
                <Text className="ml-2 text-blue-500 font-semibold">
                  Sign up with Google
                </Text>
              </TouchableOpacity>

              <View className="flex-row mt-4">
                <Text className="text-gray-500">Already have an account? </Text>
                <Link href="/(auth)/login">
                  <Text className="text-blue-500">Sign in</Text>
                </Link>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
