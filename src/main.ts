// Mycket av det som syns på hemsidan finns här, forms, sortering, populera medlemmar till filterna.

import { addMember } from "./modules/member.ts";
import { addAssignment, Assignment } from "./modules/assignment.ts";
import { getMembers } from "./modules/member.ts";
import { sortByTimestamp, sortByTitle } from "./modules/sorting.ts";
import { filterByMember, filterByCategory } from "./modules/filter.ts";
import { renderAllTasks } from "./modules/render.ts";
import { getAllTasks } from "./modules/URL.ts";

let tasks;
getAllTasks().then(t => tasks = t);

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
})

// Populera medlemsdropdownen
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

renderAllTasks();

const memberFilter = document.querySelector('#memberFilter')  as HTMLSelectElement;
console.log(memberFilter);
memberFilter?.addEventListener('change', () =>{
    console.log(memberFilter.value);

    const filteredTasks = filterByMember(tasks, memberFilter.value)
    renderAllTasks(filteredTasks)
    console.log(filteredTasks);
})

const categoryFilter = document.querySelector('#categoryFilter') as HTMLSelectElement;
console.log(categoryFilter);
categoryFilter?.addEventListener('change', () =>{
    console.log(categoryFilter.value);

    const filteredTasks = filterByCategory(tasks, categoryFilter.value)
    renderAllTasks(filteredTasks);
    console.log(filteredTasks)
})





