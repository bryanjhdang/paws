import axios, { AxiosPromise, AxiosResponse } from "axios";
import { Pet, Project, TimeEntry } from "./models";

// Account
export function getAccount(): void {

}

export function postAccountCreate(): void {

}

// Pet
export function getPet(): void {

}

export function getCoins(): number {
	// make api call
	return 0;
}

// TimeEntry
export function getTimeEntry(): Promise<TimeEntry[]> {
	const createTimeEntries = (any : any): TimeEntry[] => {
		return any.data.map((element: any) => {
			return new TimeEntry(
				element.id,
				element.startTime,
				element.endTime,
				element.project,
				element.name,
				element.earnedCoins
			);
		});
	}

	return new Promise<TimeEntry[]>((resolve, reject) => {	
		axios({
			method: 'get',
			url: `${import.meta.env.VITE_API_SERVER_URL}/timeEntry`
		})
		.then((response) => {
			resolve(createTimeEntries(response));
		}, (error) => {
			reject(error);
		})
	})
}

export function postTimeEntryStart(timeEntry : TimeEntry): void {
	axios({
		method: 'post',
		url: `${import.meta.env.VITE_API_SERVER_URL}/timeEntry/start`,
		data: {
			entryName: timeEntry.name,
			projectId: timeEntry.projectId,
			startTime: timeEntry.startTime,
			endTime: timeEntry.endTime
		}
	})
	.then((response) => {
		console.log(response);
	}, (error) => {
		throw(error);
	});
}

export function postTimeEntryStop(endTimeNumber : number): void {
	axios({
		method: 'post',
		url: `${import.meta.env.VITE_API_SERVER_URL}/timeEntry/stop`,
		data: {
			endTime: endTimeNumber
		}
	})
	.then((response) => {
		console.log(response);
	}, (error) => {
		throw(error);
	});
}

// Projects
export async function postProject(project: Project) {
	axios({
		method: 'post',
		url: `${import.meta.env.VITE_API_SERVER_URL}/timeEntry/project`,
		data: {
			hex: project.hex,
			name: project.name
		}
	})
	.then((response) => {
		project.id = response.data.projectId;
	}, (error) => {
		console.log(error);
	});
}

export async function getProjects(): Promise<Project[]> {
	const createProjects = (any: any): Project[] => {
		return any.data.projects.map((element: any) => {
			return new Project(element.id, element.hex, element.name);
		});
	}

	return new Promise<Project[]>((resolve, reject) => {
		axios({
			method: 'get',
			url: `${import.meta.env.VITE_API_SERVER_URL}/timeEntry/project`
		})
		.then((response) => {
			resolve(createProjects(response));
		}, (error) => {
			reject(error)
		});
	})
}