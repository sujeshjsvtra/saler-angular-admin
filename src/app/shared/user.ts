export class User {
    id?: Number;
    name?: String;
    email?: String;
    password?: String;
    dob?: Date;
    pinCode?: String;
    mobile?: String;
    token?:String;
    constructor(id:number,name:String,email:String,password:String,pinCode:String,mobile:String,token:String){
        this.id=id;
        this.name=name;
        this.email=email;
        this.password=password;
        this.pinCode=pinCode;
        this.mobile=mobile;
        this.token=token;
    }

}
