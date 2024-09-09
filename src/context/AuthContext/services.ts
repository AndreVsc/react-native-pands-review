import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "./config";
import { SignUpParams, User, WaterData } from "./props";

export const signIn = async (
  emailOrName: string,
  password: string,
  setIsAuthenticated: (isAuthenticated: boolean) => void,
  setUser: (user: User | null) => void,
  setWater: (water: WaterData | null) => void,
  syncUserData: (token: string, setUser: (user: User | null) => void) => Promise<void>,
  fetchWaterData: (setWater: (water: WaterData | null) => void) => Promise<void>
) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emailOrName, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    const token = data.token;

    if (!token) {
      throw new Error('Token not received from server');
    }

    await AsyncStorage.setItem('token', token);

    await syncUserData(token, setUser);
    await fetchWaterData(setWater);

    setIsAuthenticated(true);

  } catch (error) {
    throw new Error('An unexpected error occurred');
  }
};

export const signOut = async (
  setIsAuthenticated: (isAuthenticated: boolean) => void,
  setUser: (user: User | null) => void,
  setWater: (water: WaterData | null) => void
) => {
  try {
    await AsyncStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    setWater(null);
  } catch (error) {
    console.log('Error signing out:', error);
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
    setError('Passwords do not match');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha: password, nome: name, peso: weigth, dataNasc: date, idTipoDeUsuario: userType }),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error || 'Error registering user');
      return;
    }

    navigation.navigate('Login');
  } catch (error) {
    console.log('Error registering user:', error);
    setError('Error registering user');
  }
};

export const syncUserData = async (
  token: string,
  setUser: (user: User | null) => void
) => {
  try {
    const response = await fetch(`${API_URL}/user/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const userData: User = await response.json();
    setUser(userData);

  } catch (error) {
    console.log('Error syncing user data:', error);
  }
};

export const deleteUser = async (
  setIsAuthenticated: (isAuthenticated: boolean) => void,
  setUser: (user: User | null) => void,
  setWater: (water: WaterData | null) => void,
  signOut: () => Promise<void>
) => {
  try {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found');
    }

    const response = await fetch(`${API_URL}/user/delete`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete user');
    }

    await signOut();
    console.log('User deleted successfully');

  } catch (error) {
    console.log('Error deleting user:', error);
    throw error;
  }
};

export const fetchWaterData = async (
  setWater: (water: WaterData | null) => void
) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }

    const response = await fetch(`${API_URL}/user/water-record`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch water data');
    }

    const waterData: WaterData = await response.json();
    setWater(waterData);

  } catch (error) {
    console.log('Error fetching water data:', error);
  }
};

export const updateWaterData = async (
  data: WaterData,
  setWater: (water: WaterData | null) => void,
  fetchWaterData: (setWater: (water: WaterData | null) => void) => Promise<void>
) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }

    const response = await fetch(`${API_URL}/user/create-water-record`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update water data');
    }

    await fetchWaterData(setWater);
  } catch (error) {
    console.log('Error updating water data:', error);
  }
};

export const checkIfNameExists = async (name: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/auth/check-name`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error('Failed to check name');
    }

    const data = await response.json();
    return data.exists;
  } catch (error) {
    console.log('Error checking name:', error);
    return false;
  }
};

export const checkIfEmailExists = async (email: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/auth/check-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error('Failed to check email');
    }

    const data = await response.json();
    return data.exists;
  } catch (error) {
    console.log('Error checking email:', error);
    return false;
  }
};