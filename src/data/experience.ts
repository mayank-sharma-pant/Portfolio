export interface LogEntry {
    id: string;
    role: string;
    company: string;
    period: string;
    type: string;
    details: string[];
}

export const experience: LogEntry[] = [
    {
        id: "LOG_2024_HEALIORA",
        role: "Co-founder & Product-Focused Engineer",
        company: "Healiora (CU-TBI Incubated)",
        period: "Mar 2024 – Present",
        type: "STARTUP",
        details: [
            "Planned and executed MVP scope",
            "Designed backend APIs using FastAPI",
            "Worked on patient app and hospital dashboard flows",
            "Coordinated product decisions with mentors"
        ]
    },
    {
        id: "LOG_2024_SUNEDGE",
        role: "Backend Developer Intern",
        company: "SunEdge IT Solutions",
        period: "Dec 2024 – Present",
        type: "INTERNSHIP",
        details: [
            "Built and maintained backend services",
            "Worked on REST APIs and clean architecture",
            "Collaborated with frontend and QA teams",
            "Followed version control and deployment workflows"
        ]
    },
    {
        id: "LOG_2022_CU",
        role: "B.Tech Computer Science & Engineering",
        company: "Chandigarh University",
        period: "2022 - 2026",
        type: "EDUCATION",
        details: [
            "Ongoing program in Computer Science & Engineering"
        ]
    }
];
