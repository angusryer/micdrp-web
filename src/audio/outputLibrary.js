export class OutputController {

  constructor(context) {
    this.context = context;
  }

  initializeAudioContext() {
    this.oscillator = this.context.createOscillator();
    this.gainNode = this.context.createGain();
    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
    this.oscillator.type = 'sine';
  }

  playAudio(value, time) {
    this.initializeAudioContext();
    this.oscillator.frequency.value = value;
    this.gainNode.gain.setValueAtTime(1, this.context.currentTime);
    this.oscillator.start(time);
  }

  stopAudio(time) {
    this.gainNode.gain.exponentialRampToValueAtTime(0.05, time + 0.5);
    this.oscillator.stop(time + 1);
  }
}