import React, { useState, useEffect } from 'react';
import AudioAnalyserEngine from '../../audio/AudioAnalyserEngine';
import { AudioCanvas } from '../';

let audioDataArray;
// let rafId;

function AudioParser({ inputContext, audio, parentRef, currentFrequency }) {

  const [audioData, setAudioData] = useState(new Float32Array(0));
  const [analyser, setAnalyser] = useState(new AudioAnalyserEngine(inputContext.context, audio))

  useEffect(() => {
    audioDataArray = analyser.initDataArray();
    setAudioData(audioDataArray); // async?
    // rafId = requestAnimationFrame(update);

    return () => {
      // cancelAnimationFrame(rafId);
      analyser.disconnect();
    }

  }, [])

  const update = () => {
    analyser.getFloatTimeDomainData();
    setAudioData(audioDataArray); // async?
    rafId = requestAnimationFrame(update);
  }

  return (
    <AudioCanvas audioData={audioData}
      analyser={analyser}
      parentRef={parentRef}
      currentFrequency={currentFrequency}
      inputContext={inputContext}
    />
  )
}

export default AudioParser;
