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
        id: "LOG_2024_01",
        role: "Sensior Backend Engineer",
        company: "TECH_CORP_GLOBAL",
        period: "2022 - PRESENT",
        type: "FULL_TIME",
        details: [
            "Orchestrated migration of legacy monolith to microservices architecture.",
            "Optimized database query performance reducing latency by 40%.",
            "Lead a squad of 4 engineers in developing high-throughput API gateways."
        ]
    },
    {
        id: "LOG_2021_04",
        role: "Software Developer II",
        company: "INNOVATE_SYSTEMS",
        period: "2020 - 2022",
        type: "CONTRACT",
        details: [
            "Implemented real-time data processing pipelines using Kafka.",
            "Developed internal developer tooling for automated deployments.",
            "Maintained 99.9% uptime for core authentication services."
        ]
    },
    {
        id: "LOG_2019_08",
        role: "Junior Systems Engineer",
        company: "STARTUP_V1",
        period: "2018 - 2020",
        type: "FULL_TIME",
        details: [
            "Built initial MVP for customer-facing dashboard.",
            "Integrated third-party payment gateways (Stripe, PayPal).",
            "Assisted in infrastructure setup using AWS CloudFormation."
        ]
    }
];
