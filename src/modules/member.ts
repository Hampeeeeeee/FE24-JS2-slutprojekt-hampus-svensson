const base_url: string = "https://fe24-js2-slutprojekt-hampus-default-rtdb.europe-west1.firebasedatabase.app/";

interface Member {
    name: string;
    role: string;
}

export async function addMember(event: Event): Promise<void> {
    event.preventDefault();

    const name: string = (document.querySelector('#memberName') as HTMLInputElement).value.trim();
    const rolesSelect: HTMLSelectElement = document.querySelector('#memberRole') as HTMLSelectElement;

    const selectedRole = rolesSelect.value;  // "value" ger oss den valda rollen som en sträng

    // Validering: Kontrollera om namn är ifyllt och att en roll är vald
    if (!name || !selectedRole) {
        alert("Vänligen fyll i ett namn och välj en roll.");
        return;
    }

    const memberData = {
        name: name,
        role: selectedRole  // Här lagrar vi den valda rollen som en sträng
    };

    const url = base_url + '/members.json';
    const options = {
        method: "POST",
        body: JSON.stringify(memberData),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    };

    try {
        const res = await fetch(url, options);
        if (!res.ok) throw new Error("Något gick fel när medlemmen skulle läggas till.");

        const data = await res.json();
        console.log("Medlem tillagd:", data);

        const memberDiv = document.createElement("div");
        memberDiv.classList.add("team-member");
        memberDiv.textContent = `${name} - ${selectedRole}`;
        document.querySelector('#teamList')?.appendChild(memberDiv);

        (document.querySelector('#memberName') as HTMLInputElement).value = "";
        rolesSelect.selectedIndex = -1;

    } catch (error) {
        console.error("Fel:", error);
        alert("Medlemmen kunde inte läggas till, försök igen!");
    }
}

// Funktion för att hämta medlemmar från Firebase Realtime Database
async function getMembers(): Promise<Member[]> {
    const url = 'https://fe24-js2-slutprojekt-hampus-default-rtdb.europe-west1.firebasedatabase.app/members.json';

    try {
        const response = await fetch(url); // Hämta data från Firebase
        if (!response.ok) {
            throw new Error('Failed to fetch members');
        }

        const membersData: { [key: string]: Member } = await response.json(); // Konvertera svaret till JSON
        const members = Object.values(membersData); // Omvandla objektet till en array
        return members;
    } catch (error) {
        console.error('Error fetching members:', error);
        return [];
    }
}

// Funktion för att visa en modal med alla medlemmar som kan tilldelas
function showMemberSelectionModal(matchingMembers: Member[], taskCategory: string, button: HTMLButtonElement) {
    // Skapa modalens HTML
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Assign task for category: ${taskCategory}</h3>
            <ul>
                ${matchingMembers.map((member) => `
                    <li>
                        <button class="assign-btn">${member.name} (${member.role})</button>
                    </li>
                `).join('')}
            </ul>
            <button class="close-modal">Close</button>
        </div>
    `;

    // Lägg till modal till body
    document.body.appendChild(modal);

    const buttonRect = button.getBoundingClientRect(); // Hämta knappens position
    modal.style.position = 'absolute';
    modal.style.left = `${buttonRect.right + window.scrollX}px`; // Placera modalen till höger om knappen
    modal.style.top = `${buttonRect.top + window.scrollY}px`;

    const assignButtons = modal.querySelectorAll('.assign-btn');
    assignButtons.forEach((assignButton, index) => {
        assignButton.addEventListener('click', () => {
            const selectedMember = matchingMembers[index];
            alert(`Task assigned to ${selectedMember.name} (${selectedMember.role})`);

            if (modal.parentElement) {
                modal.parentElement.removeChild(modal); // Stäng modalen
            }
        });

        const closeModalButton = modal.querySelector('.close-modal');
        closeModalButton?.addEventListener('click', () => {
            if (modal.parentElement) {
                modal.parentElement.removeChild(modal); // Ta bort modalen om den fortfarande finns i DOM
            }
        });
    });
}

export async function assignTaskToMember(role: string, taskCategory: string, button: HTMLButtonElement) {
    const members = await getMembers(); // Hämta medlemmarna från Firebase

    // Hitta alla medlemmar som har samma roll
    const matchingMembers = members.filter(m => m.role === role);

    if (matchingMembers.length > 0) {
        showMemberSelectionModal(matchingMembers, taskCategory, button); // Visa en modal med medlemmarna
    } else {
        alert('No member found for this role.');
    }
}