import React, { useState, useEffect } from 'react';
import AudioAnalyserEngine from '../../audio/AudioAnalyserEngine';
import AudioOutputEngine from '../../audio/AudioOutputEngine';
import { AudioCanvas } from '../';

let audioDataArray;
// let rafId;

function AudioParser({ audio, parentRef, currentFrequency }) {

  const [audioData, setAudioData] = useState(new Float32Array(1024));
  const [analyser, setAnalyser] = useState(new AudioAnalyserEngine(audio))

  useEffect(() => {
    audioDataArray = analyser.initDataArray();
    setAudioData(audioDataArray); // async?
    // rafId = requestAnimationFrame(update);

    return () => {
      // cancelAnimationFrame(rafId);
      analyser.analyser.disconnect();
    }

  }, [])

  const update = () => {
    analyser.getFloatTimeDomainData();
    setAudioData(audioDataArray); // async?
    // rafId = requestAnimationFrame(update);
  }

  return (
    <AudioCanvas audioData={audioData}
      analyser={analyser}
      parentRef={parentRef}
      currentFrequency={currentFrequency}
    />
  )
}

export default AudioParser;
