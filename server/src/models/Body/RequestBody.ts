export interface LoginBody {
    username: string;
    hashedPassword: string;
}

export interface CreateUserBody {
    username: string;
    hashedPassword: string;
    name: string;
}

export interface StartTimerBody {
    entryName: string,
    projectId: string
}