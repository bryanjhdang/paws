export class Pet {
    constructor(
        public restId: number = 0, // very hacky dont like
        public workId: number = 0, // very hacky dont like
        //todo: have something that's not a primitive
        public ownedCats : number[] = [0,0],
    ) { };
}