export type MockSubject = {
    id: number;
    courseCode: string;
    name: string;
    department: string;
    description: string;
};

export const MOCK_SUBJECTS: MockSubject[] = [
    {
        id: 1,
        courseCode: "CS101",
        name: "Introduction to Computer Science",
        department: "CS",
        description: "Covers programming fundamentals, algorithms, and core computing concepts.",
    },
    {
        id: 2,
        courseCode: "MATH201",
        name: "Linear Algebra",
        department: "Math",
        description: "Introduces vector spaces, matrices, and linear transformations with applications.",
    },
    {
        id: 3,
        courseCode: "ENG150",
        name: "Academic Writing",
        department: "English",
        description: "Builds research, argumentation, and academic communication skills for university work.",
    },
];
