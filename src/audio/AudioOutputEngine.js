class AudioOutputEngine {

    constructor() {
        this.context = new AudioContext();
    }

    initialize() {
        this.oscillator = this.context.createOscillator();
        this.oscillator.type = 'sine';
        this.gainNode = this.context.createGain();
        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);
    }

    playAudio(freq) {
        if (this.context.state === 'suspended') {
            this.context.resume();
        }
        this.initialize();
        this.oscillator.frequency.value = freq;
        this.gainNode.gain.exponentialRampToValueAtTime(
            0.075, this.context.currentTime
        )
        this.oscillator.start(this.context.currentTime);
    }

    stopAudio() {
        this.gainNode.gain.linearRampToValueAtTime(
            0.00001, this.context.currentTime
        )
        this.oscillator.stop(this.context.currentTime);
        this.oscillator.disconnect();
    }
}

export default new AudioOutputEngine();