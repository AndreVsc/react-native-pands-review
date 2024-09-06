import React from "react";
import { View , Text} from "react-native";
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { AuthStackParamList } from "../../routes/auth.routes";

import { Input } from "../../components/Input";
import { Tittle } from "../../components/Tittle";
import { Button } from "../../components/Button";
import { Link } from "../../components/Link";

import { styles } from "./styles";

export function Login() {
    const [password, setPassword] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [emailError, setEmailError] = React.useState<string>("");
    const [passwordError, setPasswordError] = React.useState<string>("");
    const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

    function onLogin() {
        if(password && email){
            setEmailError("");
            setPasswordError("");
            navigation.navigate("Login");
        }else{
            if(!password){
                setPasswordError("This field is required");
            }else{
                setPasswordError("");
            }
            if(!email){
                setEmailError("This field is required");
            }else{
                setEmailError("");
            }
        }
    }

    function onRegister() {
        navigation.navigate("Register");
    }

    return (
        <View style={styles.container}>

            <View style={styles.containerTittle}>
                <Tittle value="Login"/>
            </View>

            <View style={styles.containerInfo}>
                <Input value={email} setValue={setEmail} placeholder="email"/>
                {emailError? (<Text style={styles.textError}>{emailError}</Text>) : (<></>)}
                <Link value="Forgot your" link="email or username?" func={()=>{}} color="#85A0E3"/>
            </View>

            <View style={styles.containerInfo}>
                <Input value={password} setValue={setPassword} placeholder="password"/>
                {passwordError?(<Text style={styles.textError}>{passwordError}</Text>):(<></>)}
                <Link value="Forgot your" link="password?" func={()=>{}} color="#85A0E3"/>
            </View>

            <View style={styles.containerInfo}>
                <Button backgroundColor="#85A0E3" func={onLogin}/>
                <Link value="Don't have an account?" link="Sign up." func={onRegister} color="#85A0E3"/>
            </View>
            
        </View>
    );
}