import React, { useState } from 'react';

export default function FrequencyDisplay({analyser, buf, num}) {

    const [note, setNote] = useState(0);
    const [frequency, setFrequency] = useState(0);

    const updatePitch = () => {
        const normalize = (num) => {
            const multiplier = Math.pow(10, 2);
            return Math.round(num * multiplier) / multiplier;
        };

        analyser.getFloatTimeDomainData(buf);
        const pitch = getPitch(buf);

        if (pitch > 0) {
            setNote(noteFromPitch(pitch))
            setFrequency(pitch);
        }
    };

    return (
        <div className="frequencydisplay__container">
            {note}
            {frequency}
        </div>
    )
}
