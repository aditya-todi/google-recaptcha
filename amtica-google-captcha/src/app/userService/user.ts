export class User {
    constructor(public name: string = '',
        public username: string = '',
        public author: boolean = false,
        public admin: boolean = false,
        public token: string) { }
}