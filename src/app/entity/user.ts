import { Role } from "../Interface/Role";
import { Canal } from "./canal";

export class User {
    constructor(
        public role: Role,
        public id: number,
        public nickname: string,
        public email: string,
        public password: string,
        public isLogged: boolean,
        public canals: Canal[],
        public nbArticles: number
    ) {
    }

}