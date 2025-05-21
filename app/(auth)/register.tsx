import { useSignUp } from "@clerk/clerk-expo";
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
  View,
} from "react-native";
import Toast from "react-native-toast-message";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();

  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const handleRegister = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: userData.email,
        password: userData.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      console.error("Sign-up Error:", JSON.stringify(err, null, 2));
    }
  };

  const handleVerify = async () => {
    if (!isLoaded) return;

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.replace("/(auth)/login");
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Successfully verified email",
          position: "top",
        });
      } else {
       Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to verify email",
        position: "top",
       })
      }
    } catch (err) {
      console.error("Verification Error:", JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center px-6">
        <Text className="text-2xl font-bold mb-4">Verify Your Email</Text>
        <TextInput
          className="border border-gray-300 px-4 py-3 rounded-2xl w-full mb-4"
          placeholder="Enter verification code"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
        />
        <TouchableOpacity
          className="bg-blue-500 py-3 rounded-2xl w-full"
          onPress={handleVerify}
        >
          <Text className="text-white text-center font-semibold">Verify</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

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
                <TextInput
                  className="border border-gray-300 px-4 py-3 rounded-2xl mb-4"
                  placeholder="Full Name"
                  value={userData.name}
                  onChangeText={(text) =>
                    setUserData({ ...userData, name: text })
                  }
                />
                <TextInput
                  className="border border-gray-300 px-4 py-3 rounded-2xl mb-4"
                  placeholder="Email"
                  value={userData.email}
                  onChangeText={(text) =>
                    setUserData({ ...userData, email: text })
                  }
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <View className="mb-4 relative">
                  <TextInput
                    className="border border-gray-300 px-4 py-3 rounded-2xl"
                    placeholder="Password"
                    value={userData.password}
                    onChangeText={(text) =>
                      setUserData({ ...userData, password: text })
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
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
