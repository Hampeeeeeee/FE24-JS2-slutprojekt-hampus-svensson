import { addMember } from "./modules/member.ts"  // Importera addMember från member.ts
import { addAssignment } from "./modules/assignment.ts";

document.addEventListener("DOMContentLoaded", () => {
    // Lägg till eventlistener på formuläret när DOM är klar
    const memberform = document.querySelector('#addMemberForm') as HTMLFormElement;
    
    if (memberform) {
        memberform.addEventListener('submit', addMember);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // Lägg till eventlistener på formuläret när DOM är klar
    const assignmentform = document.querySelector('#addAssignmentForm') as HTMLFormElement;
    
    if (assignmentform) {
        assignmentform.addEventListener('submit', addAssignment);
    }
});

