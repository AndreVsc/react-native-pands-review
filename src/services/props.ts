export interface SignUpParams {
    name: string;
    email: string;
    confirmPassword: string;
    password: string;
    date: string;
    weigth: string;
    userType: number;
    navigation: any;
    setError: (error: string | null) => void;
  }
  
  export interface User {
    nome: string;
    peso: string;
    email?: string;
    idTipoDeUsuario: number;
    dataNasc?: Date;
    idade?: number;
    tipo?: string;
    id: number | undefined;
  }
  
  export interface WaterData {
    tamanhoCopo: number;
    Domingo: number;
    Segunda: number;
    Terca: number;
    Quarta: number;
    Quinta: number;
    Sexta: number;
    Sabado: number;
  }
  
  export interface AuthContextData {
    isAuthenticated: boolean;
    user: User | null;
    water: WaterData | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    signUp: (params: SignUpParams) => Promise<void>;
    deleteUser: () => Promise<void>;
    fetchWaterData: () => Promise<void>;
    updateWaterData: (data: WaterData) => Promise<void>;
    checkIfNameExists: (name: string) => Promise<boolean>;
    checkIfEmailExists: (email: string) => Promise<boolean>;
  }
  