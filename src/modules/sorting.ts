
// Funktion som sorterar DOM-element baserat på Timestamp
function sortByTimestamp(order: 'oldestToNewest' | 'newestToOldest'): void {
    const container = document.querySelector('#inProgressContainer');
    if (!container) return;

    // Hämta alla uppgiftselement i containern
    const assignmentElements = Array.from(container.querySelectorAll('.assignment')) as HTMLElement[];

    // Debugga och logga timestamps
    assignmentElements.forEach((el) => {
        const timestamp = parseInt(el.getAttribute('data-timestamp') || '0');
        console.log(`Element ID: ${el.id}, Timestamp: ${timestamp}`);
    });

    // Sortera elementen baserat på timestamp
    const sortedElements = assignmentElements.sort((a, b) => {
        const timestampA = parseInt(a.getAttribute('data-timestamp') || '0');
        const timestampB = parseInt(b.getAttribute('data-timestamp') || '0');

        console.log(`Comparing ${timestampA} with ${timestampB}`);

        return order === 'newestToOldest' ? timestampB - timestampA : timestampA - timestampB;
    });

    // Omordna elementen i containern utan att skapa nya
    sortedElements.forEach(el => container.appendChild(el)); // Flytta varje element till rätt plats
}

// Funktion som sorterar DOM-element baserat på titel (A-Z eller Z-A)
function sortByTitle(order: 'titleAsc' | 'titleDesc'): void {
    const container = document.querySelector('#inProgressContainer');
    if (!container) return;

    // Hämta alla uppgiftselement i containern
    const assignmentElements = Array.from(container.querySelectorAll('.assignment')) as HTMLElement[];

    // Sortera elementen baserat på titeln
    const sortedElements = assignmentElements.sort((a, b) => {
        const titleA = a.querySelector('h3')?.textContent?.toLowerCase() || '';
        const titleB = b.querySelector('h3')?.textContent?.toLowerCase() || '';

        if (order === 'titleAsc') {
            return titleA.localeCompare(titleB);
        } else {
            return titleB.localeCompare(titleA);
        }
    });

    // Omordna elementen i containern utan att skapa nya
    sortedElements.forEach(el => container.appendChild(el)); // Detta flyttar elementet till rätt plats
}

export { sortByTimestamp, sortByTitle }