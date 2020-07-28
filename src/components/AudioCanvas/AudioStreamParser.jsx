import React, { useState, useEffect } from 'react';
import AudioCanvas from './AudioCanvas';

let dataArray;
let source;
let rafId;

function AudioStreamParser({ inputContext, audio, parentRef, currentFrequency }) {

  const [audioData, setAudioData] = useState(new Float32Array(0));
  const [analyser, setAnalyser] = useState(new AnalyserNode(inputContext))

  const startUpAudio = async () => {
    dataArray = new Float32Array(analyser.frequencyBinCount);
    await setAudioData(dataArray);
    source = inputContext.createMediaStreamSource(audio);
    source.connect(analyser);
    rafId = requestAnimationFrame(update)
  }

  useEffect(() => {
    startUpAudio();

    return () => {
      cancelAnimationFrame(rafId);
      analyser.disconnect();
      source.disconnect();
    }

  }, [])

  const update = async () => {
    analyser.getFloatTimeDomainData(dataArray);
    await setAudioData(dataArray);
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

export default AudioStreamParser;
