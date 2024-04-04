export class Pet {
  constructor(
    public id: string,
    public name: string,
    public imageUrl: string,
  ) { }
}

export class Project {
  constructor(
    public id: string,
    public hex: string,
    public name: string,
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

export class User {
  constructor(
    public id: string,
    public displayName: string,
    public pet: Pet,
    public timeEntries: TimeEntry[],
    public currentTimerStart: number,
    public projects: Project[],
    public totalCoins: number,
    public currentTimeEntry?: TimeEntry,
  ) { }
}

export class ToDo {
  constructor(
    public tasks: string[]
  ) { }
}