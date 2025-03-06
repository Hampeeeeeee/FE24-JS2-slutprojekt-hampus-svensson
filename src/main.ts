import { addMember } from "./modules/member.ts";
import { addAssignment } from "./modules/assignment.ts";
import { getAllTasks } from "./modules/render.ts";
import { assignTaskToMember } from "./modules/member.ts";

document.addEventListener("DOMContentLoaded", () => {

    const memberform = document.querySelector('#addMemberForm') as HTMLFormElement;

    if (memberform) {
        memberform.addEventListener('submit', addMember);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // Lägg till eventlistener på formuläret när DOM är klar
    const assignmentform = document.querySelector('#addAssignmentForm') as HTMLFormElement;

    if (assignmentform) {
        assignmentform.addEventListener('submit', addAssignment);
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const tasks = await getAllTasks(); // Hämta alla tasks

        const todoContainer = document.getElementById('todoContainer'); // Din container
        if (todoContainer) {
            // Loopa igenom alla tasks och skapa HTML för varje
            Object.keys(tasks).forEach(taskId => {
                const task = tasks[taskId];

                // Skapa en div för varje uppgift
                const taskElement = document.createElement('div');
                taskElement.classList.add('assignment');

                const timestamp = task.timestamp;
                const date = new Date(timestamp);
                const formattedDate = date.toLocaleString('sv-SE');

                taskElement.innerHTML = `
                    <h3>${task.title}</h3>
                    <p><i>${task.description}</i></p>
                    <h4><b>Qualification: ${task.category}</b></h4>
                    <h5>${formattedDate}</h5>
                    <button id="assignToBtn">Assign to</button>
                `;
                
                // Lägg till uppgiften i todo-container
                const todoContainer = document.getElementById('todoContainer')
                todoContainer?.appendChild(taskElement);

                const assignToBtn = taskElement.querySelector('#assignToBtn') as HTMLButtonElement | null;
                if (assignToBtn) {
                    assignToBtn.addEventListener('click', () => {
                        assignTaskToMember(task.category, task.category, assignToBtn); // Tilldela uppgift baserat på kategori
                    });
                }

            });
        }
    } catch (error) {
        console.error('Error displaying assignments:', error);
    }
});
