// Funktioner som renderar uppgifterna från getAllTasks(). Uppdaterar status på firebase 
// beroende på vilken knapp som klickas.

import { getAllTasks } from "./URL.ts";
import { Assignment } from "./assignment.ts";
import { assignTaskToMember } from "./member.ts";

export let tasks:Assignment[];

// Renderar alla tasks i respektive container.
export async function renderAllTasks( tasks?: Assignment[]): Promise<void> {
    try {
        if(!tasks)tasks = await getAllTasks();

        const todoContainer = document.getElementById('todoContainer') as HTMLDivElement;
        const inProgressContainer = document.getElementById('inProgressContainer') as HTMLDivElement;
        const doneContainer = document.getElementById('doneContainer') as HTMLDivElement;

        todoContainer.innerHTML = '';
        inProgressContainer.innerHTML = '';
        doneContainer.innerHTML = '';
        if (todoContainer) {
            // Loopa igenom alla tasks och skapa HTML för varje
            tasks.forEach(task => {

                if (task.status === 'new') {
                    // Skapa en div för varje uppgift
                    const taskElement = document.createElement('div');
                    taskElement.classList.add('assignment');
                    taskElement.setAttribute('data-timestamp', task.timestamp.toString());

                    const timestamp = task.timestamp;
                    const date = new Date(timestamp);
                    const formattedDate = date.toLocaleString('sv-SE');

                    taskElement.innerHTML = `
                        <h2>To do</h2>
                        <h3>${task.title}</h3>
                        <p><i>${task.description}</i></p>
                        <h4><b>Qualification: ${task.category}</b></h4>
                        <h5>${formattedDate}</h5>
                        <button id="assignToBtn">Assign to</button>
                    `;

                    todoContainer.appendChild(taskElement);

                    const assignToBtn = taskElement.querySelector('#assignToBtn') as HTMLButtonElement | null;
                    if (assignToBtn) {
                        assignToBtn.addEventListener('click', async () => {
                            assignTaskToMember(task.category, task.category, assignToBtn, task.id as string);

                        });
                    }
                }
                else if (task.status === 'in progress') {

                    // Skapa en div för varje uppgift
                    const taskElement = document.createElement('div');
                    taskElement.classList.add('assignment');
                    taskElement.setAttribute('data-timestamp', task.timestamp.toString());

                    const timestamp = task.timestamp;
                    const date = new Date(timestamp);
                    const formattedDate = date.toLocaleString('sv-SE');

                    taskElement.innerHTML = `
                        <h2>In progress</h2>
                        <h3>${task.title}</h3>
                        <p><i>${task.description}</i></p>
                        <h4><b>Qualification: ${task.category}</b></h4>
                        <h5>${formattedDate}</h5>
                        <p>Assigned to: ${task.assigned}</p>
                        <button id="doneBtn">Done</button>
                    `;

                    inProgressContainer.appendChild(taskElement);

                    const doneBtn = taskElement.querySelector('#doneBtn') as HTMLButtonElement | null;
                    if (doneBtn) {
                        doneBtn.addEventListener('click', async () => {

                            const url = `https://fe24-js2-slutprojekt-hampus-default-rtdb.europe-west1.firebasedatabase.app/assignments/${task.id}.json`;

                            const doneTask = {
                                status: 'done',
                            }
                            const options = {
                                method: "PATCH",
                                body: JSON.stringify(doneTask),
                                headers: {
                                    "Content-Type": "application/json; charset=UTF-8"
                                }
                            };
                            try {
                                const response = await fetch(url, options);
                                if (response.ok) {
                                    console.log("Task status updated to done");
                                    renderAllTasks();
                                } else {
                                    console.error('Failed to update task status');
                                }
                            } catch (error) {
                                console.error('Error while updating task status:', error);
                            }
                        });
                    }
                }
                else if (task.status === 'done') {

                    // Skapa en div för varje uppgift
                    const taskElement = document.createElement('div');
                    taskElement.classList.add('assignment');
                    taskElement.setAttribute('data-timestamp', task.timestamp.toString());

                    const timestamp = task.timestamp;
                    const date = new Date(timestamp);
                    const formattedDate = date.toLocaleString('sv-SE');

                    taskElement.innerHTML = `
                        <h2>Done</h2>
                        <h3>${task.title}</h3>
                        <p><i>${task.description}</i></p>
                        <h4><b>Qualification: ${task.category}</b></h4>
                        <h5>${formattedDate}</h5>
                        <p>Assigned to: ${task.assigned}</p>
                        <button id="deleteBtn">Delete</button>
                    `;

                    doneContainer.appendChild(taskElement);

                    const deleteBtn = taskElement.querySelector('#deleteBtn') as HTMLButtonElement | null;
                    if (deleteBtn) {
                        deleteBtn.addEventListener('click', async () => {
                            const url = `https://fe24-js2-slutprojekt-hampus-default-rtdb.europe-west1.firebasedatabase.app/assignments/${task.id}.json`;

                            const deletedTask = {
                                status: 'deleted',
                            }
                            const options = {
                                method: "DELETE",
                                body: JSON.stringify(deletedTask),
                                headers: {
                                    "Content-Type": "application/json; charset=UTF-8"
                                }
                            };
                            try {
                                const response = await fetch(url, options);
                                if (response.ok) {
                                    console.log("Task status updated to deleted");
                                } else {
                                    console.error('Failed to update task status');
                                }
                            } catch (error) {
                                console.error('Error while updating task status:', error);
                            }
                        });
                    }
                }
            });
        }
    } catch (error) {
        console.error('Error displaying assignments:', error);
    }
}