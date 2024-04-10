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
    public id: string
  ) {}
}

export class Settings {
  constructor() {} // Empty for now
}

export class TimerStatus {
  constructor(private isRunning: boolean, private timeRemaining: number) {}

  public setIsRunning(isRunning: boolean): void {
    this.isRunning = isRunning;
  }

  public setTimeRemaining(timeRemaining: number): void {
    this.timeRemaining = timeRemaining;
  }

  public getIsRunning(): boolean {
    return this.isRunning;
  }

  public getTimeRemaining(): number {
    return this.timeRemaining;
  }

  public getTimeRemainingConverted(timeRemaining: number): string {
    // we take the floor of the seconds divided by 60 to get the minutes
    // we take the remainder of the seconds divided by 60 to get the remaining seconds
    let minutes = Math.floor(timeRemaining / 60);
    let remainingSeconds = timeRemaining % 60;

    // padStart is used to ensure that the string str is at least 2 characters long.
    // If str is less than 2 characters long, padStart will add "0"s to the start of str
    // until it is 2 characters long. this is for seconds < 10
    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
  }
}

export class TimeEntry {
  constructor(
    public id: string,
    public startTime: number,
    public endTime: number,
    public projectId: string,
    public name: string,
    public earnedCoins: number
  ) {}
}

//TODO: this is a bit hacky and I don't like it right now
export class RunningTime {
  constructor(
    public startTime: number = 0,
    public plannedEndTime: number = 0,
    public projectId: string = "",
    public name: string = ""
  ) {}
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
    public runningTime: RunningTime
  ) {}
}

export class Todo {
  constructor(
    public task: string,
    public dateCreated: number,
    public done: boolean = false,
    public id: string = ""
  ) {}
}

export class CatItem {
  constructor(
    public path: string,
    public name: string,
    public cost: number,
    public isRestCat: boolean,
    public id: number
  ) {}
}
