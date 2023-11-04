export class MessageToCreate {
    user: {
      id: number;
      name: string;
      nickname: string;
      email: string;
      password: string;
    };
    canal: { id: number; name: string };
    content: string;
    date: Date;
  
    constructor(
      user: { id: number; name: string; nickname: string; email: string; password: string },
      canal: { id: number; name: string },
      content: string,
      date: Date
    ) {
      this.user = user;
      this.canal = canal;
      this.content = content;
      this.date = date;
    }
  }