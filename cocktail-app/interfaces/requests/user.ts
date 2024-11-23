export interface UserUpdateDTO {
    name: string;
    email: string;
    username: string;
    password?: string;
    passwordConfirmation?: string;
}