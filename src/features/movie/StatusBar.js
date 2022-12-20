import React from 'react'
import "./StatusBar.css";
const StatusBar = (props) => {
    return (
        <div className='statusbar-container '>
            <div className='statusbar'>
                <div className={"stage "+(props.stage>=1?'stage-completed':'stage-uncomplete')}>
                    <div className="ellipse">1</div>
                    <p>Select Seat</p>
                </div>
                <div className='statusbar-line' />
                <div className={"stage "+(props.stage>=2?'stage-completed':'stage-uncomplete')}>
                    <div className="ellipse">2</div>
                    <p>Order</p>
                </div>
                <div className='statusbar-line' />
                <div className={"stage "+(props.stage>=3?'stage-completed':'stage-uncomplete')}>
                    <div className="ellipse">3</div>
                    <p>Complete</p>
                </div>
            </div>
        </div>
    )
}

export default StatusBar