import { Assignment } from "./assignment";

// Filtrera uppgifter baserat på medlem
export const filterByMember = (assignments: Assignment[], member: string) => {
    return assignments.filter(assignment => assignment.assigned === member);
}

// Filtrera uppgifter baserat på kategori
export const filterByCategory = (assignments: Assignment[], category: string) => {
    return assignments.filter(assignment => assignment.category === category);
}