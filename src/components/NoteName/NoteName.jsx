import React from 'react'
import './NoteName.scss';
import * as Notes from '../../config/notes';

export default function NoteName({ currentFrequency, addClassDiv, addClassText }) {

    return (
        <div className={`${(!addClassDiv) ? "notename" : addClassDiv}`}>
            <span className={`${(!addClassText) ? "notename__target-note" : addClassText}`}>{Notes.getNoteNameFromFrequency(currentFrequency)}</span>
        </div>
    )
}
