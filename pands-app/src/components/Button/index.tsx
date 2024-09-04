import React from 'react';
import { Text , TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

import { styles } from "./styles";

interface ButtonProps {
    backgroundColor?: string;
    value?: string;
    func?: ()=>void;
    color?: string;
}

export function Button({value,func,color,backgroundColor}:ButtonProps) {
  return (
    <TouchableOpacity onPress={func?func:()=>{}} style={[styles.button,{backgroundColor}]}>
        <Text style={[styles.text,{color}]}>{value?value:<SimpleLineIcons name="arrow-right" size={14} color="white" />}</Text>
    </TouchableOpacity>
  );
}