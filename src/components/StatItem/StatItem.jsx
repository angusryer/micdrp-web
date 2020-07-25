import React from 'react';
import "./StatItem.scss";

const StatItem = ({ type, title, value, value2 }) => {
    switch (type) {
        case 'range':
            return (
                <div className="statitem__container">
                    <div className="statitem__title-container">
                        <div className="statitem__title">{title}</div>
                    </div>
                    <div className="statitem__value-container">
                        <div className="statitem__value">{value}</div> - <div className="statitem__value">{value2}</div>
                    </div>
                </div>
            )
        default:
            return (
                <div className="statitem__container">
                    <div className="statitem__title-container">
                        <div className="statitem__title">{title}</div>
                    </div>
                    <div className="statitem__value-container">
                        <div className="statitem__value">{value}</div>
                    </div>
                </div>
            )
    }
}

export default StatItem;