export class Pet {
    constructor(
        public id: string = '',
        public name: string = '',
        public imageUrl: string = ''
    ) { };

    makeSimple() {
        return {
            id: this.id, 
            name: this.name,
            imageUrl : this.imageUrl
        }
    }
}