export class Pet {
    constructor(
        public restId: number = 1, // very hacky dont like
        public workId: number = 5, // very hacky dont like
        //todo: have something that's not a primitive
        public ownedCats : number[] = [1,5],
    ) { };
}