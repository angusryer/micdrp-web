class AudioOutputEngine {

    constructor() {
        this.context = new AudioContext();
        this.initialize('sine');
    }

    initialize = oscillatorType => {
        this.oscillator = this.context.createOscillator();
        this.oscillator.type = oscillatorType;
        this.gainNode = this.context.createGain();
        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);
    }

    playAudio = () => {
        this.gainNode.gain.exponentialRampToValueAtTime(
            1, this.context.currentTime + 20
        )
        this.oscillator.start(this.context.currentTime);
    }

    stopAudio = () => {
        this.gainNode.gain.linearRampToValueAtTime(
            0.00001, this.context.currentTime + 20
        )
        // this.oscillator.stop(this.context.currentTime);
        this.oscillator.disconnect();
    }

    setFrequency = frequency => {
        this.oscillator.frequency.value = frequency;
    }

}

export default AudioOutputEngine;