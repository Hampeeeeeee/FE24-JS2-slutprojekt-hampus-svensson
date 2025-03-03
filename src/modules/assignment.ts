import { getDatabase, ref, push, set } from "firebase/database";

const base_url: string = "https://fe24-mp3-hampus-svensson-default-rtdb.europe-west1.firebasedatabase.app/";

interface Assignment {
    title: string,
    description: string,
    role: string,
    status: string,
    assigned?: undefined | string,
    timestamp: number
}

export async function addAssignment(event: Event): Promise<void> {
    event.preventDefault();  // Prevent form from reloading the page

    // Hämta värdena från formuläret
    const title = (document.querySelector('#assignmentName') as HTMLInputElement).value.trim();
    const description = (document.querySelector('#assignmentDescription') as HTMLTextAreaElement).value.trim();
    const role = (document.querySelector('#assignmentRole') as HTMLSelectElement).value;

    if (!title || !role) {
        alert("Please provide both title and role.");
        return;
    }

    // Skapa en uppgift med ett timestamp
    const newAssignment: Assignment = {
        title: title,
        description: description,
        role: role,
        status: "New",  // Default status
        timestamp: Date.now(),  // Get current timestamp
    };

    const url = base_url + '/assignments.json';  // Sätt rätt URL till din server
    const options = {
        method: "POST",
        body: JSON.stringify(newAssignment),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    };

    try {
        // Skicka uppgiften till din server via fetch
        const res = await fetch(url, options);
        if (!res.ok) throw new Error("Något gick fel när uppgiften skulle läggas till.");
    
        const data = await res.json();
        console.log("Uppgift tillagd:", data);
    
        // Hämta referens till Firebase-databasen
        const database = getDatabase();
    
        // Skapa en referens till 'assignments' och lägg till en ny uppgift
        const assignmentsRef = ref(database, "assignments");
        const newAssignmentRef = push(assignmentsRef);
    
        await set(newAssignmentRef, {
            title: newAssignment.title,
            description: newAssignment.description,
            role: newAssignment.role,
            status: newAssignment.status,
            timestamp: newAssignment.timestamp,
        });
    
        console.log("Uppgift tillagd på Firebase");
    
        // Återställ formuläret efter att uppgiften är skapad
        (document.querySelector("#assignmentName") as HTMLInputElement).value = "";
        (document.querySelector("#assignmentDescription") as HTMLTextAreaElement).value = "";
        (document.querySelector("#assignmentRole") as HTMLSelectElement).selectedIndex = 0;
    } catch (error) {
        console.error("Fel:", error);
        alert("Uppgiften kunde inte läggas till, försök igen!");
    }
}

