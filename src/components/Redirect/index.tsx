import React from "react";
import { TouchableOpacity, Text, ViewStyle, TextStyle, View } from "react-native";
import { FontAwesome, Ionicons, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { styles } from "./styles";

interface RedirectProps {
  iconName: string;
  iconSize?: number;
  iconColor?: string;
  text: string;
  text2?: string | number;
  onPress: () => void | Promise<number> | Promise<void> ;
  iconLibrary: "FontAwesome" | "Ionicons" | "FontAwesome5" | "FontAwesome6";
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const Redirect: React.FC<RedirectProps> = ({
  iconName,
  iconSize = 40,
  iconColor = "#000",
  text,
  text2,
  onPress,
  iconLibrary,
  containerStyle,
  textStyle,
}) => {
  const getIconComponent = () => {
    switch (iconLibrary) {
      case "FontAwesome":
        return FontAwesome;
      case "Ionicons":
        return Ionicons;
      case "FontAwesome5":
        return FontAwesome5;
      case "FontAwesome6":
        return FontAwesome6;
      default:
        return null;
    }
  };

  const IconComponent = getIconComponent();

  return (
    <TouchableOpacity style={[styles.option, containerStyle]} onPress={onPress}>
      {IconComponent && (
        <IconComponent name={iconName} size={iconSize} color={iconColor} />
      )}
      <View style={styles.containerText}>
        <Text style={[styles.text, textStyle]}>{text}</Text>
        {text2 ? <Text style={styles.text2}>{text2}</Text> : null}
      </View>
      
    </TouchableOpacity>
  );
};

export default Redirect;
