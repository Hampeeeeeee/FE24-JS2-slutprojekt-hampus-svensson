import { addMember } from "./modules/member.ts";
import { addAssignment } from "./modules/assignment.ts";
import { getAllTasks } from "./modules/render.ts";
import { assignTaskToMember, getMembers } from "./modules/member.ts";
import { sortByTimestamp, sortByTitle } from "./modules/sorting.ts";

document.addEventListener("DOMContentLoaded", () => {

    const memberform = document.querySelector('#addMemberForm') as HTMLFormElement;

    if (memberform) {
        memberform.addEventListener('submit', addMember);
    }
});

document.addEventListener("DOMContentLoaded", () => {
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
                taskElement.setAttribute('data-timestamp', task.timestamp.toString());

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
                
                todoContainer.appendChild(taskElement);

                const assignToBtn = taskElement.querySelector('#assignToBtn') as HTMLButtonElement | null;
                if (assignToBtn) {
                    assignToBtn.addEventListener('click', () => {
                        assignTaskToMember(task.category, task.category, assignToBtn);
                    });
                }

            });
        }
    } catch (error) {
        console.error('Error displaying assignments:', error);
    }
});

document.querySelector('#timestampSorting')?.addEventListener('change', (event) => {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue === 'asc') {
        sortByTimestamp('oldestToNewest');
    } else if (selectedValue === 'desc') {
        sortByTimestamp('newestToOldest');
    }
});

document.querySelector('#titleSorting')?.addEventListener('change', (event) => {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue === 'titleAsc') {
        sortByTitle('titleAsc');
    } else if (selectedValue === 'titleDesc') {
        sortByTitle('titleDesc');
    }
});

async function populateMemberFilter() {
    const memberFilter = document.querySelector('#memberFilter') as HTMLSelectElement;

    try {
        const members = await getMembers();
        
        members.forEach((member) => {
            const option = document.createElement('option');
            option.value = member.name; 
            option.textContent = member.name;
            memberFilter.appendChild(option);
        });
    } catch (error) {
        console.error('Error populating member filter:', error);
    }
}

document.addEventListener('DOMContentLoaded', populateMemberFilter);






