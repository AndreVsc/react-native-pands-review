import React from "react";
import { TextInput } from "react-native";

import { styles } from "./styles";

interface InputProps {
  placeholder?: string;
  value?: string;
  setValue?: (text: string) => void;
  keyboardType?: "default" | "number-pad" | "decimal-pad" | "numeric" | "email-address" | "phone-pad";
  capitalize?: "none" | "sentences" | "words" | "characters";
}

export function Input({placeholder, value, setValue, keyboardType, capitalize}: InputProps) {
  return (
    <>
        <TextInput 
          style={styles.input}
          placeholder={placeholder?placeholder:"digite aqui..."}
          value={value?value:""}
          secureTextEntry={placeholder==="password" || placeholder==="confirm password"?true:false}
          onChangeText={e => setValue && setValue(e)}
          keyboardType={keyboardType?keyboardType:"default"}
          autoCapitalize={capitalize?capitalize:"none"}
        />
    </>
  );
}