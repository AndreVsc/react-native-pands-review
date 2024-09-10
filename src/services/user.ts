import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "./../constants/config";
import { User , WaterData } from "./props";

export const syncUserData = async (
  token: string,
  setUser: (user: User | null) => void
) => {
  try {
    const response = await fetch(`${API_URL}/user/profile`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const userData: User = await response.json();
    setUser(userData);

  } catch (error) {
    console.log("Error syncing user data:", error);
  }
};

export const deleteUser = async (
  setIsAuthenticated: (isAuthenticated: boolean) => void,
  setUser: (user: User | null) => void,
  setWater: (water: WaterData | null) => void,
  signOut: () => Promise<void>
) => {
  try {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found");
    }

    const response = await fetch(`${API_URL}/user/delete`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to delete user");
    }

    await signOut();
    console.log("User deleted successfully");

  } catch (error) {
    console.log("Error deleting user:", error);
    throw error;
  }
};