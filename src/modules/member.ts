const base_url: string = "https://fe24-js2-slutprojekt-hampus-default-rtdb.europe-west1.firebasedatabase.app/";

export async function addMember(event: Event):Promise<void> {
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