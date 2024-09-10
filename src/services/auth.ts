import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "./../constants/config";
import { SignUpParams, User, WaterData } from "./props";
import { fetchWaterData } from "./water";
import { syncUserData } from "./user";

export const signIn = async (
  emailOrName: string,
  password: string,
  setIsAuthenticated: (isAuthenticated: boolean) => void,
  setUser: (user: User | null) => void,
  setWater: (water: WaterData | null) => void
) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emailOrName, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Login failed");
    }

    const token = data.token;

    if (!token) {
      throw new Error("Token not received from server");
    }

    await AsyncStorage.setItem("token", token);

    await syncUserData(token, setUser);
    await fetchWaterData(setWater);

    setIsAuthenticated(true);

  } catch (error) {
    throw new Error("An unexpected error occurred");
  }
};

export const signOut = async (
  setIsAuthenticated: (isAuthenticated: boolean) => void,
  setUser: (user: User | null) => void,
  setWater: (water: WaterData | null) => void
) => {
  try {
    await AsyncStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    setWater(null);
  } catch (error) {
    console.log("Error signing out:", error);
  }
};

export const signUp = async ({
  confirmPassword,
  email,
  password,
  name,
  weigth,
  date,
  userType,
  navigation,
  setError,
}: SignUpParams) => {
  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha: password, nome: name, peso: weigth, dataNasc: date, idTipoDeUsuario: userType }),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error || "Error registering user");
      return;
    }

    navigation.navigate("Login");
  } catch (error) {
    console.log("Error registering user:", error);
    setError("Error registering user");
  }
};