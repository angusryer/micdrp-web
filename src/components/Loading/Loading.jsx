import React from 'react'
import ReactLoading from 'react-loading';
import './Loading.scss';

const Loading = () => (
    <div className="loading__container">
        <ReactLoading type={'bubbles'} color={'#B65245'} height={'5rem'} width={'5rem'} />
    </div>
)

export default Loading;
