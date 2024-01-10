import { User } from "./user";

export class Canal{
    constructor(
        public id: number,
        public name: string,
        public users: User[],
        public adminId: number
    ) {
    }
}