import { client } from "@/server/appwrite";
import React, { createContext, useContext, useState } from "react";
import { Account, ID } from "react-native-appwrite";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  register: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const account = new Account(client);

  const register = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      const newAccount = await account.create(
        ID.unique(), 
        email,
        password,
        name
      );
  
      if (newAccount) {
        await account.createSession(email, password);
        const userData = await account.get();
        setUser({
          id: userData.$id,
          name: userData.name,
          email: userData.email,
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      await account.createSession(email, password);
      const userData = await account.get();
      setUser({
        id: userData.$id,
        name: userData.name,
        email: userData.email,
      });
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
