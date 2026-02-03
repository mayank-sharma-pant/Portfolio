export interface Project {
    id: string;
    name: string;
    type: string;
    status: 'ACTIVE' | 'IN_PROGRESS' | 'COMPLETED';
    context: string;
    tech: string;
    focus: string[];
    description: string;
    link?: string; // Optional now as some might not have links
}

export const projects: Project[] = [
    {
        id: 'PROJ_001_HEALIORA',
        name: 'Healiora',
        type: 'Product / Startup',
        status: 'ACTIVE',
        context: 'HealthTech | CU-TBI Incubated',
        tech: 'FastAPI, Android, Backend Systems',
        focus: [
            'Product MVP development',
            'Backend API design',
            'Patient & hospital workflows'
        ],
        description: 'Actively building a healthcare-focused platform with real product validation under university incubation.'
    },
    {
        id: 'PROJ_002_CRM',
        name: 'CRM System',
        type: 'Internship Project',
        status: 'IN_PROGRESS',
        context: 'SunEdge IT Solutions',
        tech: 'Backend Services, REST APIs',
        focus: [
            'Backend service development',
            'Enterprise workflows',
            'API integration'
        ],
        description: 'Working on an internal CRM system as part of internship, focusing on scalable backend services and real business logic.'
    },
    {
        id: 'PROJ_003_ECOMM',
        name: 'E-Commerce Platform',
        type: 'Full-Stack Project',
        status: 'COMPLETED',
        context: 'Personal / Academic',
        tech: 'Java, Spring Boot, React, MySQL',
        focus: [
            'Authentication & authorization',
            'Product, order, and user management',
            'Backend API design'
        ],
        description: 'Built a secure full-stack e-commerce application with structured backend services and frontend integration.'
    },
    {
        id: 'PROJ_004_STOCK',
        name: 'Stock Analyzer & Portfolio',
        type: 'Backend System',
        status: 'COMPLETED',
        context: 'Personal Project',
        tech: 'Java, Spring Boot, MySQL',
        focus: [
            'Layered backend architecture',
            'Validation & exception handling',
            'Portfolio tracking logic'
        ],
        description: 'Developed a backend system to manage stock portfolios and compute profit/loss with clean architecture principles.'
    },
    {
        id: 'PROJ_005_WEBSERVER',
        name: 'Java Web Server',
        type: 'Systems Project',
        status: 'COMPLETED',
        context: 'Personal / Academic',
        tech: 'Java, TCP Sockets',
        focus: [
            'Socket programming',
            'Single & multithreaded request handling',
            'Low-level server logic'
        ],
        description: 'Implemented custom single-threaded and multithreaded Java web servers to understand core networking concepts.'
    }
];
