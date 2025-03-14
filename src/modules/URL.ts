// Hämtar firebase url'n med all backend information.

import { Assignment } from "./assignment";

export const base_url:string = "https://fe24-js2-slutprojekt-hampus-default-rtdb.europe-west1.firebasedatabase.app/assignments"

export async function getAllTasks(): Promise<Assignment[]> {
   
    const url:string = `${base_url}.json`; // Lägg till ".json" för att hämta data från Firebase

    try {
        const res = await fetch(url); // Gör ett GET-anrop till Firebase
        if (!res.ok) {
            throw new Error('Something went wrong fetching data');
        }

        const taskObj: Object = await res.json(); // Konvertera svaret till JSON

        // gör om objektet till en array.
        const taskArray = Object.entries(taskObj).map( ([id, obj])=> ({
            id: id,
            ...obj
        }));
        console.log(taskArray);
        return taskArray; // Returnera de hämtade uppgifterna

    } catch (error) {
        console.error('Error when fetching assignments:', error);
        return []; '// Returnera ett tomt objekt om något går fel'
    }
}