import React from 'react';
import { Text} from 'react-native';

import { styles } from './styles';

interface TitleProps {
  value?: string;
  color?: string;
}

export function Tittle({value, color}: TitleProps) {
  return (
    <>
      <Text style={[ styles.tittle , {color: color? color:"#1B232F"}]}>{value?value:"undefined"}</Text>
    </>
  );
}