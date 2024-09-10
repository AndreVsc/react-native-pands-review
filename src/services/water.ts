import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constants/config";
import { WaterData } from "./props";

export const fetchWaterData = async (
  setWater: (water: WaterData | null) => void
) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await fetch(`${API_URL}/user/water-record`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch water data");
    }

    const waterData: WaterData = await response.json();
    setWater(waterData);

  } catch (error) {
    console.log("Error fetching water data:", error);
  }
};

export const updateWaterData = async (
  data: WaterData,
  setWater: (water: WaterData | null) => void
) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await fetch(`${API_URL}/user/create-water-record`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update water data");
    }

    await fetchWaterData(setWater);
  } catch (error) {
    console.log("Error updating water data:", error);
  }
};