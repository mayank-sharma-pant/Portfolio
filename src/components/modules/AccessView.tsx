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
                pushLog('✓ Message sent successfully', 'SUCCESS');
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
        // Trigger download
        window.open('/resume.pdf', '_blank');
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Page Header */}
            <div className="border-b border-primary/20 pb-4">
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <span className="text-primary">{'>'}</span> MODULE_LOADED: ACCESS
                </h1>
                <p className="text-xs text-muted mt-2 font-mono">Contact interface & resume access</p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Left Column: Resume Viewer */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-4"
                >
                    <div className="border border-primary/20 bg-black/40 p-4">
                        <h2 className="text-sm font-mono text-primary mb-4 uppercase tracking-wider">
                            RESUME_DOCUMENT
                        </h2>

                        {/* PDF Viewer */}
                        <div className="bg-black/60 border border-primary/10 aspect-[8.5/11] relative overflow-hidden">
                            <iframe
                                src="/resume.pdf"
                                className="w-full h-full"
                                title="Resume"
                            />
                            {/* Fallback if PDF doesn't load */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/80 pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
                                <p className="text-muted text-xs">PDF preview unavailable</p>
                            </div>
                        </div>

                        {/* Download Button */}
                        <button
                            onClick={handleDownloadResume}
                            onMouseEnter={() => synth.playHover()}
                            className="w-full mt-4 border border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary py-2 px-4 font-mono text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Download Resume (PDF)
                        </button>
                    </div>
                </motion.div>

                {/* Right Column: Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="space-y-4"
                >
                    {/* Contact Form */}
                    <div className="border border-primary/20 bg-black/40 p-4">
                        <h2 className="text-sm font-mono text-primary mb-4 uppercase tracking-wider">
                            CONTACT_INTERFACE
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name Input */}
                            <div>
                                <label className="block text-xs text-muted mb-2 font-mono">NAME:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full bg-black/60 border border-primary/20 text-foreground px-3 py-2 text-sm font-mono focus:border-primary/50 focus:outline-none transition-colors"
                                    placeholder="Your name"
                                />
                            </div>

                            {/* Email Input */}
                            <div>
                                <label className="block text-xs text-muted mb-2 font-mono">EMAIL:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full bg-black/60 border border-primary/20 text-foreground px-3 py-2 text-sm font-mono focus:border-primary/50 focus:outline-none transition-colors"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            {/* Message Textarea */}
                            <div>
                                <label className="block text-xs text-muted mb-2 font-mono">MESSAGE:</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={6}
                                    className="w-full bg-black/60 border border-primary/20 text-foreground px-3 py-2 text-sm font-mono focus:border-primary/50 focus:outline-none transition-colors resize-none"
                                    placeholder="Your message..."
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                onMouseEnter={() => synth.playHover()}
                                className="w-full border border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary py-2 px-4 font-mono text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send className="w-4 h-4" />
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>

                    {/* External Interfaces */}
                    <div className="border border-primary/20 bg-black/40 p-4">
                        <h2 className="text-sm font-mono text-primary mb-4 uppercase tracking-wider">
                            EXTERNAL_INTERFACES
                        </h2>

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
                                <span className="flex-1 group-hover:underline">→ github.com/mayank-sharma-pant</span>
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
                                <span className="flex-1 group-hover:underline">→ linkedin.com/in/mayank-sharma-a747ba275/</span>
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
                                <span className="flex-1 group-hover:underline">→ x.com/nullbytez</span>
                                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>

                            <a
                                href="mailto:mayanksharmarrk01@gmail.com"
                                onMouseEnter={() => synth.playHover()}
                                onClick={() => pushLog('Opening email client', 'SYSTEM')}
                                className="flex items-center gap-3 text-muted hover:text-primary transition-colors group"
                            >
                                <span className="w-20">EMAIL</span>
                                <span className="flex-1 group-hover:underline">→ mayanksharmarrk01@gmail.com</span>
                                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Footer Note */}
            <div className="text-[10px] font-mono text-muted/40 text-center pt-4 border-t border-primary/10">
                Response time: ~24 hours // Preferred contact: Email
            </div>
        </div>
    );
}
