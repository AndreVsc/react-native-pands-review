import { NavigationProp } from '@react-navigation/native';
import { AuthStackParamList } from "../../routes/auth.routes";
import { useAuth } from "../../context/AuthContext/index";

export function useRegisterActions() {
  const { signUp, checkIfNameExists, checkIfEmailExists } = useAuth();

  async function handleRegister(
    confirmPassword: string,
    email: string,
    password: string,
    name: string,
    weigth: string,
    date: string,
    userType: number,
    navigation: NavigationProp<AuthStackParamList>,
    setError: (error: string | null) => void,
    setCurrentStep: (step: number) => void
  ) {
    signUp({
      confirmPassword,
      email,
      password,
      name,
      weigth,
      date,
      userType,
      navigation,
      setError,
    });
    setCurrentStep(0);
  };

  async function validateStepOne(
    name: string,
    password: string,
    confirmPassword: string,
    setNameError: (error: string) => void,
    setPasswordError: (error: string) => void
  ) {
    let valid = true;
    if (!name) {
      setNameError("This field is required");
      valid = false;
    } else {
      const nameExists = await checkIfNameExists(name);
      if (nameExists) {
        setNameError("Name already exists");
        valid = false;
      } else {
        setNameError("");
      }
    }
    if (!password || !confirmPassword) {
      setPasswordError("This field is required");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword && password && confirmPassword) {
      setPasswordError("Passwords do not match");
      valid = false;
    }
    return valid;
  }

  async function validateStepTwo(
    email: string,
    setEmailError: (error: string) => void
  ) {
    let valid = true;
    if (!email) {
      setEmailError("This field is required");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      const emailExists = await checkIfEmailExists(email);
      if (emailExists) {
        setEmailError("Email already exists");
        valid = false;
      } else {
        setEmailError("");
      }
    }
    return valid;
  }

  function validateEmail(email: string) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function validateStepThree(
    weigth: string,
    date: string,
    setWeigthError: (error: string) => void,
    setDateError: (error: string) => void
  ) {
    let valid = true;
    if (!weigth) {
      setWeigthError("This field is required");
      valid = false;
    } else {
      setWeigthError("");
    }
    if (!date) {
      setDateError("This field is required");
      valid = false;
    } else {
      setDateError("");
    }
    return valid;
  }

  return {
    handleRegister,
    validateStepOne,
    validateStepTwo,
    validateStepThree,
    validateEmail,
  };
}