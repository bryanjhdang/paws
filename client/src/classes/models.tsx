export class Pet {
  constructor(
    public restId: number = 1, // VERY HARD CODE AND HACKY
    public workId: number = 5, // VERY HARD CODE AND HACKY 
    //todo: have something that's not a primitive
    public ownedCats: number[] = [1,5],
  ) { };
}

export class Project {
  constructor(
    public hex: string,
    public name: string,
    public dateCreated: number,
    public id: string,
  ) { };
}

export class Settings {
  constructor(
    // Empty for now
  ) { }
}

export class TimeEntry {
  constructor(
    public id: string,
    public startTime: number,
    public endTime: number,
    public projectId: string,
    public name: string,
    public earnedCoins: number,
  ) { }
}

//TODO: this is a bit hacky and I don't like it right now
export class RunningTime {
  constructor(
    public startTime: number = 0,
    public plannedEndTime: number = 0,
    public projectId: string = '',
    public name: string = '',
  ) { };
}

export class User {
  constructor(
    public id: string,
    public displayName: string,
    public pet: Pet,
    public timeEntries: TimeEntry[],
    public currentTimerStart: number,
    public projects: Project[],
    public totalCoins: number,
    public runningTime: RunningTime,
  ) { }
}

export class Todo {
  constructor(
    public task: string,
    public dateCreated: number,
    public done: boolean = false,
    public id: string = "",
  ) { }
}

export class CatItem {
  constructor(
    public path: string,
    public name: string,
    public cost: number,
    public isRestCat: boolean,
    public id: number
  ) { }
}

