export class Project {
    constructor(
        public id: string = '',
        public hex: string = '',
        public name: string = ''
    ) { };

    makeSimple() {
        return { 
            id: this.id,
            hex: this.hex,
            name: this.name
    }
    }
}