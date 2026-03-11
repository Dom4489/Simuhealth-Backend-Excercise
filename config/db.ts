export interface User {
 id: number;
 username: string;
 password: string;
}

export interface Todo {
 id: number;
 title: string;
 description: string;
 category: string;
 completed: boolean;
 userId: number; // Foreign key referencing User
}

// Passwords are bcrypt hashes (cost 10)
// Dom: Simuhealth123
// Sam: SammyLu56
// Rioto: REI11307
export const users: User[] = [
 { id: 1, username: "Dom", password: "$2b$10$CeQwUk3PCrNuedlBePQUk.WJ6cG/3DhMG5Zrj0BCUyM7EyJNt1ubW" },
 { id: 2, username: "Sam", password: "$2b$10$wsxRjiJVwRyCpxyigD1KOuvgfxor27ygGS9TDNb6nq0RZ953W65A2" },
 { id: 3, username: "Rioto", password: "$2b$10$KzkZibBt3HS0DKos1mTpV.c.ccKeNdtIsvySge.IbzJpFTYeDnSEG" },
]

export const todos: Todo[] = [
 { id: 1, title: "Code", description: "Complete Simuhealth backend excersise", category: "personal", completed: true, userId: 1 },
 { id: 2, title: "Fold Clothes", description: "Get clothes out of dryer and fold them", category: "chores", completed: false, userId: 2 },
 { id: 3, title: "Gym", description: "Hit the gym (Push day)", category: "personal", completed: false, userId: 3 },
 { id: 4, title: "Dinner with Rioto", description: "Get dinner with Rioto at Zoomak", category: "personal", completed: false, userId: 1 },
 { id: 5, title: "Dinner with Dom", description: "Get dinner with Dom at Zoomak", category: "personal", completed: false, userId: 3 },
 { id: 6, title: "CPSC 304", description: "Complete milestone 3 for CPSC 304 project", category: "school", completed: true, userId: 2 },
 { id: 7, title: "AWS", description: "Research AWS and find learning tools for it", category: "study", completed: true, userId: 1 },
]

// Get current last id, then increment by 1
export const idCounters = {
 todoIdCounter: todos.length + 1,
}