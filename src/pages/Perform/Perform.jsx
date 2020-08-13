import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from '../../utilities/firebase';
import { NavMinimal, AudioParser, NoteName } from '../../components';
import './Perform.scss';
import * as Notes from '../../utilities/notes';
import playImage from '../../assets/images/play-circle-outline.png';
import pauseImage from '../../assets/images/pause-circle-outline.png';
import previousImage from '../../assets/images/play-skip-back-outline.png';
import nextImage from '../../assets/images/play-skip-forward-outline.png';

//Init audio context globally
const outputContext = new AudioContext({
  latencyHint: 'interactive',
  sampleRate: 48000,
});

// global output audio variables
let gainNode;
let oscillator;

const playAudio = frequency => {
  gainNode = outputContext.createGain();
  oscillator = outputContext.createOscillator();
  gainNode.connect(outputContext.destination);
  oscillator.connect(gainNode);
  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;
  gainNode.gain.exponentialRampToValueAtTime(
    0.05, outputContext.currentTime
  )
  oscillator.start(outputContext.currentTime);
}

const stopAudio = () => {
  gainNode.gain.exponentialRampToValueAtTime(
    0.00001, outputContext.currentTime
  )
  oscillator.stop(outputContext.currentTime);
  oscillator.disconnect();
}


// MAIN COMPONENT
function Perform({ user, userData }) {

  const history = useHistory();
  const [audioState, setAudioState] = useState(false);
  const [currentFrequency, setCurrentFrequency] = useState(220.00);
  const [audio, setAudio] = useState(null);
  const performRef = useRef();

  const nextNote = async () => {
    const nextNote = Notes.getRelativeNote(1, currentFrequency).freq
    await setCurrentFrequency(Notes.getRelativeNote(1, currentFrequency).freq)
    stopAudio();
    playAudio(nextNote);
  }

  const previousNote = async () => {
    const previousNote = Notes.getRelativeNote(-1, currentFrequency).freq
    await setCurrentFrequency(previousNote)
    stopAudio();
    playAudio(previousNote)
  }

  const getMicrophone = async () => {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    setAudio(audio);
  }

  const stopMicrophone = () => {
    audio.getTracks().forEach(track => track.stop());
    setAudio(null);
  }

  const toggleMicrophone = () => (audio) ? stopMicrophone() : getMicrophone();

  const handleAudioState = async () => {
    await toggleMicrophone();
    setAudioState(!audioState);
    if (audioState) {
      stopAudio();
    } else {
      playAudio(currentFrequency);
    }
  }

  return (
    <main className="perform">
      <div className="perform__container">
        <NavMinimal userVisible user={user} currentPage="perform" />
        <section className="perform__activity" ref={performRef}>
          <hr className="perform__reference" />
          {(audio) ? <AudioParser inputContext={outputContext}
            audio={audio}
            parentRef={performRef}
            currentFrequency={currentFrequency} />
            : null}
            <NoteName currentFrequency={currentFrequency} />
        </section>
        <section className="perform__controls">
          <button onClick={previousNote} className="perform__controls-button--switchnote">
            <img src={previousImage} alt="Previous note" className="perform__controls-button-image--switchnote" />
          </button>
          <button onClick={handleAudioState} className="perform__controls-button">
            <img src={(audioState) ? pauseImage : playImage} alt="Play/Pause" className="perform__controls-button-image" />
          </button>
          <button onClick={nextNote} className="perform__controls-button--switchnote">
            <img src={nextImage} alt="Next note" className="perform__controls-button-image--switchnote" />
          </button>
        </section>
      </div>
    </main>
  )
}

export default Perform;
