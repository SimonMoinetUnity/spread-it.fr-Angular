export class Image{
    id: number;
    imageData: FormData;

    constructor(id: number, imageData: FormData){
        this.id=id;
        this.imageData = imageData;
    }
}