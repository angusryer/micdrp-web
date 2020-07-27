import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from '../../config/firebase';
import { NavMinimal, AudioStreamParser } from '../';
import './Perform.scss';
import playImage from '../../assets/images/play-circle-outline.png';
import pauseImage from '../../assets/images/pause-circle-outline.png';

//Init audio context globally
let outputContext = new AudioContext();

// global output audio variables
let gainNode;
let oscillator;

const playAudio = frequency => {
  gainNode = outputContext.createGain();
  oscillator = outputContext.createOscillator();
  gainNode.connect(outputContext.destination);
  gainNode.gain.setValueAtTime(1, outputContext.currentTime + 0.25);
  oscillator.connect(gainNode);
  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;
  oscillator.start(outputContext.currentTime);
}

const stopAudio = () => {
  gainNode.gain.exponentialRampToValueAtTime(
    0.00001, outputContext.currentTime + 0.04
  )
  oscillator.stop(outputContext.currentTime + 0.25);
  oscillator.disconnect();
}


// MAIN COMPONENT
function Perform({ user, setUser }) {

  const history = useHistory();
  const [audioState, setAudioState] = useState(false);
  const [currentFrequency, setCurrentFrequency] = useState(415.30);
  const [audio, setAudio] = useState(null);
  const performRef = useRef();

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

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const userData = {
          uid: user.uid,
          name: user.displayName,
          avatar: user.photoURL,
        }
        setUser(userData)
      } else {
        history.push('/login');
      }
    })
  }, [])

  return (
    <main className="perform">
      <NavMinimal userVisible user={user} currentPage="perform" />
      <section className="perform__activity" ref={performRef}>
        {(audio) ? <AudioStreamParser inputContext={outputContext}
                                      audio={audio}
                                      parentRef={performRef}
                                      currentFrequency={currentFrequency}
                                      setCurrentFrequency={setCurrentFrequency} /> : null}
      </section>
      <section className="perform__controls">
        <button onClick={handleAudioState} className="perform__controls-button">
          <img src={(audioState) ? pauseImage : playImage} alt="Play/Pause" className="perform__controls-button-image" />
        </button>
      </section>
    </main>
  )
}

export default Perform;


//     // <input class="zoom" type="range" min="1" max="5" step="1" value="2" />
//     // <div class="pitch"></div>
//     // <div class="freq"></div>
//     // <canvas width="640" height="480"></canvas>



//     const getUserPermissions = () => {
//         navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia; // Get permissions
//     }

//     getUserPermissions();


//     const audioContext = new window.AudioContext();
//     const compressor = audioContext.createDynamicsCompressor();
//     const analyser = audioContext.createAnalyser();


//     const canvas = document.querySelector('canvas'); // HTML canvas component
//     canvas.width = document.body.clientWidth; // Canvas style
//     canvas.height = document.body.clientHeight; // Canvas style

//     let samples = 256;
//     const zoom = document.querySelector('.zoom'); // Zoom component




//     // Save below in state, or discard altogether
//     zoom.onchange = function () {
//         switch (this.value) { // what is this supposed to be?
//             case '1': samples = 128; break;
//             case '2': samples = 256; break;
//             case '3': samples = 512; break;
//             case '4': samples = 1024; break;
//             case '5': samples = 2048; break;
//             default: samples = 256;
//         }
//         return console.log(samples);
//     };



//     const pitchDisplay = document.querySelector('.pitch');  // Pitch component
//     const freq = document.querySelector('.freq'); // Frequency component

//     const minSamples = 0;
//     const buf = new Float32Array(1024);












//     const noteFromPitch = function (frequency) {
//         const noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
//         let noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
//         noteNum = Math.round(noteNum) + 69;
//         return noteStrings[noteNum % 12];
//     };



//     // doesn't seem to be used??
//     //
//     // const normalize = function (num) {
//     //     const multiplier = Math.pow(10, 2);
//     //     return Math.round(num * multiplier) / multiplier;
//     // };




//     const updatePitch = function () {

//         analyser.getFloatTimeDomainData(buf);
//         const pitch = getPitch(buf);

//         if (pitch > 0) { pitchDisplay.innerHTML = noteFromPitch(pitch); }
//         return freq.innerHTML = pitch;
//     };





//     const visualize = function () {
//         const normalize = (y, h) => (y / 256) * h;
//         const w = canvas.width;
//         const h = canvas.height;
//         const points = new Uint8Array(samples);
//         analyser.getByteTimeDomainData(points);

//         const drawContext = canvas.getContext('2d');
//         drawContext.clearRect(0, 0, w, h);

//         drawContext.strokeStyle = '#C2EDF2';
//         drawContext.lineWidth = 3;
//         drawContext.lineCap = 'butt';
//         drawContext.lineJoin = 'miter';
//         drawContext.beginPath();
//         drawContext.moveTo(0, normalize(points[0], h));

//         let i = 0;
//         while (i < points.length) {
//             drawContext.lineTo((w * (i + 1)) / points.length,
//                 normalize(points[i], h));
//             i++;
//         }

//         return drawContext.stroke();
//     };




//     var animationLoop = function () {
//         visualize();
//         updatePitch();
//         return window.requestAnimationFrame(animationLoop);
//     };




//     navigator.getUserMedia(
//         { audio: true }, (stream) => {
//             const microphone = audioContext.createMediaStreamSource(stream);
//             microphone.connect(compressor);
//             compressor.connect(analyser);

//             return window.requestAnimationFrame(animationLoop);
//         }, e => console.log(`error: ${e}`));
