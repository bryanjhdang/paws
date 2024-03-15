export interface LoginBody {
    username: String;
    hashedPassword: String;
}

export interface CreateUserBody {
    username: String;
    hashedPassword: String;
    name: String;
}