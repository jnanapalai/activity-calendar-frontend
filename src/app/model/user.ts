export class User {
     userId: number;
     firstName: string;
     lastName: string;
     userName: string;
     email: string;
     password: string;

     constructor(userId:number, firstName: string, lastName: string, userName: string, email:string, password:string) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.email = email;
        this.password = password;
     }
}