import React, { useState } from "react";
import { View, Text } from "react-native";
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { AuthStackParamList } from "../../routes/auth.routes";
import { useRegisterActions } from "./actions";

import { Input } from "../../components/Input";
import { Tittle } from "../../components/Tittle";
import { Button } from "../../components/Button";
import { Link } from "../../components/Link";

import { styles } from "./styles";

export function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [weigth, setWeigth] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [userType, setUserType] = useState<number>(2);
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Error states
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [weigthError, setWeigthError] = useState<string>("");
  const [dateError, setDateError] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { handleRegister, validateStepOne, validateStepTwo, validateStepThree } = useRegisterActions();

  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

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
              {nameError ? (<Text style={styles.textError}>{nameError}</Text>) : (<></>)}
            </View>
            <View style={styles.containerInfo}>
              <Input value={password} setValue={setPassword} placeholder="password" />
              <Input value={confirmPassword} setValue={setConfirmPassword} placeholder="confirm password" />
              {passwordError ? (<Text style={styles.textError}>{passwordError}</Text>) : (<></>)}
            </View>
            <View style={styles.containerInfo}>
              <Button backgroundColor="#EF9664" color="#FFFFFF" func={async () => {if (await validateStepOne(name, password, confirmPassword, setNameError, setPasswordError)) setCurrentStep(1);}} />
              <Link value="Do you have a account?" link="Sign in." func={onLogin} color="#EF9664" />
              {error ? (<Text style={styles.textError}>{error}</Text>) : (<></>)}
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
              <Text style={styles.label}>Email</Text>
              <Input value={email} setValue={setEmail} placeholder="email" />
              {emailError ? (<Text style={styles.textError}>{emailError}</Text>) : (<></>)}
            </View>
            <View style={styles.containerInfo}>
              <Button backgroundColor="#EF9664" color="#FFFFFF" func={async () => {if (await validateStepTwo(email, setEmailError)) {setUserType(2); setCurrentStep(2);}}} />
              <Link value="Remind me" link="later." func={() => {setUserType(1); setEmail(""); setCurrentStep(2);}} color="#EF9664" />
              {error ? (<Text style={styles.textError}>{error}</Text>) : (<></>)}
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
              <Text style={styles.label}>Weigth</Text>
              <Input value={weigth} setValue={setWeigth} placeholder="weigth" />
              {weigthError ? (<Text style={styles.textError}>{weigthError}</Text>) : (<></>)}
            </View>
            <View style={styles.containerInfo}>
              <Text style={styles.label}>Date</Text>
              <Input value={date} setValue={setDate} placeholder="date" />
              {dateError ? (<Text style={styles.textError}>{dateError}</Text>) : (<></>)}
            </View>
            <View style={styles.containerInfo}>
              <Button backgroundColor="#7AB68B" color="#FFFFFF" func={() => {if (validateStepThree(weigth, date, setWeigthError, setDateError)) handleRegister(confirmPassword, email, password, name, weigth, date, userType, navigation, setError, setCurrentStep);}} />
              {error ? (<Text style={styles.textError}>{error}</Text>) : (<></>)}
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