export class Message {
    constructor(public id: number,
        public user: {
            id: number,
            name: string,
            nickname: string,
            email: string,
            password: string
        },
        public canal: { id: number, name: string },
        public content: string,
        public date: Date) {

    }

}
