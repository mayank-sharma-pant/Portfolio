'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSystem } from '@/context/SystemContext';
import { synth } from '@/utils/audio-engine';
import { Download, Send, ExternalLink } from 'lucide-react';

export default function AccessView() {
    const { pushLog } = useSystem();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            pushLog('Error: All fields are required', 'ERROR');
            synth.playError();
            return;
        }

        setIsSubmitting(true);
        pushLog('Sending message...', 'SYSTEM');
        synth.playClick();

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                pushLog('Message sent successfully', 'SUCCESS');
                pushLog('Response time: ~24 hours', 'INFO');
                synth.playMount();
                setFormData({ name: '', email: '', message: '' });
            } else {
                const error = await response.json();
                pushLog(`Error: ${error.error || 'Failed to send message'}`, 'ERROR');
                synth.playError();
            }
        } catch (error) {
            pushLog('Error: Network error. Please try again.', 'ERROR');
            synth.playError();
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDownloadResume = () => {
        pushLog('Downloading resume...', 'SYSTEM');
        synth.playClick();
        window.open('/resume.pdf', '_blank');
    };

    return (
        <div className="space-y-10 pb-12">
            <section className="relative border border-border bg-secondary px-8 py-8">
                <div className="absolute -inset-2 border border-border/40 pointer-events-none" />
                <div className="text-[11px] uppercase tracking-[0.6em] text-muted">Access</div>
                <h1 className="mt-4 text-3xl md:text-4xl font-semibold text-foreground">Contact + Resume</h1>
                <p className="mt-4 text-xs text-muted">Contact interface & resume access</p>
            </section>

            <div className="relative">
                <div className="anime-panel">
                    <img
                        src="/anime/kisuke-urahara-bleach-4k-ultra-hd-fanart-660is9s5w1m9rk9l.jpg"
                        alt="Access Protocol"
                        className="anime-bg anime-bg--section"
                    />
                    <div className="anime-panel__veil" />
                    <div className="panel-shimmer" />
                </div>

                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative border border-border bg-background p-6"
                >
                    <div className="absolute -inset-2 border border-border/30 pointer-events-none" />
                    <h2 className="text-[11px] uppercase tracking-[0.6em] text-muted mb-4">Resume</h2>
                    <div className="bg-black/40 border border-border aspect-[8.5/11] relative overflow-hidden">
                        <iframe
                            src="/resume.pdf"
                            className="w-full h-full"
                            title="Resume"
                        />
                    </div>
                    <button
                        onClick={handleDownloadResume}
                        onMouseEnter={() => synth.playHover()}
                        className="w-full mt-4 border border-border bg-secondary text-foreground py-2 px-4 font-mono text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        <Download className="w-4 h-4" />
                        Download Resume (PDF)
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="relative border border-border bg-background p-6"
                >
                    <div className="absolute -inset-2 border border-border/30 pointer-events-none" />
                    <h2 className="text-[11px] uppercase tracking-[0.6em] text-muted mb-4">Contact</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs text-muted mb-2 font-mono">NAME</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full bg-black/40 border border-border text-foreground px-3 py-2 text-sm font-mono focus:border-primary/50 focus:outline-none transition-colors"
                                placeholder="Your name"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-muted mb-2 font-mono">EMAIL</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full bg-black/40 border border-border text-foreground px-3 py-2 text-sm font-mono focus:border-primary/50 focus:outline-none transition-colors"
                                placeholder="your.email@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-muted mb-2 font-mono">MESSAGE</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                rows={6}
                                className="w-full bg-black/40 border border-border text-foreground px-3 py-2 text-sm font-mono focus:border-primary/50 focus:outline-none transition-colors resize-none"
                                placeholder="Your message..."
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            onMouseEnter={() => synth.playHover()}
                            className="w-full border border-border bg-secondary text-foreground py-2 px-4 font-mono text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send className="w-4 h-4" />
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>

                    <div className="mt-8 border-t border-border pt-4">
                        <h2 className="text-[11px] uppercase tracking-[0.6em] text-muted mb-3">External</h2>
                        <div className="space-y-2 text-xs font-mono">
                            <a
                                href="https://github.com/mayank-sharma-pant"
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseEnter={() => synth.playHover()}
                                onClick={() => pushLog('Opening GitHub profile', 'SYSTEM')}
                                className="flex items-center gap-3 text-muted hover:text-primary transition-colors group"
                            >
                                <span className="w-20">GITHUB</span>
                                <span className="flex-1">github.com/mayank-sharma-pant</span>
                                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                            <a
                                href="https://linkedin.com/in/mayank-sharma-a747ba275/"
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseEnter={() => synth.playHover()}
                                onClick={() => pushLog('Opening LinkedIn profile', 'SYSTEM')}
                                className="flex items-center gap-3 text-muted hover:text-primary transition-colors group"
                            >
                                <span className="w-20">LINKEDIN</span>
                                <span className="flex-1">linkedin.com/in/mayank-sharma-a747ba275/</span>
                                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                            <a
                                href="https://x.com/nullbytez"
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseEnter={() => synth.playHover()}
                                onClick={() => pushLog('Opening X profile', 'SYSTEM')}
                                className="flex items-center gap-3 text-muted hover:text-primary transition-colors group"
                            >
                                <span className="w-20">X</span>
                                <span className="flex-1">x.com/nullbytez</span>
                                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                            <a
                                href="mailto:mayanksharmarrk01@gmail.com"
                                onMouseEnter={() => synth.playHover()}
                                onClick={() => pushLog('Opening email client', 'SYSTEM')}
                                className="flex items-center gap-3 text-muted hover:text-primary transition-colors group"
                            >
                                <span className="w-20">EMAIL</span>
                                <span className="flex-1">mayanksharmarrk01@gmail.com</span>
                                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </div>
                    </div>
                </motion.div>
                </div>
            </div>
        </div>
    );
}
