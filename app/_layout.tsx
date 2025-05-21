import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Stack } from "expo-router";
import React from 'react';
import { StatusBar } from "react-native";
import Toast from "react-native-toast-message";
import "./global.css";

export default function RootLayout() {
  return (
   <>
   <ClerkProvider tokenCache={tokenCache}>
   <StatusBar barStyle="dark-content" backgroundColor="#fff" />
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(chat)" options={{ headerShown: false }} />
    </Stack>
    <Toast />
   </ClerkProvider>
   </>
  );
}
