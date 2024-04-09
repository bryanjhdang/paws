export class Todo {
    constructor(
        public task: string,
        public dateCreated: number,
        public done: boolean = false,
        public id : string = ""
    ) {}
}