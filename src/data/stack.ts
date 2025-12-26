export type MaturityStatus = 'STABLE' | 'ACTIVE';

export interface StackNode {
    id: string;
    name: string;
    status: MaturityStatus;
    type: 'CORE' | 'LIB' | 'TOOL' | 'LANG';
}

export interface StackCategory {
    id: string;
    name: string;
    nodes: StackNode[];
}

export const stackData: StackCategory[] = [
    {
        id: "CAT_01",
        name: "LANGUAGE_LAYER",
        nodes: [
            { id: "S01", name: "Java", type: "LANG", status: "STABLE" },
            { id: "S02", name: "JavaScript", type: "LANG", status: "STABLE" },
            { id: "S03", name: "Node.js", type: "CORE", status: "STABLE" },
            { id: "S04", name: "SQL (MySQL)", type: "LANG", status: "STABLE" }
        ]
    },
    {
        id: "CAT_02",
        name: "FRAMEWORK_ENGINE",
        nodes: [
            { id: "S05", name: "Spring Boot", type: "CORE", status: "STABLE" }, // User listed generic "Spring Boot" as Ref
            { id: "S06", name: "FastAPI", type: "CORE", status: "ACTIVE" },
            { id: "S07", name: "React", type: "LIB", status: "ACTIVE" },
            { id: "S08", name: "Jetpack Compose", type: "LIB", status: "ACTIVE" }
        ]
    },
    {
        id: "CAT_03",
        name: "DATA_&_INFRA",
        nodes: [
            { id: "S09", name: "JPA / Hibernate", type: "LIB", status: "ACTIVE" },
            { id: "S10", name: "MongoDB", type: "CORE", status: "ACTIVE" },
            { id: "S11", name: "Docker", type: "TOOL", status: "ACTIVE" }, // Assuming tools are ACTIVE unless specified
            { id: "S12", name: "Git / Maven", type: "TOOL", status: "ACTIVE" }
        ]
    }
];
