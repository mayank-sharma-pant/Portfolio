export interface Project {
    id: string;
    name: string;
    description: string;
    tech: string[];
    year: string;
    status: 'LIVE' | 'ARCHIVED' | 'BETA' | 'DEPRECATED';
    link: string;
}

export const projects: Project[] = [
    {
        id: "PROJ_001",
        name: "VELOCITY_ENGINE",
        description: "High-performance distributed caching system for microservices.",
        tech: ["Go", "gRPC", "Redis"],
        year: "2024",
        status: "LIVE",
        link: "https://github.com/example/velocity"
    },
    {
        id: "PROJ_002",
        name: "NEURAL_NET_VIS",
        description: "3D visualization tool for neural network training processes.",
        tech: ["Three.js", "Python", "TensorFlow"],
        year: "2023",
        status: "BETA",
        link: "#"
    },
    {
        id: "PROJ_003",
        name: "CIPHER_VAULT",
        description: "Zero-knowledge proof authentication protocol implementation.",
        tech: ["Rust", "WASM", "React"],
        year: "2023",
        status: "ARCHIVED",
        link: "#"
    },
    {
        id: "PROJ_004",
        name: "QUANTUM_SIM",
        description: "Browser-based quantum circuit simulator.",
        tech: ["TypeScript", "Canvas API"],
        year: "2022",
        status: "DEPRECATED",
        link: "#"
    }
];
