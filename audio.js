/**
 * AUDIO MANAGER - Prototype 1
 * Low Latency Web Audio API
 */
class AudioManager {
    constructor() {
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.buffers = {};
    }

    async loadSfx(name, url) {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        this.buffers[name] = await this.context.decodeAudioData(arrayBuffer);
    }

    play(name) {
        if (!this.buffers[name]) return;
        if (this.context.state === 'suspended') this.context.resume();
        
        const source = this.context.createBufferSource();
        source.buffer = this.buffers[name];
        source.connect(this.context.destination);
        source.start(0);
    }
}

// Inisialisasi di main.js
const sfx = new AudioManager();
// Contoh loading (gunakan file kecil hasil kompresi 64kbps)
// sfx.loadSfx('jump', 'assets/sfx/jump.mp3');