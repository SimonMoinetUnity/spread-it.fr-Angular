import { User } from "../entity/user";

export interface IToken{
    accessToken: string
    user:User
}