import React from 'react'
import "./StatusBar.css";

const StatusBar = () => {
    return (
        <div className='statusbar-container'>
            <div className='statusbar'>
                <div className="stage">
                    <div className="ellipse">1</div>
                    <p>Select Seat</p>
                </div>
                <div className='statusbar-line' />
                <div className="stage">
                    <div className="ellipse">2</div>
                    <p>Select Seat</p>
                </div>
                <div className='statusbar-line' />
                <div className="stage">
                    <div className="ellipse">3</div>
                    <p>Select Seat</p>
                </div>
            </div>
        </div>
    )
}

export default StatusBar