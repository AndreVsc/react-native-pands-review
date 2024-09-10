import React from "react";
import { View } from "react-native";

import { useAuth } from "../../context"
import { Button } from "../../components/Button";

import { styles } from "./styles";

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