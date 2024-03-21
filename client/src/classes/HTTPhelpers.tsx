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
		url: `${import.meta.env.VITE_API_SERVER_URL}/timeEntry/project`,
		data: {
			hex: project.hex,
			name: project.name
		}
	})
	.then((response) => {
		console.log(response.data.projectId);
		project.id = response.data.projectId;
	}, (error) => {
		console.log(error);
	});
}

export async function getProjects(): Promise<Project[]> {
	const createProjects = (any: any): Project[] => {
		console.log(any.data.projects);
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