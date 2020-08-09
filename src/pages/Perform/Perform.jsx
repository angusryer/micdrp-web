import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from '../../utilities/firebase';
import { NavMinimal, AudioParser, NoteName, AudioCanvas } from '../../components';
import AudioOutputEngine from '../../audio/AudioOutputEngine';
import './Perform.scss';
import * as Notes from '../../utilities/notes';
import playImage from '../../assets/images/play-circle-outline.png';
import pauseImage from '../../assets/images/pause-circle-outline.png';
import previousImage from '../../assets/images/play-skip-back-outline.png';
import nextImage from '../../assets/images/play-skip-forward-outline.png';

// MAIN COMPONENT
function Perform({ user, userData }) {

  const history = useHistory();
  const [audioState, setAudioState] = useState(false);
  const [currentFrequency, setCurrentFrequency] = useState(220.00);
  const [audio, setAudio] = useState(null);
  const performRef = useRef();
  const audioEngine = new AudioOutputEngine();

  const playNextNote = async () => {
    const nextNote = Notes.getRelativeNote(1, currentFrequency).freq
    await setCurrentFrequency(Notes.getRelativeNote(1, currentFrequency).freq)
    audioEngine.changeToNote(nextNote);
  }

  const playPreviousNote = async () => {
    const previousNote = Notes.getRelativeNote(-1, currentFrequency).freq
    await setCurrentFrequency(previousNote)
    audioEngine.changeToNote(previousNote)
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
      audioEngine.stopAudio();
    } else {
      AudioOutputEngine.setFrequency(currentFrequency);
      AudioOutputEngine.playAudio();
    }
  }

  return (
    <main className="perform">
      <NavMinimal userVisible user={user} currentPage="perform" />
      <section className="perform__activity" ref={performRef}>
        <hr className="perform__reference" />
        {(audio) ? (
          <AudioParser inputContext={audioEngine} audio={audio} parentRef={performRef} currentFrequency={currentFrequency}>
            <AudioCanvas />
          </AudioParser>
        ) : null}
        {(audio) ? <NoteName currentFrequency={currentFrequency} /> : null}
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
