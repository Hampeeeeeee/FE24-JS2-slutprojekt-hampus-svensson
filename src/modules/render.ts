const base_url:string = "https://fe24-js2-slutprojekt-hampus-default-rtdb.europe-west1.firebasedatabase.app/assignments"

export async function getAllTasks(): Promise<Object> {
   
    const url:string = `${base_url}.json`; // Lägg till ".json" för att hämta data från Firebase

    try {
        const res = await fetch(url); // Gör ett GET-anrop till Firebase
        if (!res.ok) {
            throw new Error('Something went wrong fetching data');
        }

        const taskObj = await res.json(); // Konvertera svaret till JSON
        return taskObj; // Returnera de hämtade uppgifterna

    } catch (error) {
        console.error('Error when fetching assignments:', error);
        return {}; // Returnera ett tomt objekt om något går fel
    }
}