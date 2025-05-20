import { Client } from "react-native-appwrite";
export const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("682c250c003a439f8d85")
  .setPlatform("com.convo.app");
