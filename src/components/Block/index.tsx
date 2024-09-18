import React from "react";
import { View } from "react-native";

import { styles } from "./styles";

export function Block({ mode }: { mode: string }) {

    function renderBlock() {
        switch (mode) {
            case "water":
                return <></>;
            case "night":
                return <></>;
            case "practice":
                return <></>;
            default:
                return <></>;
        }
    }
    
  return (
    <View style={styles.container}>
        {renderBlock()}
    </View>
  );
}