const base_url: string = "https://fe24-js2-slutprojekt-hampus-default-rtdb.europe-west1.firebasedatabase.app/";

export interface Assignment {
    title: string,
    description: string,
    category: string,
    status: string,
    assigned?: undefined | string,
    timestamp: number
}

export async function fetchAssignments(sortType: string = 'timestampDesc'): Promise<void> {
    const url = base_url + 'assignments.json';
    try {
        const res = await fetch(url);
        const assignments = await res.json();
        
        const assignmentsArray: Assignment[] = Object.values(assignments);
        const assignedAssignments = assignmentsArray.filter(assignment => assignment.assigned !== undefined);

        // Rendera de sorterade uppgifterna utan att skapa nya DOM-element
        renderAssignments(assignedAssignments);

    } catch (error) {
        console.error("Error fetching assignments:", error);
    }
}

export async function addAssignment(event: Event): Promise<void> {
    event.preventDefault();

    const title = (document.querySelector('#assignmentName') as HTMLInputElement).value.trim();
    const description = (document.querySelector('#assignmentDescription') as HTMLTextAreaElement).value.trim();
    const category = (document.querySelector('#assignmentRole') as HTMLSelectElement).value;

    if (!title || !category) {
        alert("Please provide both title and role.");
        return;
    }

    const newAssignment: Assignment = {
        title: title,
        description: description,
        category: category,
        status: "New",
        timestamp: Date.now(),
    };

    console.log("New Assignment to add:", newAssignment); // Debugga om rätt data skickas

    const url = base_url + 'assignments.json';

    const options = {
        method: "POST",
        body: JSON.stringify(newAssignment),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    };

    try {
        const res = await fetch(url, options);
        if (!res.ok) throw new Error("Something went wrong when adding an assignment.");

        const data = await res.json();
        console.log("Assignment added:", data);

        // Återställ formuläret efter att uppgiften är skapad
        (document.querySelector("#assignmentName") as HTMLInputElement).value = "";
        (document.querySelector("#assignmentDescription") as HTMLTextAreaElement).value = "";
        (document.querySelector("#assignmentRole") as HTMLSelectElement).selectedIndex = 0;

        // Hämta och rendera alla uppgifter efter att den nya har lagts till
        fetchAssignments();
    } catch (error) {
        console.error("Error:", error);
        alert("Could not add assignment, try again!");
    }
}

// function sortAssignments(assignments: Assignment[], sortType: string): Assignment[] {
//     switch (sortType) {
//         case 'timestampDesc':
//             return assignments.sort((a, b) => b.timestamp - a.timestamp);
//         case 'timestampAsc':
//             return assignments.sort((a, b) => a.timestamp - b.timestamp);
//         case 'titleAsc':
//             return assignments.sort((a, b) => a.title.localeCompare(b.title));
//         case 'titleDesc':
//             return assignments.sort((a, b) => b.title.localeCompare(a.title));
//         default:
//             return assignments;
//     }
// }

function renderAssignments(assignments: Assignment[]): void {
        

    const container = document.querySelector('#inProgressContainer');
    if (!container) return;

    // Här kan vi också logga uppgifter som ska renderas
    console.log(assignments);

    // Sortera uppgifterna baserat på det valda sorteringsalternativet
    // const sortedAssignments = sortAssignments(assignments, sortType);

    // // Hämta alla befintliga uppgiftselement i DOM:en
    // const assignmentElements = Array.from(container.querySelectorAll('.assignment')) as HTMLElement[];

    // sortedAssignments.forEach((assignment) => {
    //     let element = assignmentElements.find(el => el.id === `assignment-${assignment.timestamp}`);
        
    //     if (!element) {
    //         // Om det inte finns något element, skapa det
    //         element = document.createElement('div');
    //         element.classList.add('assignment');
    //         element.id = `assignment-${assignment.timestamp}`;

    //         // Lägg till data-timestamp som en numerisk tidsstämpel
    //         element.setAttribute('data-timestamp', String(assignment.timestamp));

    //         // Lägg till uppgiftens information
    //         element.innerHTML = `
    //             <h3>${assignment.title}</h3>
    //             <p>${assignment.description}</p>
    //             <p>Category: ${assignment.category}</p>
    //             <p>Status: ${assignment.status}</p>
    //             <p>Assigned to: ${assignment.assigned || 'Not assigned'}</p>
    //             <p>Timestamp: ${new Date(assignment.timestamp).toLocaleString()}</p>
    //             <button class="assign-to-btn">Assign to</button>
    //         `;

    //         container.appendChild(element);
    //     } else {
    //         // Uppdatera elementet om det redan finns
    //         element.innerHTML = `
    //             <h3>${assignment.title}</h3>
    //             <p>${assignment.description}</p>
    //             <p>Category: ${assignment.category}</p>
    //             <p>Status: ${assignment.status}</p>
    //             <p>Assigned to: ${assignment.assigned || 'Not assigned'}</p>
    //             <p>Timestamp: ${new Date(assignment.timestamp).toLocaleString()}</p>
    //             <button class="assign-to-btn">Assign to</button>
    //         `;
    //     }
    // });
}

