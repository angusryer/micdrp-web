import React, { useState, createRef, useEffect } from 'react';
import { PitchDetector } from 'pitchy';
import * as Notes from '../../config/notes';

function AudioCanvas({ inputContext, audioData, parentRef, currentFrequency }) {

  const canvasRef = createRef();
  const [yPosition, setYPosition] = useState(0);
  const [canvasWidth, setCanvasWidth] = useState(0);

  let screenWidth = parentRef.current.offsetWidth; // set by parent container width
  let screenHeight = parentRef.current.offsetHeight; // set by partent container height

  // Get vertical position of user's pitch as a percentage of container height, expressed in pixels
  const getVerticalPosition = (currentFrequency, userPitch) => {
    const highFrequency = Notes.getRelativeNote(1, currentFrequency).freq;
    const lowFrequency = Notes.getRelativeNote(-1, currentFrequency).freq;
    if (userPitch > currentFrequency) {
      if (userPitch > highFrequency) {
        return screenHeight;
      }
      return ((userPitch - currentFrequency) / (highFrequency - currentFrequency)) * screenHeight;
    } else {
      if (userPitch < lowFrequency) {
        return -screenHeight;
      }
      return (((userPitch - currentFrequency) / (highFrequency - currentFrequency)) * screenHeight) * -1
    }
  }


  // Draw this instant's audioData buffer strem values to canvas
  const draw = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const sliceWidth = (canvas.width * 1.0) / audioData.length;

    context.lineWidth = 1;
    context.strokeStyle = '#DC9F6F'; //$ORANGE

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.moveTo(0, canvas.height / 2);

    let x = 0;
    for (const item of audioData) {
      const y = (item / 255.0) * canvas.height;
      context.lineTo(x, y);
      x += sliceWidth;
    }

    context.lineTo(x, canvas.height / 2);
    context.stroke();
  }


  // Get a realistic pitch value from audioData buffer stream
  const getPitch = (audioData) => {
    console.log(audioData);
    const maxSamples = Math.floor(audioData.length / 2);
    let bestOffset = -1;
    let bestCorrelation = 0;
    let rms = 0;
    let foundGoodCorrelation = false;
    const correlations = [];

    let i = 0;
    while (i < audioData.length) {
      const val = audioData[i];
      // console.log(val)
      rms += val * val;
      i++;
    }

    // console.log(rms);
    rms = Math.sqrt(rms / audioData.length);

    // console.log(rms);
    // not enough signal
    if (rms < 0.01) { return -1 }

    let lastCorrelation = 1;

    let offset = 0;
    while (offset < maxSamples) {
      let correlation = 0;

      i = 0;
      while (i < maxSamples) {
        correlation += Math.abs(audioData[i] - audioData[i + offset]);
        i++;
      }
      console.log(audioData[0])


      correlation = 1 - (correlation / maxSamples);
      correlations[offset] = correlation;
      
      if ((correlation > 0.9) && (correlation > lastCorrelation)) {
        foundGoodCorrelation = true;
        if (correlation > bestCorrelation) {
          bestCorrelation = correlation;
          bestOffset = offset;
        }
      } else if (foundGoodCorrelation) {
        const shift = (correlations[bestOffset + 1] - correlations[bestOffset - 1]) / correlations[bestOffset];
        return inputContext.sampleRate / (bestOffset + (8 * shift));
      }

      lastCorrelation = correlation;
      offset++;
    }

    if (bestCorrelation > 0.01) { return inputContext.sampleRate / bestOffset; }
    // no good match
    return -1;
  };

  // set up dynamic styles for canvas' parent container
  const containerStyle = {
    position: "relative",
    transform: `translateY(${yPosition}%)`
  }


  // Continually run these updates: get user pitch, translate that into a vertical position,
  // get canvas width from the vertical position, and re-draw the canvas
  useEffect(() => {
    // const detector = new PitchDetector.forNumberArray(audioData);
    const userPitch = getPitch(audioData) //600 //detector.findPitch(audioData, inputContext.sampleRate);
    const verticalPosition = getVerticalPosition(currentFrequency, userPitch);
    setYPosition(verticalPosition);
    const canvasWidth = (yPosition !== 0) ? (1 / Math.abs(yPosition)) * screenWidth : screenWidth;
    setCanvasWidth(canvasWidth);
    draw();
  })

  return (
    <div className="audiocanvas__container" style={containerStyle}>
      <canvas width={canvasWidth} height="40" className="audiocanvas__canvas" ref={canvasRef}><span>Canvas is not supported on this browser.</span></canvas>
    </div>
  )
}

export default AudioCanvas;
