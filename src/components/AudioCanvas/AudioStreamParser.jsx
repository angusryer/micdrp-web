import React, { useState, useEffect } from 'react';
import AudioCanvas from './AudioCanvas';

function AudioStreamParser({ audioContext, audio }) {

  const [audioData, setAudioData] = useState(new Uint8Array(0));

  let dataArray;
  let analyser;
  let source;
  let rafId;

  useEffect(() => {
    analyser = audioContext.createAnalyser();
    dataArray = new Uint8Array(analyser.frequencyBinCount);
    source = audioContext.createMediaStreamSource(audio);
    source.connect(analyser);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      analyser.disconnect();
      source.disconnect();
    }
  })

  const tick = () => {
    analyser.getByteTimeDomainData(dataArray);
    setAudioData(dataArray);
    rafId = requestAnimationFrame(tick);
  }

  return <AudioCanvas audioData={audioData} />;
}

export default AudioStreamParser;
