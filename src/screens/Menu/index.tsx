import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, ScrollView, Animated } from "react-native";
import { FontAwesome6 , Ionicons } from '@expo/vector-icons';

import { Block } from "../../components/Block";
import { Tittle } from "../../components/Tittle";
import { styles } from "./styles";

export function Menu() {
  const animations = [new Animated.Value(100), new Animated.Value(100), new Animated.Value(100)];
  const opacityAnimations = [new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)];
  
  const navigation = useNavigation<any>();
  
  useEffect(() => {
    Animated.stagger(200, animations.map((anim, index) => 
      Animated.parallel([
        Animated.timing(anim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnimations[index], {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        })
      ])
    )).start();
  }, []);
  
  return (
    <View style={styles.container}>

      <View style={styles.containerNavbar}>
        <TouchableOpacity>
          <FontAwesome6 name="user-large" size={22} color="#617CA6" onPress={()=>{navigation.navigate("Account")}}/>
        </TouchableOpacity>
        <Tittle value="Insigths" />
        <TouchableOpacity>
          <Ionicons name="settings-sharp" size={22} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.containerScroll}>
        <Animated.View style={{ transform: [{ translateY: animations[0] }], opacity: opacityAnimations[0] }}>
          <Block mode= "water" />
        </Animated.View>
        <Animated.View style={{ transform: [{ translateY: animations[1] }], opacity: opacityAnimations[1] }}>
          <Block mode= "night" />
        </Animated.View>
        <Animated.View style={{ transform: [{ translateY: animations[2] }], opacity: opacityAnimations[2] }}>
          <Block mode= "practice" />
        </Animated.View>
      </ScrollView>

    </View>
  );
}