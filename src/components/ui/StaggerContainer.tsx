'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface StaggerContainerProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    staggerChildren?: number;
}

export default function StaggerContainer({
    children,
    className = "",
    delay = 0,
    staggerChildren = 0.1
}: StaggerContainerProps) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        delayChildren: delay,
                        staggerChildren: staggerChildren
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export const StaggerItem = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    return (
        <motion.div
            variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                    y: 0,
                    opacity: 1,
                    transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
