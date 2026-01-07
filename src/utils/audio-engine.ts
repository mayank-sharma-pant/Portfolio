'use client';

class AudioSynth {
    private ctx: AudioContext | null = null;
    private masterGain: GainNode | null = null;
    private isMuted: boolean = false;

    constructor() {
        if (typeof window !== 'undefined') {
            // Init on first interaction usually, but we'll try greedy init
            const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
                this.masterGain = this.ctx.createGain();
                this.masterGain.gain.value = 0.5; // Increased volume
                this.masterGain.connect(this.ctx.destination);
            }
        }
    }

    private initCheck() {
        if (!this.ctx) return false;
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        return true;
    }

    public playHover() {
        if (!this.initCheck() || this.isMuted) return;

        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, this.ctx!.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, this.ctx!.currentTime + 0.05);

        gain.gain.setValueAtTime(0.05, this.ctx!.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start();
        osc.stop(this.ctx!.currentTime + 0.05);
    }

    public playClick() {
        if (!this.initCheck() || this.isMuted) return;

        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(200, this.ctx!.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, this.ctx!.currentTime + 0.1);

        gain.gain.setValueAtTime(0.1, this.ctx!.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start();
        osc.stop(this.ctx!.currentTime + 0.1);
    }

    // Softer click for card interactions
    public playCardClick() {
        if (!this.initCheck() || this.isMuted) return;

        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, this.ctx!.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, this.ctx!.currentTime + 0.08);

        // Quieter than regular click
        gain.gain.setValueAtTime(0.04, this.ctx!.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + 0.08);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start();
        osc.stop(this.ctx!.currentTime + 0.08);
    }

    // More prominent sound for module/page navigation
    public playNavigate() {
        if (!this.initCheck() || this.isMuted) return;

        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(250, this.ctx!.currentTime);
        osc.frequency.exponentialRampToValueAtTime(500, this.ctx!.currentTime + 0.15);

        // Louder and longer than card click
        gain.gain.setValueAtTime(0.12, this.ctx!.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + 0.15);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start();
        osc.stop(this.ctx!.currentTime + 0.15);
    }

    public playMount() {
        if (!this.initCheck() || this.isMuted) return;

        // High-tech processing sound
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, this.ctx!.currentTime);
        osc.frequency.linearRampToValueAtTime(800, this.ctx!.currentTime + 0.3);

        gain.gain.setValueAtTime(0, this.ctx!.currentTime);
        gain.gain.linearRampToValueAtTime(0.1, this.ctx!.currentTime + 0.1);
        gain.gain.linearRampToValueAtTime(0, this.ctx!.currentTime + 0.3);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start();
        osc.stop(this.ctx!.currentTime + 0.3);
    }

    public playError() {
        if (!this.initCheck() || this.isMuted) return;

        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, this.ctx!.currentTime);
        osc.frequency.linearRampToValueAtTime(100, this.ctx!.currentTime + 0.3);

        gain.gain.setValueAtTime(0.15, this.ctx!.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + 0.3);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start();
        osc.stop(this.ctx!.currentTime + 0.3);
    }
    private ambientOsc: OscillatorNode | null = null;
    private ambientGain: GainNode | null = null;

    public toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            this.stopAmbient();
            if (this.ctx && this.ctx.state === 'running') {
                this.ctx.suspend();
            }
        } else {
            if (this.ctx && this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
            this.playAmbient();
        }
        return this.isMuted;
    }

    public getMuted() {
        return this.isMuted;
    }

    public start() {
        this.initCheck();
        if (!this.isMuted) {
            this.playAmbient();
        }
    }

    private playAmbient() {
        if (!this.initCheck() || this.isMuted || this.ambientOsc) return;

        // Create a low drone
        this.ambientOsc = this.ctx!.createOscillator();
        this.ambientGain = this.ctx!.createGain();

        this.ambientOsc.type = 'sine';
        this.ambientOsc.frequency.setValueAtTime(50, this.ctx!.currentTime); // Low rumble

        // Louder ambient
        this.ambientGain.gain.setValueAtTime(0.00, this.ctx!.currentTime);
        this.ambientGain.gain.linearRampToValueAtTime(0.08, this.ctx!.currentTime + 2); // Fade in

        this.ambientOsc.connect(this.ambientGain);
        this.ambientGain.connect(this.masterGain!);

        this.ambientOsc.start();
    }

    private stopAmbient() {
        if (this.ambientOsc) {
            try {
                this.ambientOsc.stop();
                this.ambientOsc.disconnect();
                this.ambientGain?.disconnect();
            } catch (e) {
                // Ignore if already stopped
            }
            this.ambientOsc = null;
            this.ambientGain = null;
        }
    }
}

// Singleton export
export const synth = new AudioSynth();
