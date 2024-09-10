import React, { useState } from "react";
import { View, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { Input } from "../../components/Input";
import { Tittle } from "../../components/Tittle";
import { Button } from "../../components/Button";
import { Link } from "../../components/Link";

import { styles } from "./styles";
import { useAuth } from "../../context";

export function Login() {
    const [emailOrName, setEmailOrName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [emailOrNameError, setEmailOrNameError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const navigation = useNavigation<any>();
    const { signIn } = useAuth();

    async function onLogin() {
        if (emailOrName && password) {
            setEmailOrNameError("");
            setPasswordError("");
            try {
                await signIn(emailOrName, password);
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Main" }]
                });
            } catch (err) {
                setError("Credenciais inválidas");
            }
        } else {
            if (!emailOrName) {
                setEmailOrNameError("This field is required");
            } else {
                setEmailOrNameError("");
            }
            if (!password) {
                setPasswordError("This field is required");
            } else {
                setPasswordError("");
            }
        }
    }

    function onRegister() {
        navigation.navigate("Register");
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerTittle}>
                <Tittle value="Login" />
            </View>

            <View style={styles.containerInfo}>
                <Input value={emailOrName} setValue={setEmailOrName} placeholder="Email or Username" />
                {emailOrNameError ? (<Text style={styles.textError}>{emailOrNameError}</Text>) : (<></>)}
                <Link value="Forgot your" link="email or username?" func={() => { }} color="#85A0E3" />
            </View>

            <View style={styles.containerInfo}>
                <Input value={password} setValue={setPassword} placeholder="password" />
                {passwordError ? (<Text style={styles.textError}>{passwordError}</Text>) : (<></>)}
                <Link value="Forgot your" link="password?" func={() => { }} color="#85A0E3" />
            </View>

            <View style={styles.containerInfo}>
                <Button backgroundColor="#85A0E3" func={onLogin} />
                <Link value="Don't have an account?" link="Sign up." func={onRegister} color="#85A0E3" />
                {error ? (<Text style={[styles.textError, {alignSelf:"center"}]}>{error}</Text>) : (<></>)}
            </View>
        </View>
    );
}