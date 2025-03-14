// Filtrerar members och kategori.
import { Assignment } from "./assignment";

// Filtrera uppgifter baserat på medlem

export const filterByMember = (tasks: Assignment[], member: string) => {
    return tasks.filter(task => task.assigned === member);
}

// Filtrera uppgifter baserat på kategori
export const filterByCategory = (tasks: Assignment[], category: string) => {
    return tasks.filter(task => task.category === category);
}