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
export function getTimeEntry(): void {

}

export function postTimeEntryStart(): void {

}

export function postTimeEntryStop(): void {

}

// Projects
export async function postProject(project: Project) {
	axios({
		method: 'post',
		url: `${import.meta.env.VITE_API_SERVER_URL}/timeEntry/projects`,
		data: {
			name: project.name,
			hexColor: project.hex
		}
	})
	.then ((response) => {
		console.log(response);
		console.log(response.data.id);
		// project.id = response;
	}, (error) => {
		console.log(error);
		throw(error);
	});
}

export async function getProjects() : Promise<Project[]> {
	const createProjects = (any: any) : Project[] => {
		return any.projects.map((element : any) => {
			return new Project(element.id, element.hexColor, element.name);
		});
	}
	
	return new Promise<Project[]>((resolve, reject) => {
		axios({
			method: 'get',
			url: `${import.meta.env.VITE_API_SERVER_URL}/timeEntry/projects`
		})
		.then ((response) => {
			resolve(createProjects(response));
		}, (error) => {
			reject(error)
		});
	})
}