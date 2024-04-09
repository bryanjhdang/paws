import axios from "axios";
import { Pet, Project, TimeEntry, Todo, User } from "./models";
        
// Account
// todo: remove accountId from this function, handle on backend instead?
export function getAccount(accountId: string, accessToken: string): Promise<User> {
	const createUser = (any : any): User => {
		return new User(
			any.data.id,
			any.data.displayName,
			any.data.pet,
			any.data.timeEntries,
			any.data.currentTimerStart,
			any.data.projects,
			any.data.totalCoins,
			any.data.runningTime
		);
	}

	return new Promise<User>((resolve, reject) => {
		axios({
			method: 'get',
			url: `${import.meta.env.VITE_API_SERVER_URL}/account/?id=${accountId}`,
			headers: { Authorization: `Bearer ${accessToken}` }
		})
		.then((response) => {
			resolve(createUser(response));
		}, (error) => {
			reject(error);
		});
	})
}

export function postAccountCreate(): void {

}

// Pet
export async function getPet(accountId: string, accessToken: string): Promise<Pet> {
	try {
		const response = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}/account/?id=${accountId}`, {
			headers: { Authorization: `Bearer ${accessToken}`}
		});
		const { restId, workId, ownedCats } = response.data.pet;
		return new Pet(restId, workId, ownedCats);
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function buyPet(id: number, cost: number, accessToken: string) {
	try {
		await axios.put(`${import.meta.env.VITE_API_SERVER_URL}/pet/buy?id=${id}&cost=${cost}`, {
			headers: { Authorization: `Bearer ${accessToken}`}
		});
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function equipPet(pet: Pet, accessToken: string) {
	try {
		await axios.patch(`${import.meta.env.VITE_API_SERVER_URL}/pet/equip?restId=${pet.restId}&workId=${pet.workId}`, {
				headers: { Authorization: `Bearer ${accessToken}`}
		});
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function getCoins(accountId: string, accessToken: string): Promise<number> {
	try {
		const response = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}/account/?id=${accountId}`, {
			headers: { Authorization: `Bearer ${accessToken}`}
		})
		return response.data.totalCoins;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

// TimeEntry
export function getTimeEntry(accessToken: string): Promise<TimeEntry[]> {

	const createTimeEntries = (any : any): TimeEntry[] => {
		return any.data.timeEntries.map((element: any) => {
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
			url: `${import.meta.env.VITE_API_SERVER_URL}/timeEntry`,
			headers: { Authorization: `Bearer ${accessToken}` }
		})
		.then((response) => {
			resolve(createTimeEntries(response));
		}, (error) => {
			reject(error);
		})
	})
}

export function postTimeEntryStart(timeEntry: TimeEntry, accessToken: string): void {
	axios({
		method: 'post',
		url: `${import.meta.env.VITE_API_SERVER_URL}/timeEntry/start`,
		headers: { Authorization: `Bearer ${accessToken}` },
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

export function postTimeEntryStop(endTimeNumber: number, accessToken: string): void {
	axios({
		method: 'post',
		url: `${import.meta.env.VITE_API_SERVER_URL}/timeEntry/stop`,
		headers: { Authorization: `Bearer ${accessToken}` },
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
export async function postProject(project: Project, accessToken: string) {
	console.log(project);
	axios({
		method: 'post',
		url: `${import.meta.env.VITE_API_SERVER_URL}/timeEntry/project`,
		headers: { Authorization: `Bearer ${accessToken}` },
		data: {
			name: project.name,
			hex: project.hex,
			dateCreated: project.dateCreated
		}
	})
	.then((response) => {
		project.id = response.data.projectId;
	}, (error) => {
		console.log(error);
	});
}

export async function getProjects(accessToken: string): Promise<Project[]> {
	const createProjects = (any: any): Project[] => {
		return any.data.projects.map((element: any) => {
			return new Project(element.hex, element.name, element.dateCreated, element.id);
		});
	}

	return new Promise<Project[]>((resolve, reject) => {
		axios({
			method: 'get',
			url: `${import.meta.env.VITE_API_SERVER_URL}/timeEntry/project`,
			headers: { Authorization: `Bearer ${accessToken}` }
		})
		.then((response) => {
			resolve(createProjects(response));
		}, (error) => {
			reject(error)
		});
	})
}

// todo: correct syntax here? TEST
export async function deleteProject(id: string, accessToken: string) {
	try {
		await axios.delete(`${import.meta.env.VITE_API_SERVER_URL}/timeEntry/project/${id}`, {
			headers: { Authorization: `Bearer ${accessToken}` }
		}); 
	} catch (error) {
		console.error(error);
		throw error;
	}
}

// ToDo
export async function postTodo(todo: Todo, accessToken: string) {
	axios({
		method: 'post',
		url: `${import.meta.env.VITE_API_SERVER_URL}/todo`,
		headers: { Authorization: `Bearer ${accessToken}` },
		data: {
			task: todo.task,
			dateCreated: todo.dateCreated
		}
	})
	.then((response) => {
		todo.id = response.data.id;
	}, (error) => {
		console.log(error);
	});
}

// todo: correct syntax? TEST
export async function deleteTodo(id: string, accessToken: string) {
	try {
		await axios.delete(`${import.meta.env.VITE_API_SERVER_URL}/todo/${id}`, {
			headers: { Authorization: `Bearer ${accessToken}` }
		}); 
	} catch (error) {
		console.error(error);
		throw error;
	}
}

// todo: correct syntax? 3rd argument like this?
export async function patchTodo(todo: Todo, accessToken: string): Promise<Todo> {
  try {
    const response = await axios.patch(`${import.meta.env.VITE_API_SERVER_URL}/todo/`, todo, {
			headers: { Authorization: `Bearer ${accessToken}` }
		});
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; 
  }
}

export async function getTodo(accessToken: string): Promise<Todo[]> {
	const createTodo = (any: any): Todo[] => {
		return any.data.todos.map((element: any) => {
			return new Todo(element.task, element.dateCreated, element.done, element.id);
		});
	}

	return new Promise<Todo[]>((resolve, reject) => {
		axios({
			method: 'get',
			url: `${import.meta.env.VITE_API_SERVER_URL}/todo`,
			headers: { Authorization: `Bearer ${accessToken}` }
		})
		.then((response) => {
			resolve(createTodo(response));
		}, (error) => {
			reject(error);
		});
	})
}