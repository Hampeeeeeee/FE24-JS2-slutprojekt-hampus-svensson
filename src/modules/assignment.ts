const base_url: string = "https://fe24-js2-slutprojekt-hampus-default-rtdb.europe-west1.firebasedatabase.app/";

interface Assignment {
    title: string,
    description: string,
    role: string,
    status: string,
    assigned?: undefined | string,
    timestamp: number
}

export async function addAssignment(event: Event): Promise<void> {
    event.preventDefault();  

    const title = (document.querySelector('#assignmentName') as HTMLInputElement).value.trim();
    const description = (document.querySelector('#assignmentDescription') as HTMLTextAreaElement).value.trim();
    const role = (document.querySelector('#assignmentRole') as HTMLSelectElement).value;

    if (!title || !role) {
        alert("Please provide both title and role.");
        return;
    }
    
    const newAssignment: Assignment = {
        title: title,
        description: description,
        role: role,
        status: "New",
        timestamp: Date.now(),  
    };

    const url = base_url + 'assignments.json';
    const options = {
        method: "POST",
        body: JSON.stringify(newAssignment),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    };

    try {
        console.log(url)
        // Skicka uppgiften till din server via fetch
        const res = await fetch(url, options);
        if (!res.ok) throw new Error("Something went wrong when adding an assignment.");
    
        const data = await res.json();
        console.log("Assignment added:", data);
    
        // Återställ formuläret efter att uppgiften är skapad
        (document.querySelector("#assignmentName") as HTMLInputElement).value = "";
        (document.querySelector("#assignmentDescription") as HTMLTextAreaElement).value = "";
        (document.querySelector("#assignmentRole") as HTMLSelectElement).selectedIndex = 0;
    } catch (error) {
        console.error("Error:", error);
        alert("Could not add assignment, try again!");
    }
}

