import React, { useState, createRef, useEffect } from 'react';
import { PitchDetector } from 'pitchy';
import * as Notes from '../../utilities/notes';
import './AudioCanvas.scss';

let detector;
let input;

function AudioCanvas({ inputContext, analyser, audioData, parentRef, currentFrequency }) {

  const canvasRef = createRef();
  const [yPosition, setYPosition] = useState(0);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [userPitch, setUserPitch] = useState(440);
  const [screenWidth, setScreenWidth] = useState(parentRef.current.offsetWidth);
  const [screenHeight, setScreenHeight] = useState(parentRef.current.offsetHeight);

  // Get vertical position of user's pitch as a percentage of container height, expressed in pixels
  const getVerticalPosition = (currentFrequency, userFrequency, clarity) => {
    const high = Notes.getLinearPitchAsPercentage(Notes.getRelativeNote(2, currentFrequency).freq);
    const low = Notes.getLinearPitchAsPercentage(Notes.getRelativeNote(-2, currentFrequency).freq);
    const current = Notes.getLinearPitchAsPercentage(currentFrequency);
    const user = Notes.getLinearPitchAsPercentage(userFrequency);
    if (clarity < 0.4) { return 0 }
    if (user > current) {
      return (user >= high) ? -(screenHeight / 2) : -(((user - current) / (high - current)) * (screenHeight / 2));
    } else if (user < current) {
      return (user <= low) ? screenHeight / 2 : ((user - current) / (low - current)) * (screenHeight / 2);
    } else {
      return 0;
    }
  }

  const updateStates = async () => {
    analyser.getFloatTimeDomainData(input)
    let [pitch, clarity] = detector.findPitch(input, inputContext.sampleRate);
    await setUserPitch(pitch);
    const verticalPosition = getVerticalPosition(currentFrequency, userPitch, clarity);
    await setYPosition(verticalPosition * 0.8);
    const canvasWidthTemp = (verticalPosition === 0) ? screenWidth : (parentRef.current.offsetWidth) - Math.abs((verticalPosition / (parentRef.current.offsetHeight / 2)) * parentRef.current.offsetWidth);
    await setCanvasWidth(canvasWidthTemp);
  }

  // Draw this instant's audioData buffer strem values to canvas, then loop
  let rId;
  const update = (canvas) => {
    const context = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    context.lineWidth = 2;
    context.strokeStyle = '#DC9F6F'; //$ORANGE
    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.moveTo(0, height / 2);

    let x = 0;
    const sliceWidth = (width * 1) / audioData.length;
    for (const item of audioData) {
      const y = item * 2 * height;
      context.lineTo(x, y);
      x += sliceWidth;
    }

    context.lineTo(x, height / 2);
    context.stroke();
    rId = requestAnimationFrame(() => {
      update(canvas)
      updateStates();
    });
  }

  // Continually run these updates: get user pitch, translate that into a vertical position,
  // get canvas width from the vertical position, and re-draw the canvas
  useEffect(() => {
    detector = PitchDetector.forFloat32Array(analyser.fftSize);
    input = new Float32Array(detector.inputLength);
    updateStates();
    update(canvasRef.current);
    return () => {
      cancelAnimationFrame(rId)
    }
  })

  return (
    <div className="audiocanvas__container" style={{ transform: `translateY(${yPosition}px)` }}>
      <canvas width={canvasWidth} height="60" className="audiocanvas__canvas" ref={canvasRef}><span>Canvas is not supported on this browser.</span></canvas>
    </div>
  )
}

export default AudioCanvas;
