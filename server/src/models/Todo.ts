export class Todo {
    constructor(
        public task: string,
        public done: boolean = false,
        public id : string = ""
    ) {}
}