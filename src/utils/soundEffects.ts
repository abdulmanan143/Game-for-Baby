/**
 * Web Audio API synthesizer for child-friendly sound effects.
 * No external mp3 dependencies required - 100% reliable and instant.
 */

class SoundEffectsManager {
  private ctx: AudioContext | null = null;
  private bgmOscillator: OscillatorNode | null = null;
  private bgmGain: GainNode | null = null;
  private isBgmPlaying = false;
  private bgmTimer: number | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  playPop(soundEnabled = true) {
    if (!soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // Ignore audio failure
    }
  }

  playClick(soundEnabled = true) {
    if (!soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(600, now);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Ignore audio failure
    }
  }

  playCorrect(soundEnabled = true) {
    if (!soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (major victory arpeggio)
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0, now + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.3, now + idx * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.3);
      });
    } catch {
      // Ignore audio failure
    }
  }

  playWrong(soundEnabled = true) {
    if (!soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      // Gentle boing down: child-friendly, not jarring
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const now = this.ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.25);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // Ignore audio failure
    }
  }

  playStar(soundEnabled = true) {
    if (!soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const freqs = [784, 988, 1175, 1568]; // G5, B5, D6, G6
      const now = this.ctx.currentTime;

      freqs.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);

        gain.gain.setValueAtTime(0.2, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.25);
      });
    } catch {
      // Ignore audio failure
    }
  }

  playCardFlip(soundEnabled = true) {
    if (!soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const now = this.ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(350, now);
      osc.frequency.exponentialRampToValueAtTime(500, now + 0.06);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // Ignore audio failure
    }
  }

  playLevelUp(soundEnabled = true) {
    if (!soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      // Grand celebration chord progression
      const chords = [
        [523.25, 659.25, 783.99], // C
        [587.33, 739.99, 880.0],  // D
        [659.25, 830.61, 987.77], // E
        [1046.5, 1318.5, 1567.98] // High C
      ];

      const now = this.ctx.currentTime;
      chords.forEach((chord, step) => {
        chord.forEach((freq) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + step * 0.15);

          gain.gain.setValueAtTime(0.2, now + step * 0.15);
          gain.gain.exponentialRampToValueAtTime(0.001, now + step * 0.15 + 0.4);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now + step * 0.15);
          osc.stop(now + step * 0.15 + 0.4);
        });
      });
    } catch {
      // Ignore audio failure
    }
  }

  // Soft cheerful synthesized background music chime loop
  startBgm(musicEnabled = true) {
    if (!musicEnabled) {
      this.stopBgm();
      return;
    }
    if (this.isBgmPlaying) return;
    this.initCtx();
    if (!this.ctx) return;

    this.isBgmPlaying = true;
    const melody = [
      261.63, 293.66, 329.63, 349.23, 392.00, 329.63, 261.63, 392.00
    ];
    let noteIdx = 0;

    const playNextNote = () => {
      if (!this.isBgmPlaying || !this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const now = this.ctx.currentTime;
        const freq = melody[noteIdx % melody.length];
        noteIdx++;

        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.035, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.45);
      } catch {
        // Ignore
      }
    };

    this.bgmTimer = window.setInterval(playNextNote, 550);
  }

  stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmTimer) {
      clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
    if (this.bgmOscillator) {
      try {
        this.bgmOscillator.stop();
        this.bgmOscillator.disconnect();
      } catch {}
      this.bgmOscillator = null;
    }
  }
}

export const sounds = new SoundEffectsManager();

/**
 * Text-to-speech for kids who are learning to read.
 */
export function speakText(text: string, enabled = true, speed = 0.95) {
  if (!enabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel(); // cancel any active speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speed; // slightly measured for kids
    utterance.pitch = 1.15; // slightly higher friendly tone
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  } catch {
    // Graceful fallback
  }
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {}
  }
}
