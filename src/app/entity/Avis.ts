export class Avis{
    id: number;
    article_id: number;
    userId: number;
    note: number;
    commentaire: String;
    date : Date;

    constructor(id: number,article_id: number,userId: number,note: number, commentaire: String, date:Date){
        this.id=id;
        this.article_id = article_id;
        this.userId = userId;
        this.note = note;
        this.commentaire = commentaire;
        this.date = date;
    }
}