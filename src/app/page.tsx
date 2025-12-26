'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Database, Terminal, Cpu } from "lucide-react";

export default function Home() {
  const modules = [
    { title: "PROJECTS", id: "01", icon: Database, desc: "Architectural artifacts & deployed systems.", link: "/projects" },
    { title: "EXPERIENCE", id: "02", icon: Terminal, desc: "Operational history & log entries.", link: "/experience" },
    { title: "STACK", id: "03", icon: Cpu, desc: "Core dependencies & technical proficiencies.", link: "#" },
  ];

  return (
    <div className="space-y-8">
      {/* Hero / Status Section */}
      <section className="relative p-8 border-l-2 border-primary bg-gradient-to-r from-primary/10 to-transparent">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter text-white">
            SYSTEM<span className="text-primary">_ONLINE</span>
          </h1>
          <p className="text-muted-foreground font-mono text-sm md:text-base leading-relaxed max-w-2xl">
            <span className="text-primary">root@portfolio:~$</span> initializing interface...<br />
            <span className="text-primary">root@portfolio:~$</span> loading user profile... done.<br />
            <span className="text-green-500">{">>"} WELCOME, VISITOR. SYSTEM IS READY FOR INPUT.</span>
          </p>
        </motion.div>
      </section>

      {/* Navigation Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {modules.map((item, index) => (
          <Link key={item.id} href={item.link} legacyBehavior={false}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (index * 0.1) }}
              className="group p-6 border border-border bg-card hover:bg-white/5 transition-all duration-300 cursor-pointer relative overflow-hidden h-full"
            >
              <div className="absolute top-0 right-0 p-2 text-xs font-mono text-muted opacity-50 group-hover:opacity-100 transition-opacity">
                IDX_{item.id}
              </div>

              <item.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />

              <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                {item.title}
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </h2>
              <p className="text-sm text-muted mt-2 font-mono">
                {item.desc}
              </p>

              {/* Hover Scanline */}
              <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out pointer-events-none" />
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
