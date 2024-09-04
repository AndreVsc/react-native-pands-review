import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AuthStackParamList } from "../../routes/auth.routes";

import { Input } from "../../components/Input";
import { Tittle } from "../../components/Tittle";
import { Button } from "../../components/Button";

import { styles } from "./styles";

export function Login() {
    const [password, setPassword] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

    function Link({value, link, direct}: {value: string, link: string , direct: keyof AuthStackParamList}) {
        return (
            <View style={styles.containerLink}>
                <View>
                    <Text style={styles.text}> {value}{" "} </Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate(direct)}>
                    <Text style={styles.link}>{link}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>

            <View style={styles.containerTittle}>
                <Tittle value="Login"/>
            </View>

            <View style={styles.containerInfo}>
                <Input value={email} setValue={setEmail} placeholder="email"/>
                <Link value="Forgot your" link="email or username?" direct="Login"/>
            </View>

            <View style={styles.containerInfo}>
                <Input value={password} setValue={setPassword} placeholder="password"/>
                <Link value="Forgot your" link="password?" direct="Login"/>
            </View>

            <View style={styles.containerInfo}>
                <Button backgroundColor="#85A0E3"/>
                <Link value="Don't have an account?" link="Sign up." direct="Register"/>
            </View>



        </View>
    );
}