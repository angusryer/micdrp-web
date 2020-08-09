class AudioOutputEngine {

    static context = () => {
        new AudioContext()
        this.initialize();
    }

    initialize = () => {
        this.oscillator = this.context.createOscillator();
        this.oscillator.type = 'sine';
        this.gainNode = this.context.createGain();
        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);
    }

    playAudio = () => {
        this.gainNode.gain.exponentialRampToValueAtTime(
            0.075, this.context.currentTime
        )
        this.oscillator.start(this.context.currentTime);
    }

    stopAudio = () => {
        this.gainNode.gain.linearRampToValueAtTime(
            0.00001, this.context.currentTime
        )
        this.oscillator.stop(this.context.currentTime);
        this.oscillator.disconnect();
    }

    setFrequency = frequency => {
        this.oscillator.frequency.value = frequency;
    }

    changeToNote = frequency => {
        this.stopAudio();
        this.setFrequency(frequency);
        this.playAudio();
    }

}

export default AudioOutputEngine;