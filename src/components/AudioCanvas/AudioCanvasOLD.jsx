import React, { useEffect, useState, useRef, useCallback } from 'react';

const AudioCanvasOLD = ({ context, audio }) => {

    const [audioData, setAudioData] = useState(new Uint8Array(0));
    const canvasRef = useRef(); //useHookWithRefCallback();

    // analyzer functions
    let dataArray;
    let rafId;
    let analyser;
    let source;

    analyser = context.createAnalyser();
    dataArray = new Uint8Array(analyser.frequencyBinCount);
    source = context.createMediaStreamSource(audio);
    source.connect(analyser);

    const tick = () => {
        analyser.getByteTimeDomainData(dataArray);
        setAudioData(dataArray);
        rafId = requestAnimationFrame(tick);
    }

    useEffect(() => {
        rafId = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(rafId);
            analyser.disconnect();
            source.disconnect();
        }

    }, [])

    useEffect(() => {
        drawAudioStream();
    }, [])

    //visualizer functions
    const drawAudioStream = () => {
        const canvas = canvasRef.current;
        const canvasHeight = canvas.height;
        const canvasWidth = canvas.width;
        const canvasContext = canvas.getContext('2d');
        let x = 0;
        const sliceWidth = (canvasWidth * 1.0) / audioData.length;

        canvasContext.lineWidth = 2;
        canvasContext.strokeStyle = '#DC9F6F';
        canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);

        canvasContext.beginPath();
        canvasContext.moveTo(0, canvasHeight / 2);

        for (const item of audioData) {
            const y = (item / 255.0) * canvasHeight;
            canvasContext.lineTo(x, y);
            x += sliceWidth;
        }

        canvasContext.lineTo(x, canvasHeight / 2);
        canvasContext.stroke();
    }

    return (
        <canvas className="audiocanvas__container" ref={canvasRef} />
    )
}

export default AudioCanvasOLD;