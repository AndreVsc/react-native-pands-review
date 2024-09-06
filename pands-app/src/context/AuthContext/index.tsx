import React, { useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, WaterData, SignUpParams, AuthContextData } from "./props";
import { createContext } from 'react';
import { signIn, signOut, signUp, syncUserData, deleteUser, fetchWaterData, updateWaterData, checkIfNameExists, checkIfEmailExists } from "./services";

const AuthContext = createContext<AuthContextData>({
  isAuthenticated: false,
  user: null,
  water: null,
  loading: true,
  signIn: async (email: string, password: string) => {},
  signOut: async () => {},
  signUp: async (params: SignUpParams) => {},
  deleteUser: async () => {},
  fetchWaterData: async () => {},
  updateWaterData: async (data: WaterData) => {},
  checkIfNameExists: async (name: string) => false,
  checkIfEmailExists: async (email: string) => false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [water, setWater] = useState<WaterData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      try {
        if (token) {
          await syncUserData(token, setUser);
          await fetchWaterData(setWater);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      signIn: (email, password) => signIn(email, password, setIsAuthenticated, setUser, setWater, syncUserData, fetchWaterData),
      signUp,
      signOut: () => signOut(setIsAuthenticated, setUser, setWater),
      loading,
      user,
      deleteUser: () => deleteUser(setIsAuthenticated, setUser, setWater, () => signOut(setIsAuthenticated, setUser, setWater)),
      water,
      fetchWaterData: () => fetchWaterData(setWater),
      updateWaterData: (data) => updateWaterData(data, setWater, fetchWaterData),
      checkIfNameExists,
      checkIfEmailExists
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);