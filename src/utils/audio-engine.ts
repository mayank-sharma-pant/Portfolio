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
                this.masterGain.gain.value = 0.15; // Keep it subtle
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
}

// Singleton export
export const synth = new AudioSynth();
