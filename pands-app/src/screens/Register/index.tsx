import React, { useState } from "react";
import { View, Text } from "react-native";
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { Input } from "../../components/Input";
import { Tittle } from "../../components/Tittle";
import { Button } from "../../components/Button";
import { Link } from "../../components/Link";

import { styles } from "./styles";
import { InputRegisterProps } from "./props"
import { AuthStackParamList } from "../../routes/auth.routes";

export function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [weigth, setWeigth] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [birthDate, setBirthDate] = useState<Date>(new Date());

  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  
  function InputRegister({ value, setValue, nameValue, text }: InputRegisterProps) {
    return (
      <>
      </>
    );
  }

  function onLogin() {
    navigation.navigate("Login");
}

  function renderCurrentStep() {
    switch (currentStep) {
      case 0:
        return (
          <>

            <View style={styles.containerTittle}>
              <Tittle value="Register" />
            </View>

            <View style={styles.containerInfo}>
                <Text style={styles.label}>Name</Text>
                <Input value={name} setValue={setName} placeholder="name" />
            </View>

            <View style={styles.containerInfo}>
              <InputRegister value={password} setValue={setPassword} nameValue="password" text="Password" />
              <Input value={confirmPassword} setValue={setConfirmPassword} placeholder="confirm password" />
            </View>

            <View style={styles.containerInfo}>
              <Button backgroundColor="#EF9664" color="#FFFFFF" func={() => setCurrentStep(1)} />
              <Link value="Do you have a account?" link="Sign in." func={onLogin} color="#EF9664" />
            </View>
            
          </>
        );
      case 1:
        return (
            <>
                <View style={styles.containerTittle}>
                    <Tittle value="Register your email" />
                </View>
                <View style={styles.containerInfo}>
                    <InputRegister value={email} setValue={setEmail} nameValue="email" text="Email" />
                </View>
                <View style={styles.containerInfo}>
                    <Button backgroundColor="#EF9664" color="#FFFFFF" func={() => setCurrentStep(2)} />
                    <Link value="Remind me" link="later." func={onLogin} color="#EF9664" />
                </View>
             </>
        );
      case 2:
        return (
            <>
                <View style={styles.containerTittle}>
                    <Tittle value="Personal data" />
                </View>
                <View style={styles.containerInfo}>
                    <InputRegister value={weigth} setValue={setWeigth} nameValue="weigth" text="Weigth" />
                </View>
                <View style={styles.containerInfo}>
                    <InputRegister value={date} setValue={setDate} nameValue="date" text="Date" />
                </View>
                <View style={styles.containerInfo}>
                    <Button backgroundColor="#7AB68B" color="#FFFFFF" func={() => setCurrentStep(0)} />
                </View>
              </>
        );
      default:
        return null;
    }
  }

  return (
      <View style={styles.container}>
        {renderCurrentStep()}
      </View>
    );
}