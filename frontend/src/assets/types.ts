export interface RegistrationFields {
    email: string
    nickname: string
    password: string
    confirmPassword: string
}

export interface LoginFields{
    nickname: string
    password: string
}

export interface AppState{
    isAuthenticated: boolean
}
