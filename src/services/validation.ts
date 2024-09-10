import { API_URL } from "../constants/config";

export const checkIfNameExists = async (name: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/auth/check-name`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error("Failed to check name");
    }

    const data = await response.json();
    return data.exists;
  } catch (error) {
    console.log("Error checking name:", error);
    return false;
  }
};

export const checkIfEmailExists = async (email: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/auth/check-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Failed to check email");
    }

    const data = await response.json();
    return data.exists;
  } catch (error) {
    console.log("Error checking email:", error);
    return false;
  }
};