// Web Audio API Synthesizer for UI sound effects (zero external audio file dependency)
class SoundSynthesizer {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.unlocked = false;

    // Chrome/Safari block AudioContext from running until a *real* user
    // gesture (click / keydown / touchstart) happens on the page — a mere
    // hover does not count. Wire up a one-time listener so we create/resume
    // the context at the earliest legitimate moment instead of on every
    // hover, which is what was spamming the console before.
    if (typeof window !== 'undefined') {
      const unlock = () => {
        this.init();
        this.unlocked = true;
        window.removeEventListener('pointerdown', unlock);
        window.removeEventListener('keydown', unlock);
        window.removeEventListener('touchstart', unlock);
      };
      window.addEventListener('pointerdown', unlock, { once: true });
      window.addEventListener('keydown', unlock, { once: true });
      window.addEventListener('touchstart', unlock, { once: true });
    }
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound() {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.playBeep(880, 'sine', 0.15, 0.05);
    }
    return this.enabled;
  }

  playBeep(freq = 440, type = 'sine', duration = 0.08, vol = 0.05) {
    if (!this.enabled || !this.unlocked) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio context fallback safeguard
    }
  }

  playHover() {
    this.playBeep(520, 'sine', 0.04, 0.02);
  }

  playClick() {
    this.playBeep(880, 'triangle', 0.08, 0.05);
  }

  playSuccess() {
    if (!this.enabled || !this.unlocked) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.04, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.15);
      });
    } catch { }
  }
}

export const soundFx = new SoundSynthesizer();