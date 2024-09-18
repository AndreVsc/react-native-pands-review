import React from "react";
import { View, Text, Alert, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome6 } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import { useAuth } from "../../context";

import Redirect from "../../components/Redirect";
import { Button } from "../../components/Button";
import { styles } from "./styles";


export function Account() {
  const { user, loading, deleteUser, signOut , water } = useAuth();

  const navigation = useNavigation<any>();

  function Navbar() {
    return (
      <View style={styles.allNavbar}>
        <Button func={() => { navigation.navigate("Menu") }} />
        <View style={styles.accountNavbar}>
          <View style={styles.acountNavbarItems}>
            <FontAwesome6 name="user-large" size={100} color="#728FD6" />
          </View>
          <Text style={{ fontWeight: "500", color: "#474747" }}>
            {loading ? "Loading..." : user?.nome || "User"}
          </Text>
        </View>
        <View></View>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              deleteUser();
              await signOut();
            } catch (error) {
              console.error("Error deleting user:", error);
              Alert.alert("Error", "Failed to delete user. Please try again.");
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#728FD6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Navbar />
      </View>
      <ScrollView style={{ height: "100%" }}>
        <View style={styles.options}>
          <View style={styles.optionsItems}>
            <Text style={styles.labelOpition}>Account</Text>
            <Redirect
              iconName="envelope"
              iconColor="#CC8069"
              text="Email"
              text2={user?.email}
              iconSize={35}
              onPress={() => {}}
              iconLibrary="FontAwesome"
            />
          </View>
          <View style={styles.optionsItems}>
            <Text style={styles.labelOpition}>Data</Text>
            <Redirect
              iconName="hand-holding-water"
              iconColor="#6AA2D7"
              text="Cup size"
              text2={water ? `${water.tamanhoCopo}ml` : "Not provided"}
              iconSize={33}
              onPress={() => {}}
              iconLibrary="FontAwesome5"
            />
            <Redirect
              iconName="weight-scale"
              iconColor="#7E7DD9"
              text="Weight"
              iconSize={33}
              text2={user ? user.peso : "Not provided"}
              onPress={() => {}}
              iconLibrary="FontAwesome6"
            />
            <Redirect
              iconName="calendar"
              iconColor="#C89A70"
              text="Age"
              text2={user ? `${user.idade} years` : "Not provided"}
              onPress={() => {}}
              iconLibrary="Ionicons"
            />
          </View>
          <View style={styles.optionsItems}>
            <Text style={styles.labelOpition}>Delete</Text>
            <Redirect
              iconName="square-xmark"
              iconColor="#D66565"
              text="Delete"
              onPress={handleDelete}
              iconLibrary="FontAwesome6"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}