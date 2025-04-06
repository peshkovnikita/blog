export interface IUser {
    username: string,
    email: string,
    password: string,
}

export interface IUserResponse {
    email: string,
    token: string,
    username: string,
    bio: null | string,
    image: null | string
}