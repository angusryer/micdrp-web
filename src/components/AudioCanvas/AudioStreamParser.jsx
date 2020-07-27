import React, { useState, useEffect } from 'react';
import AudioCanvas from './AudioCanvas';

let analyser;
let dataArray;
let source;
let rafId;

function AudioStreamParser({ inputContext, audio, parentRef, currentFrequency }) {

  const [audioData, setAudioData] = useState(new Uint8Array(0));

  useEffect(() => {
    analyser = new AnalyserNode(inputContext);
    dataArray = new Uint8Array(analyser.frequencyBinCount);
    source = inputContext.createMediaStreamSource(audio);
    source.connect(analyser);
    rafId = requestAnimationFrame(update)

    return () => {
      cancelAnimationFrame(rafId);
      analyser.disconnect();
      source.disconnect();
    }

  }, [])

  const update = () => {
    analyser.getByteTimeDomainData(dataArray);
    setAudioData(dataArray);
    rafId = requestAnimationFrame(update);
  }

  return <AudioCanvas audioData={audioData}
    parentRef={parentRef}
    currentFrequency={currentFrequency}
    inputContext={inputContext}
  />
}

export default AudioStreamParser;
