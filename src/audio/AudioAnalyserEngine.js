class AudioAnalyserEngine {

    constructor(audioContext, audioStream) {
        this.analyser = new AnalyserNode(audioContext);
        this.audioSource = audioContext.createMediaStreamSource(audioStream);
        this.audioSource.connect(this.analyser);
    }

    initDataArray = () => new Float32Array(this.analyser.frequencyBinCount);

    getFloatTimeDomainData = value => {
        this.analyser.getFloatTimeDomainData(value || this.initDataArray())
    };

    disconnect = () => {
        this.audioSource.disconnect();
        this.analyser.disconnect();
    };

}

export default AudioAnalyserEngine;