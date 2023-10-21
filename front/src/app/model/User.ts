export class User{
    id : number;
    nome : string;
    username : string;
    senha : string;

    constructor(object?){
        if(object)
            Object.assign(this, object);
    }
}