import React from "react";
import { View, Text } from "react-native";

import { useAuth } from "../../context/AuthContext"
import { styles } from "./styles";
import { Button } from "../../components/Button";

export function Menu() {

    const { signOut } = useAuth();

    async function logout() {
        await signOut();
    }

  return (
    <View style={styles.container}>
        <Button value="logout" color="#FFFFFF" backgroundColor="#FA524F" func={logout} />
    </View>
  );
}