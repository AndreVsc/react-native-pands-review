import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from './styles';

interface LinkProps {
    value: string;
    link: string;
    func: () => void;
    color?: string;
}

export function Link({value, link, func, color}: LinkProps) {
  return (
    <View style={styles.containerLink}>
        <View>
            <Text style={styles.text}> {value}{" "} </Text>
        </View>
        <TouchableOpacity onPress={func}>
            <Text style={[styles.link, {color}]}>{link}</Text>
        </TouchableOpacity>
    </View>
  );
}