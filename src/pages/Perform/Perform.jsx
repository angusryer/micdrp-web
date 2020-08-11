import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { NavMinimal, NoteName, AudioCanvas } from '../../components';
import AudioOutputEngine from '../../audio/AudioOutputEngine';
import AudioAnalyserEngine from '../../audio/AudioAnalyserEngine';
import './Perform.scss';
import * as Notes from '../../utilities/notes';
import playImage from '../../assets/images/play-circle-outline.png';
import pauseImage from '../../assets/images/pause-circle-outline.png';
import previousImage from '../../assets/images/play-skip-back-outline.png';
import nextImage from '../../assets/images/play-skip-forward-outline.png';

let analyser;
let audioDataArray;
let rafId;

// MAIN COMPONENT
function Perform({ user, userData }) {

  const history = useHistory();
  const [audioState, setAudioState] = useState(false);
  const [currentFrequency, setCurrentFrequency] = useState(220.00);
  const [audio, setAudio] = useState(null);
  const parentRef = useRef();
  const [audioData, setAudioData] = useState(new Float32Array(1024));

  const playNextNote = async () => {
    const nextNote = Notes.getRelativeNote(1, currentFrequency).freq
    await setCurrentFrequency(Notes.getRelativeNote(1, currentFrequency).freq)
    if (audioState) {
      AudioOutputEngine.stopAudio();
      AudioOutputEngine.playAudio(nextNote);
    }
  }

  const playPreviousNote = async () => {
    const previousNote = Notes.getRelativeNote(-1, currentFrequency).freq
    await setCurrentFrequency(previousNote)
    if (audioState) {
      AudioOutputEngine.stopAudio();
      AudioOutputEngine.playAudio(previousNote);
    }
  }

  const getMicrophone = async () => {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    setAudio(audio);
    analyser = new AudioAnalyserEngine(audio);
  }

  const stopMicrophone = () => {
    audio.getTracks().forEach(track => track.stop());
    setAudio(null);
  }

  const handleAudioState = async () => {
    await (audio) ? stopMicrophone() : getMicrophone();
    setAudioState(!audioState);
    if (audioState) {
      AudioOutputEngine.stopAudio();
    } else {
      AudioOutputEngine.playAudio(currentFrequency);
    }
  }

  useEffect(() => {
    if (analyser) { 
      audioDataArray = analyser.initDataArray();
      setAudioData(audioDataArray); // async?
      rafId = requestAnimationFrame(update);
    }

    return () => {
      if (analyser) {
        cancelAnimationFrame(rafId);
        analyser.analyser.disconnect();
      }
    }

  }, [analyser])

  const update = () => {
    analyser.getFloatTimeDomainData();
    setAudioData(audioDataArray); // async?
    rafId = requestAnimationFrame(update);
  }

  return (
    <main className="perform">
      <NavMinimal userVisible user={user} currentPage="perform" />
      <section className="perform__activity" ref={parentRef}>
        <hr className="perform__reference" />
        {(audio & analyser) ? (
        <AudioCanvas audioData={audioData}
          analyser={analyser}
          parentRef={parentRef}
          currentFrequency={currentFrequency}
        />
        ) : null}
        <NoteName currentFrequency={currentFrequency} />
      </section>
      <section className="perform__controls">
        <button onClick={playPreviousNote} className="perform__controls-button--switchnote">
          <img src={previousImage} alt="Previous note" className="perform__controls-button-image--switchnote" />
        </button>
        <button onClick={handleAudioState} className="perform__controls-button">
          <img src={(audioState) ? pauseImage : playImage} alt="Play/Pause" className="perform__controls-button-image" />
        </button>
        <button onClick={playNextNote} className="perform__controls-button--switchnote">
          <img src={nextImage} alt="Next note" className="perform__controls-button-image--switchnote" />
        </button>
      </section>
    </main>
  )
}

export default Perform;
