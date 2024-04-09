export class Pet {
    constructor(
        public restId: number = 0, 
        public workId: number = 0,
        //todo: have something that's not a primitive
        public ownedCats : number[] = [0],
    ) { };
}